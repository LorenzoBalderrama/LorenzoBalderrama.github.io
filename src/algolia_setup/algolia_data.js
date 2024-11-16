import crypto from 'crypto';
import { searchClient } from '@algolia/client-search';

const publicKey = "8dad68da29d0f23830792e633c83f822";
const privateKey = "d87e4b6d3872f796198b2c3642d71f6bae88bb80";
const client = searchClient('74PDHJOPR7', '1a1e9c477658d6adae3ede22d5d4c937');

// Date range for comics
const startYear = 2020;
const endYear = 2024;

// Marvel API hash
const createHash = (ts, privateKey, publicKey) => {
  return crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
};

// Fetch Marvel data and index it in Algolia
const processRecords = async () => {
  const ts = new Date().getTime().toString();
  const hash = createHash(ts, privateKey, publicKey);
  const limit = 10; // Adjust limit as needed
  
  const allComics = [];

  // Fetch comics by year range
  for (const year of Array.from({length: endYear - startYear + 1}, (_, i) => startYear + i)) {
    try {
      const comicsRequest = await fetch(
        `https://gateway.marvel.com:443/v1/public/comics?` +
        `dateRange=${year}-01-01,${year}-12-31&` +
        `orderBy=focDate&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      const comicsData = await comicsRequest.json();

      if (!comicsData?.data?.results) {
        console.error(`Error fetching comics for year ${year}`);
        continue;
      }

      // Process each comic
      const comicsForYear = await Promise.all(comicsData.data.results.map(async (comic) => {
        try {
          // Fetch characters for this comic
          const charactersRequest = await fetch(
            `https://gateway.marvel.com:443/v1/public/comics/${comic.id}/characters?` +
            `ts=${ts}&apikey=${publicKey}&hash=${hash}`
          );
          const charactersData = await charactersRequest.json();

          const characters = charactersData?.data?.results?.map(character => ({
            characterId: character.id,
            name: character.name,
            description: character.description || "No description available",
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          })) || [];

          return {
            objectID: comic.id,
            title: comic.title,
            description: comic.description || "No description available",
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            characters: characters,
            publicationDate: comic.dates?.find(d => d.type === 'focDate')?.date || null,
            year: year
          };
        } catch (error) {
          console.error(`Error processing comic ${comic.title}:`, error);
          return null;
        }
      }));

      // Filter out null comics and add them to the main array
      allComics.push(...comicsForYear.filter(c => c !== null));
    } catch (error) {
      console.error(`Error processing year ${year}:`, error);
    }
  }

  // Save all comics to Algolia
  await client.saveObjects({
    indexName: 'marvel_comics',
    objects: allComics,
  });

  console.log('Successfully indexed comics!');
};

// Run the process and handle errors
processRecords()
  .then(() => console.log('All data processed and indexed successfully!'))
  .catch((err) => console.error('An error occurred:', err));