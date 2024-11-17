import { Hits, Pagination, Stats } from 'react-instantsearch';
import { useContext } from 'react';
import { CartContext } from '../App';

const ComicHit = ({ hit }) => {
  const { addToCart } = useContext(CartContext);
  const thumbnailUrl = hit.thumbnail?.portrait || hit.thumbnail?.standard || 'default-image.jpg';
  const price = hit.prices;
  const characters = hit.characters || [];

  return (
    <article className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Comic Cover Image */}
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img 
          src={thumbnailUrl} 
          alt={hit.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
        />
      </div>

      {/* Comic Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {hit.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">Issue #{hit.issueNumber}</p>
        </div>

        {/* Featured Characters */}
        {characters.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Featured Characters:</h4>
            <div className="flex flex-wrap gap-2">
              {characters.slice(0, 3).map((character, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-blue-100 rounded-full px-3 py-1 transition-colors duration-200 hover:bg-blue-200"
                >
                  <span className="text-xs text-blue-800">{character.name || character}</span>
                </div>
              ))}
              {characters.length > 3 && (
                <span className="text-xs text-gray-500">+{characters.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 -mx-4"></div>

        {/* Price and Add to Cart Section */}
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-green-600 text-center">
            {price > 0 ? `$${price.toFixed(2)}` : 'N/A'}
          </p>
          <button
            onClick={() => addToCart({
              id: hit.objectID,
              title: hit.title,
              price: price > 0 ? price : 9.99,
              thumbnail: thumbnailUrl
            })}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export function ResultsContainer() {
  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 transition-colors duration-200 hover:bg-gray-100">
        <Stats
          classNames={{
            root: 'text-sm text-gray-600 hover:text-gray-700 transition-colors duration-200',
            text: 'inline-block'
          }}
          translations={{
            rootElementText: ({
              nbHits,
              processingTimeMS,
              nbSortedHits,
              areHitsSorted
            }) => {
              return areHitsSorted && nbHits !== nbSortedHits
                ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} comics found in ${processingTimeMS.toLocaleString()}ms`
                : `${nbHits.toLocaleString()} comics found in ${processingTimeMS.toLocaleString()}ms`;
            },
          }}
        />
      </div>

      {/* Search Results Grid */}
      <Hits 
        classNames={{
          root: 'min-h-[200px]',
          list: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          item: 'transform transition-transform duration-200 hover:-translate-y-1',
        }}
        hitComponent={ComicHit}
      />

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination 
          classNames={{
            root: 'flex justify-center',
            list: 'flex space-x-2',
            item: 'transition-colors duration-200',
            link: 'px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            selectedItem: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 [&>a]:text-white [&>a]:hover:bg-transparent',
            disabledItem: 'opacity-50 cursor-not-allowed [&>a]:hover:bg-transparent',
            firstItem: 'rounded-l-lg',
            lastItem: 'rounded-r-lg',
          }}
        />
      </div>
    </div>
  );
}