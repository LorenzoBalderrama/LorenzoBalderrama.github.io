import { Hits, Pagination } from 'react-instantsearch';

const ComicHit = ({ hit }) => {
  const thumbnailUrl = hit.thumbnail?.portrait || hit.thumbnail?.standard || 'default-image.jpg';
  const price = hit.prices
  const characters = hit.characters || [];

  return (
    <article className="group relative bg-gray-800 rounded-lg overflow-hidden">
      {/* Comic Cover Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={thumbnailUrl} 
          alt={hit.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>

      {/* Comic Info */}
      <div className="p-4 space-y-3">
        {/* Title and Price */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-white">
            {hit.title}
          </h3>
          <p className="text-sm font-semibold text-green-400">
            {price > 0 ? `$${price.toFixed(2)}` : 'N/A'}
          </p>
        </div>

        <p className="mt-1 text-sm text-gray-400">Issue #{hit.issueNumber}</p>

        {/* Featured Characters */}
        {characters.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-400 mb-2">Featured Characters:</h4>
            <div className="flex flex-wrap gap-2">
              {characters.slice(0, 3).map((character, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-gray-700 rounded-full px-3 py-1"
                >
                  <span className="text-xs text-gray-200">{character.name || character}</span>
                </div>
              ))}
              {characters.length > 3 && (
                <span className="text-xs text-gray-400">+{characters.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export function ResultsContainer() {
  return (
    <div>
      <Hits 
        classNames={{
          root: '',
          list: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          item: '',
        }}
        hitComponent={ComicHit}
      />
      <div className="mt-8">
        <Pagination 
          className="flex justify-center"
          classNames={{
            list: 'flex space-x-2',
            item: 'px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-700',
            selectedItem: 'bg-red-500 text-white border-red-500 hover:bg-red-600',
            disabledItem: 'opacity-50 cursor-not-allowed hover:bg-transparent',
          }}
        />
      </div>
    </div>
  );
}