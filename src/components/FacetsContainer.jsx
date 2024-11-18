import { RefinementList } from 'react-instantsearch';
import { RangeSlider } from './RangeSlider';

export function FacetsContainer() {
  return (
    <div className="space-y-8">
      {/* Price Range Slider */}
      <div className="bg-white rounded-lg border border-gray-200 px-3 py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Price range</h3>
        <RangeSlider 
          attribute="prices"
        />
      </div>

      {/* Characters Refinement List */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Characters</h3>
        <RefinementList 
          attribute="characters.name" 
          showMore={true}
          sortBy={['name:asc']}
          classNames={{
            root: 'space-y-2',
            list: 'space-y-2',
            item: 'flex items-center justify-between group',
            label: 'flex items-center space-x-3 w-full cursor-pointer',
            checkbox: 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
            labelText: 'text-sm text-gray-700 group-hover:text-gray-900',
            count: 'ml-auto text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5 group-hover:bg-blue-100 group-hover:text-blue-800',
            showMore: 'text-sm text-blue-600 hover:text-blue-800 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
            disabledShowMore: 'opacity-50 cursor-not-allowed',
            loadingShowMore: 'opacity-50 cursor-wait',
          }}
          translations={{
            showMore(expanded) {
              return expanded ? 'Show less' : 'Show more'
            },
          }}
        />
      </div>

      {/* Creators Refinement List */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Creators</h3>
        <RefinementList 
          attribute="creators.name" 
          showMore={true}
          sortBy={['name:asc']}
          classNames={{
            root: 'space-y-2',
            list: 'space-y-2',
            item: 'flex items-center justify-between group',
            label: 'flex items-center space-x-3 w-full cursor-pointer',
            checkbox: 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
            labelText: 'text-sm text-gray-700 group-hover:text-gray-900',
            count: 'ml-auto text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5 group-hover:bg-blue-100 group-hover:text-blue-800',
            showMore: 'text-sm text-blue-600 hover:text-blue-800 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
            disabledShowMore: 'opacity-50 cursor-not-allowed',
            loadingShowMore: 'opacity-50 cursor-wait',
          }}
          translations={{
            showMore(expanded) {
              return expanded ? 'Show less' : 'Show more'
            },
          }}
        />
      </div>
    </div>
  );
}