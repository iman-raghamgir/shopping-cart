import React, { useState } from "react";
import ProductCard from "./Components/ProductCard";
import Cart from "./Components/Cart";
import laptopImg from "./assets/laptop.jpg";
import phoneImg from "./assets/smartphone.jpg";
import headphonesImg from "./assets/headphone.webp";
import smartwatchImg from "./assets/smartwatch.jpg";
import airpodImg from "./assets/airpod.webp";
import powerBankImg from "./assets/PowerBank.jpg";

// Product catalog data - list of available products in the store
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 699,
    description:
      "Powerful performance for work and play — sleek design meets long-lasting battery life.",
    image: laptopImg,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699,
    description:
      "Stay connected in style with a vibrant display and advanced camera features.",
    image: phoneImg,
  },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    description:
      "Immersive sound experience with crystal-clear audio and comfortable fit.",
    image: headphonesImg,
  },
  {
    id: 4,
    name: "SmartWatch",
    price: 299,
    description:
      "Track your fitness, heart rate, and notifications — a perfect balance of style and technology.",
    image: smartwatchImg,
  },
  {
    id: 5,
    name: "AirPods",
    price: 190,
    description:
      "Wireless freedom with crystal-clear sound and all-day comfort — your perfect audio companion.",
    image: airpodImg,
  },
  {
    id: 6,
    name: "PowerBank",
    price: 55,
    description:
      "Compact and powerful — keep your devices charged anywhere, anytime.",
    image: powerBankImg,
  },
];

// Main App component — handles products, cart logic, and UI layout
function App() {
  const [cartItems, setCartItems] = useState([]); // Cart state
  const [highlightItemId, setHighlightItemId] = useState(null); // Highlight effect for added item

  // Add product to cart (if exists → increase quantity)
  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setHighlightItemId(product.id);
  };

  // Remove product completely from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Increase product quantity by 1
  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease product quantity (min = 1)
  const decreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Calculate total price of all items in cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{ backgroundColor: "#bcd4cc" }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-10">🛍️ My Shop</h1>

      {/* Product grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10 w-full max-w-5xl">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Shopping cart section */}
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        totalPrice={totalPrice}
        highlightItemId={highlightItemId}
      />
    </div>
  );
}

export default App;
