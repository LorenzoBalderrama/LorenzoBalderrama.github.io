import { Hits, Pagination, Stats } from 'react-instantsearch';
import { useContext, useState } from 'react';
import { CartContext } from '../App';

const ComicModal = ({ hit, onClose }) => {
  const { addToCart } = useContext(CartContext);

  if (!hit) return null;

  const modalThumbnail = hit.thumbnail?.standard || hit.thumbnail?.portrait || 'default-image.jpg';

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quick View</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={modalThumbnail}
            alt={hit.title}
            className="w-36 h-36 object-cover rounded-lg"
          />
          <h3 className="text-lg font-bold text-center">{hit.title}</h3>
          <p className="text-sm text-gray-500 text-center">Issue #{hit.issueNumber}</p>
          <p className="text-lg font-bold text-green-600">${hit.prices > 0 ? hit.prices.toFixed(2) : '9.99'}</p>
          <p className="text-sm text-gray-500 text-center">
            <span className="font-medium">Release Date:</span> {hit.modified || 'Coming Soon'}
          </p>
          <p className="text-sm text-gray-500 text-center">
            <span className="font-medium">By:</span>{' '}
            {hit.creators?.items?.map((creator) => creator.name).join(', ') || 'Unknown'}
          </p>
          <p className="text-sm text-gray-500 text-center">
            {hit.description || 'No description available.'}
          </p>

          <button
            onClick={() => {
              addToCart({
                id: hit.objectID,
                title: hit.title,
                price: hit.prices > 0 ? hit.prices : 9.99,
                thumbnail: modalThumbnail,
              });
              onClose();
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full max-w-xs"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ComicHit = ({ hit, onOpenModal }) => {
  const { addToCart } = useContext(CartContext);
  const thumbnailUrl = hit.thumbnail?.standard || hit.thumbnail?.portrait || 'default-image.jpg';
  const price = hit.prices;

  return (
    <article
      className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onOpenModal(hit)}
    >
      {/* Comic Cover */}
      <div className="aspect-square bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={hit.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Comic Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium">{hit.title}</h3>
        <p className="text-xs text-gray-500">Issue #{hit.issueNumber}</p>
        <p className="text-lg font-bold text-green-600">
          {price > 0 ? `$${price.toFixed(2)}` : 'N/A'}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: hit.objectID,
              title: hit.title,
              price: price > 0 ? price : 9.99,
              thumbnail: thumbnailUrl,
            });
          }}
          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export function ResultsContainer() {
  const [selectedHit, setSelectedHit] = useState(null);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Stats
        className="text-sm text-gray-600"
        translations={{
          rootElementText: ({ nbHits, processingTimeMS }) =>
            `${nbHits} comics found in ${processingTimeMS}ms`,
        }}
      />

      {/* Hits */}
      <Hits
        classNames={{
          root: 'min-h-[200px]',
          list: 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        }}
        hitComponent={({ hit }) => (
          <ComicHit hit={hit} onOpenModal={setSelectedHit} />
        )}
      />

      {/* Single Modal Instance */}
      {selectedHit && (
        <ComicModal
          hit={selectedHit}
          onClose={() => setSelectedHit(null)}
        />
      )}

      {/* Pagination */}
      <Pagination
        classNames={{
          root: 'flex justify-center',
          list: 'flex space-x-2',
          item: 'px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100',
          selectedItem: 'bg-blue-600 text-white',
          disabledItem: 'opacity-50 cursor-not-allowed',
        }}
      />
    </div>
  );
}