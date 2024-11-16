import { SearchBox } from 'react-instantsearch';

export function SearchContainer() {
  return (
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
    </div>
  );
}