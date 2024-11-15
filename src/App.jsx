import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';
import './App.css';

const searchClient = algoliasearch('JM9I1B7T4G', '8646d541697918336088eeaf888f7f3b');

function Hit({ hit }) {
  return (
    <article className="p-4 border-b border-gray-200 hover:bg-gray-50">
      <h1 className="text-xl font-bold text-gray-900">{hit.name}</h1>
      <p className="mt-2 text-gray-600">{hit.description}</p>
    </article>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Marvel Characters Search
        </h1>
        
        <InstantSearch searchClient={searchClient} indexName={"marvel_characters"}>
          <div className="mb-8">
            <SearchBox 
              className="w-full"
              placeholder="Search for Marvel characters..."
              classNames={{
                root: 'p-4',
                form: 'relative',
                input: 'block w-full rounded-lg border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
                submit: 'absolute inset-y-0 right-0 flex items-center pr-4',
                reset: 'absolute inset-y-0 right-8 flex items-center',
              }}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default App;