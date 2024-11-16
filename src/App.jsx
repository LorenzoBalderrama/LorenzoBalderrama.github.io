import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination, SortBy } from 'react-instantsearch';
import { useInstantSearch } from 'react-instantsearch';
import { useState } from 'react';
import 'instantsearch.css/themes/satellite.css';
import './App.css';
import './output.css';

const searchClient = algoliasearch('74PDHJOPR7', '1a1e9c477658d6adae3ede22d5d4c937');

/* 
Testing
*/



/* 
Testing
*/

function NoResults() {
  return (
    <div className="text-center text-gray-400 py-12">
      <p className="text-xl">No comics found matching your search.</p>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="text-center text-gray-400 py-12">
      <p className="text-xl">Loading comics...</p>
    </div>
  );
}


function CustomHits({ hitComponent: HitComponent }) {
  const { results, status } = useInstantSearch();

  if (status === 'loading') {
    return <LoadingIndicator />;
  }

  if (results.nbHits === 0) {
    return <NoResults />;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {results.hits.map(hit => (
        <HitComponent key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
}

function Hit({ hit }) {
  console.log('Thumbnail data:', hit.thumbnail); // Debug log
  
  const thumbnailUrl = hit.thumbnail?.portrait || hit.thumbnail?.standard || 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  return (
    <article className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Comic Header with Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={thumbnailUrl} 
          alt={hit.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{hit.title}</h1>
          <p className="text-gray-300">
            Issue #{hit.issueNumber}
          </p>
        </div>
      </div>

      {/* Comic Details */}
      <div className="p-4 space-y-4">
        {/* Publication Info */}
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Published: {hit.dates?.onsaleDate ? new Date(hit.dates.onsaleDate).toLocaleDateString() : 'N/A'}</span>
          <span>{hit.pageCount} pages</span>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
          <p className="text-gray-300">{hit.description || 'No description available'}</p>
        </div>

        {/* Price */}
        {hit.prices && hit.prices.length > 0 && (
          <div className="text-green-500 font-bold">
            Price: ${hit.prices[0].price}
          </div>
        )}

        {/* Characters */}
        {hit.characters && hit.characters.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Featured Characters</h2>
            <div className="flex flex-wrap gap-2">
              {hit.characters.map((characterName, index) => (
                <div 
                  key={index}
                  className="bg-gray-700 rounded-full px-3 py-1"
                >
                  <span className="text-gray-200">{characterName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function App() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-5xl font-bold text-center text-red-500 mb-8 font-times">
          Marvel Universe Search
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
            <div className="lg:flex lg:space-x-8">
              {/* Left Column: Search */}
              <div className="lg:w-1/3 space-y-6 mb-8 lg:mb-0">
                <SearchBox 
                  className="w-full"
                  placeholder="Search Marvel Comics..."
                  classNames={{
                    root: 'p-4',
                    form: 'relative',
                    input: 'block w-full rounded-lg border-2 border-red-500 bg-gray-800 py-3 px-4 text-white placeholder-gray-400 shadow-lg focus:border-red-600 focus:ring-red-500 text-lg',
                    submit: 'absolute inset-y-0 right-0 flex items-center pr-4 text-red-500',
                    reset: 'absolute inset-y-0 right-8 flex items-center text-red-500',
                  }}
                />
                {/* Add refinement lists or other filters here */}
              </div>

              {/* Right Column: Results */}

              <div>
              <SortBy
                items ={[
                  { label: 'Default', value: 'marvel_comics_titles_asc' },
                  { label: 'Price (asc)', value: 'instant_search_price_asc' },
                  { label: 'Price (desc)', value: 'instant_search_price_desc' },
                ]}
                />
              </div>
              <div className="lg:w-2/3">
                <CustomHits hitComponent={Hit} />
                <div className="mt-8">
                  <Pagination 
                    className="flex justify-center"
                    classNames={{
                      list: 'flex space-x-2',
                      item: 'px-3 py-2 rounded-lg',
                      selectedItem: 'bg-red-500 text-white',
                      disabledItem: 'opacity-50 cursor-not-allowed',
                    }}
                  />
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