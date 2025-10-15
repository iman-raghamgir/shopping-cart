import React from "react";

// ProductCard component - displays product info and handles add to cart
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-xl overflow-hidden">
      {/* Product image */}
      <div className="h-52 overflow-hidden border-b border-gray-200 flex items-center justify-center bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
      </div>

      <div className="p-4 text-left">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1 mb-3">
          {product.description || "This is a great product you’ll love!"}
        </p>
        <p className="text-gray-900 font-semibold mb-4">${product.price}</p>

        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800
           text-white py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
