import { Hits, Pagination } from 'react-instantsearch';

export function ResultsContainer() {
  const ComicHit = ({ hit }) => {
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
  };

  return (
    <div className="lg:w-2/3">
      <Hits 
        classNames={{
          root: '',
          list: 'grid grid-cols-1 gap-8',
          item: '',
        }}
        hitComponent={ComicHit}
      />
      <div className="mt-8">
        <Pagination 
          className="flex justify-center"
          classNames={{
            list: 'flex space-x-2',
            item: 'px-3 py-2 rounded-lg text-white',
            selectedItem: 'bg-red-500 text-white',
            disabledItem: 'opacity-50 cursor-not-allowed',
          }}
        />
      </div>
    </div>
  );
}