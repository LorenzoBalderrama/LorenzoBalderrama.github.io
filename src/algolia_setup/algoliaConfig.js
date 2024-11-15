import { liteClient as algoliasearch } from 'algoliasearch/lite';

const client = algoliasearch('JM9I1B7T4G', '8646d541697918336088eeaf888f7f3b');

const synonyms = [
  {
    objectID: '1009281',
    type: 'synonym',
    synonyms: ['Dr. Doom', 'Dr Doom', 'Doom', 'DoctorDoom']
  },
  {
    objectID: '1011500',
    type: 'synonym',
    synonyms: ['Dr. Voodoo', 'Doctor VooDoo', 'Brother Voodoo', 'Brother VooDoo']
  },
  {
    objectID: '1009297',
    type: 'synonym',
    synonyms: ['Captain America', 'Sam Wilson']
  }
];

// Function to initialize synonyms
export const initializeSynonyms = async () => {
  try {
    const response = await client.saveSynonyms({
      indexName: 'marvel_characters',
      synonymHit: synonyms,
      forwardToReplicas: true,
      replaceExistingSynonyms: false
    });
    console.log('Synonyms initialized:', response);
  } catch (error) {
    console.error('Error initializing synonyms:', error);
  }
};

export const searchClient = client;