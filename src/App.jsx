import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { useState } from 'react';
import { SearchContainer } from './components/SearchContainer';
import { SortingContainer } from './components/SortingContainer';
import { ResultsContainer } from './components/ResultsContainer';
import { FacetsContainer } from './components/FacetsContainer';
import 'instantsearch.css/themes/satellite.css';
import './App.css';
import './output.css';

const searchClient = algoliasearch('74PDHJOPR7', '1a1e9c477658d6adae3ede22d5d4c937');

function App() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-5xl font-bold text-center text-red-500 mb-8 font-times">
          Comic Universe Search
        </h1>
        
        {!showSearch ? (
          <div className="text-center">
            <p className="text-white text-xl mb-8">
              Explore the vast Marvel Universe and discover your favorite comics
            </p>
            <button
              onClick={() => setShowSearch(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <InstantSearch searchClient={searchClient} indexName="marvel_comics_fire">
            {/* Search Controls Container */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex-1 max-w-6xl">
                <SearchContainer />
              </div>
              <div className="ml-4">
                <SortingContainer />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/4">
                <FacetsContainer />
            </div>

            {/* Results Container */}
            <div className="w-3/4">
                <ResultsContainer />
              </div>
            </div>
          </InstantSearch>
        )}
      </div>
    </div>
  );
}

export default App;