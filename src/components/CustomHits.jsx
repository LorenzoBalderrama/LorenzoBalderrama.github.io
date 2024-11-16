/*

import { useInstantSearch } from 'react-instantsearch';

export function CustomHits({ hitComponent: HitComponent }) {
  const { results, status } = useInstantSearch();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (results.nbHits === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {results.hits.map(hit => (
        <HitComponent key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
}

*/