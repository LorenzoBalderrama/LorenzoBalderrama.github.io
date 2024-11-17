import { Hits, Pagination } from 'react-instantsearch';

const ComicHit = ({ hit }) => {
  const thumbnailUrl = hit.thumbnail?.portrait || hit.thumbnail?.standard || 'default-image.jpg';
  const price = hit.prices

  return (
    <article className="group relative">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img 
          src={thumbnailUrl} 
          alt={hit.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {hit.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">Issue #{hit.issueNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
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
          list: 'grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8',
          item: '',
        }}
        hitComponent={ComicHit}
      />
      <div className="mt-8">
        <Pagination 
          className="flex justify-center"
          classNames={{
            list: 'flex space-x-2',
            item: 'px-3 py-2 rounded-lg border',
            selectedItem: 'bg-gray-900 text-white border-gray-900',
            disabledItem: 'opacity-50 cursor-not-allowed',
          }}
        />
      </div>
    </div>
  );
}