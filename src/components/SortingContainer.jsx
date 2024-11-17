import { SortBy } from 'react-instantsearch';

export function SortingContainer() {
  return (
    <div>
      <SortBy
        items={[
          { label: 'Default', value: 'marvel_comics_fire' },
          { label: 'A-Z', value: 'marvel_comics_titles_asc' },
          { label: 'Z-A', value: 'marvel_comics_titles_desc' },
          { label: 'Price (asc)', value: 'marvel_data_price_asc' },
          { label: 'Price (desc)', value: 'marvel_data_price_desc' },
        ]}
      />
    </div>
  );
}