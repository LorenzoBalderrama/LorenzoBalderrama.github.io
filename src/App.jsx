import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { SearchContainer } from './components/SearchContainer';
import { SortingContainer } from './components/SortingContainer';
import { ResultsContainer } from './components/ResultsContainer';
import { FacetsContainer } from './components/FacetsContainer';
import 'instantsearch.css/themes/satellite.css';
import './App.css';
import './output.css';

const searchClient = algoliasearch('74PDHJOPR7', '1a1e9c477658d6adae3ede22d5d4c937');

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-5xl font-bold text-center text-red-500 mb-8 font-times">
          Comic Universe Search
        </h1>
        
        <InstantSearch searchClient={searchClient} indexName="marvel_comics_fire">
          {/* Search Controls Container */}
          <div className="mb-8 flex items-center space-x-4">
            <div className="flex-grow">
              <SearchContainer />
            </div>
            <div className="flex-shrink-0">
              <SortingContainer />
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="flex gap-6">
            {/* Facets Sidebar */}
            <div className="w-48 flex-none">
              <FacetsContainer />
            </div>

            {/* Results */}
            <div className="flex-1">
              <ResultsContainer />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default App;