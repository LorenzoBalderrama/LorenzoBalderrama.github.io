import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination} from 'react-instantsearch';
import { useState } from 'react';
import 'instantsearch.css/themes/satellite.css'; // Algolia theme
import './App.css'; // custom css
import './output.css'; // tailwind css

const searchClient = algoliasearch('JM9I1B7T4G', '8646d541697918336088eeaf888f7f3b');

function Hit({ hit }) {
  return (
    <div>
      <h1>{hit.name}</h1>
      <p>{hit.description}</p>
      <div>
        <img src={hit.thumbnail} alt={hit.name} />
      </div>
    </div>
  );
}

function App() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center text-red-500 mb-8 font-times">
          Marvel Universe Search
        </h1>
        
        {!showSearch ? (
          <div className="text-center">
            <p className="text-white text-xl mb-8">
              Explore the vast Marvel Universe and discover your favorite characters
            </p>
            <button
              onClick={() => setShowSearch(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <InstantSearch searchClient={searchClient} indexName={"marvel_characters"}>
            <div className="lg:flex lg:space-x-8">
              {/* Left Column: Filters */}
              <div className="lg:w-1/3 space-y-6 mb-8 lg:mb-0">
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
              <div>
                <div>
                  <Hits hitComponent={Hit} />
                </div>
                <div>
                  <Pagination className="mt-4" />
                </div>
              </div>
            </div>
          </InstantSearch>
        )}
      </div>
    </div>
  );
}

export default App;