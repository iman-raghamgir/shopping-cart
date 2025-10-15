import React, { useState, useEffect, useRef } from "react";

// Cart component - displays cart items, quantity controls, and purchase functionality
const Cart = ({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, highlightItemId }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState(null);
  const itemRefs = useRef({});

  // Auto-scroll and highlight newly added items
  useEffect(() => {
    if (highlightItemId == null) return;
    
    const element = itemRefs.current[highlightItemId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveHighlightId(highlightItemId);
      const timeout = setTimeout(() => setActiveHighlightId(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [highlightItemId, cartItems]);

  // Handle purchase with animation
  const handlePurchase = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
     
      alert('Purchase completed!');
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 mb-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-3 border-b pb-3">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                ref={(el) => itemRefs.current[item.id] = el}
                className={`flex justify-between items-center border-b pb-2 rounded-md transition-all
                ${activeHighlightId === item.id ? 'duration-200 ease-out' : 'duration-700 ease-out'}
                 ${activeHighlightId === item.id ? 'bg-purple-50 ring-2 ring-purple-300 scale-[1.02]' : 'bg-white ring-0 scale-100'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 hover:bg-gray-200 transition"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="text-gray-700 font-medium">
                    ${item.price * item.quantity}
                  </span>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                    title="Remove from cart"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart summary and purchase button */}
          <div className="flex justify-between items-center pt-4 border-t relative">
            <div className="font-semibold text-gray-800 text-lg">
              Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items): ${totalPrice}
            </div>
            <div className="relative">
              <button 
                onClick={handlePurchase}
                className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm ${isAnimating ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <span className={`transition-transform duration-1000 ${isAnimating ? 'translate-x-32' : ''}`}>🛒</span>
                <span className={isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>Complete Purchase</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;