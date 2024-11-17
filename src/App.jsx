import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { SearchContainer } from './components/SearchContainer';
import { SortingContainer } from './components/SortingContainer';
import { ResultsContainer } from './components/ResultsContainer';
import { FacetsContainer } from './components/FacetsContainer';
import { createContext, useState, useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'instantsearch.css/themes/satellite.css';
import './App.css';
import './output.css';

export const CartContext = createContext();

const searchClient = algoliasearch('74PDHJOPR7', '1a1e9c477658d6adae3ede22d5d4c937');

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const handleBrowseComics = () => {
    if (searchBoxRef.current) {
      searchBoxRef.current.setQuery('');
      searchBoxRef.current.submit();
    }
    document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-4">
                  Discover Your Next Comic Adventure
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Explore thousands of Marvel comics, from classic storylines to the latest releases.
                  Find your favorite superheroes and villains all in one place.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={handleBrowseComics}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Browse Comics
                  </button>
                  <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-500/30 rounded-lg blur-xl"></div>
 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
          {/* Header with Cart Icon */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600">
              Comic Universe Search
            </h1>
            <div className="relative">
              <button
                className="relative p-2 text-blue-600"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <FaShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-100">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-gray-900">Shopping Cart</h2>
                    {cart.length === 0 ? (
                      <p className="text-gray-600">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex items-start space-x-4 mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                            {/* Thumbnail */}
                            <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                              <img 
                                src={item.thumbnail} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Item Details */}
                            <div className="flex-grow">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                {item.title}
                              </h3>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  <span>Qty: {item.quantity}</span>
                                  <span className="mx-2 text-gray-300">|</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-blue-600 text-sm hover:text-blue-800 font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Cart Total */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-semibold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                          </div>
                          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <InstantSearch searchClient={searchClient} indexName="marvel_comics_fire">
            {/* Search Controls Container */}
            <div className="mb-8 flex items-center space-x-4">
              <div className="flex-grow">
                <SearchContainer searchBoxRef={searchBoxRef} />
              </div>
              <div className="flex-shrink-0">
                <SortingContainer />
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex gap-6">
              {/* Facets Sidebar */}
              <div className="w-48 flex-none">
                <FacetsContainer />
              </div>

              {/* Results */}
              <div className="flex-1 results-section">
                <ResultsContainer />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default App;