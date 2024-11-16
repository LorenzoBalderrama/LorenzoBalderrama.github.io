import { SortBy } from 'react-instantsearch';

export function SortingContainer() {
  return (
    <div>
      <SortBy
        items={[
          { label: 'Default', value: 'marvel_comics_titles_asc' },
          { label: 'Price (asc)', value: 'instant_search_price_asc' },
          { label: 'Price (desc)', value: 'instant_search_price_desc' },
        ]}
      />
    </div>
  );
}