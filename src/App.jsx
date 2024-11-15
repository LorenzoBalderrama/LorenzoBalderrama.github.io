import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination, DynamicWidgets, HierarchicalMenu, RefinementList } from 'react-instantsearch';
import { useEffect } from 'react';
import { initializeSynonyms } from './algolia_setup/algoliaConfig';
import 'instantsearch.css/themes/satellite.css';
import './App.css';

const searchClient = algoliasearch('JM9I1B7T4G', '8646d541697918336088eeaf888f7f3b');

function Hit({ hit }) {
  return (
    <article className="p-6 border-b border-gray-800 hover:bg-gray-900 flex items-center gap-6">
      <div className="flex-none">
        {hit.thumbnail ? (
          <img 
            src={hit.thumbnail} 
            alt={hit.name} 
            className="h-[200px] w-[200px] rounded-lg object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="h-[200px] w-[200px] bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-red-500 font-times">{hit.name}</h1>
        <p className="mt-2 text-gray-300 font-times">{hit.description}</p>
      </div>
    </article>
  );
}

function App() {
  // Initializing synonyms when the app loads
  useEffect(() => {
    initializeSynonyms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center text-red-500 mb-8 font-times">
          Marvel Universe Search
        </h1>
        <InstantSearch searchClient={searchClient} indexName={"marvel_characters"}>
        <Pagination 

        />


        <DynamicWidgets>
        <HierarchicalMenu
          attributes={['hierarchical.lvl0', 'hierarchical.lvl1']}
        />
        <RefinementList attribute="comics" />
      </DynamicWidgets>


          <div className="mb-8">
            <SearchBox 
              className="w-full"
              placeholder="Search the Marvel Universe..."
              classNames={{
                root: 'p-4',
                form: 'relative',
                input: 'block w-full rounded-lg border-2 border-red-500 bg-gray-800 py-3 px-4 text-white placeholder-gray-400 shadow-lg focus:border-red-600 focus:ring-red-500 text-lg',
                submit: 'absolute inset-y-0 right-0 flex items-center pr-4 text-red-500',
                reset: 'absolute inset-y-0 right-8 flex items-center text-red-500',
              }}
            />
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-2xl border-2 border-red-500">
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default App;