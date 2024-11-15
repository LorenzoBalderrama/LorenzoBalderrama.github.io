import crypto from 'crypto';
import { searchClient } from '@algolia/client-search';

const publicKey = "8dad68da29d0f23830792e633c83f822";
const privateKey = "d87e4b6d3872f796198b2c3642d71f6bae88bb80";
const client = searchClient('JM9I1B7T4G', '8646d541697918336088eeaf888f7f3b');

// Alphabet array for letters A-Z - To limit size of data collected
const alphabet = 'ABCDEFGHIJKLMNOPQRS'.split('');
// My personal faves! Doctor Doom | Spider-Girl(May Parker) | Reed Richards | Sue Storm | Ben Grimm | Doctor Voodoo
const specificCharacterIDs = [1009281, 1009609, 1009459, 1009631, 1009329, 1011500];

// Marvel API hash
const createHash = (ts, privateKey, publicKey) => {
  return crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
};

// Fetch Marvel data and index it in Algolia
const processRecords = async () => {
  const ts = new Date().getTime().toString();
  const hash = createHash(ts, privateKey, publicKey);
  const limit = 5; // Limit to 10 comics per character and 10 characters per letter

  const allCharacters = [];

  // Fetch specific characters by ID
  const specificCharacters = await Promise.all(specificCharacterIDs.map(async (id) => {
    try {
      const characterRequest = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const characterData = await characterRequest.json();

      if (!characterData || !characterData.data || !characterData.data.results || characterData.data.results.length === 0) {
        console.error(`Character ID ${id} not found`);
        return null;
      }

      const character = characterData.data.results[0];

      // Fetch comics for each specific character
      const comicsRequest = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const comicsData = await comicsRequest.json();

      if (!comicsData || !comicsData.data || !comicsData.data.results) {
        console.error(`Error fetching comics for character ${character.name}`);
        return null;
      }

      const comics = comicsData.data.results.map((comic) => ({
        comicId: comic.id,
        comicTitle: comic.title,
        description: comic.description || "No description available",
        characters: comic.characters.items.slice(0, 5).map(c => ({ id: c.resourceURI.split('/').pop(), name: c.name })),
      }));

      return {
        objectID: character.id,
        name: character.name,
        description: character.description || "No description available",
        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        comics: comics,
      };
    } catch (error) {
      console.error(`Error processing character ID ${id}:`, error);
      return null;
    }
  }));

  // Filter out null characters and add them to the main array
  allCharacters.push(...specificCharacters.filter(c => c !== null));

  // Loop through each letter of the alphabet to fetch additional characters
  for (const letter of alphabet) {
    try {
      // Fetch characters starting with the specific letter
      const characterRequest = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${letter}&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const characterData = await characterRequest.json();

      if (!characterData || !characterData.data || !characterData.data.results) {
        console.error(`Error fetching characters for letter ${letter}`);
        continue;
      }

      const charactersForLetter = await Promise.all(characterData.data.results.map(async (character) => {
        try {
          // Fetch comics for each character
          const comicsRequest = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${character.id}/comics?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
          const comicsData = await comicsRequest.json();

          if (!comicsData || !comicsData.data || !comicsData.data.results) {
            console.error(`Error fetching comics for character ${character.name}`);
            return null;
          }

          const comics = comicsData.data.results.map((comic) => ({
            comicId: comic.id,
            comicTitle: comic.title,
            description: comic.description || "No description available",
            characters: comic.characters.items.slice(0, 5).map(c => ({ id: c.resourceURI.split('/').pop(), name: c.name })),
          }));

          return {
            objectID: character.id,
            name: character.name,
            description: character.description || "No description available",
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            comics: comics,
          };
        } catch (error) {
          console.error(`Error processing character ${character.name}:`, error);
          return null;
        }
      }));

      // Filter out null characters and add them to the main array
      allCharacters.push(...charactersForLetter.filter(c => c !== null));
    } catch (error) {
      console.error(`Error processing letter ${letter}:`, error);
    }
  }

  // Save all characters to Algolia
  await client.saveObjects({
    indexName: 'marvel_characters',
    objects: allCharacters,
  });

  console.log('Successfully indexed objects!');
};

// Run the process and handle errors
processRecords()
  .then(() => console.log('All data processed and indexed successfully!'))
  .catch((err) => console.error('An error occurred:', err));
