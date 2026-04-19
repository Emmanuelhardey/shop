"use client";
import { useState } from "react";

export default function ClothingStoreDemo() {
  const products = [
    { id: 1, name: 'Classic Hoodie', price: 45 },
    { id: 2, name: 'Urban T-Shirt', price: 25 },
    { id: 3, name: 'Slim Fit Jeans', price: 55 },
  ];

  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [message, setMessage] = useState("");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setMessage(`${product.name} added to cart`);
  };

  const buyNow = (product) => {
    setCart([product]);
    setPage("checkout");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = (e) => {
    e.preventDefault();

    // Simulated conversion tracking (Google Ads / GA4 style)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "purchase",
      value: total,
      currency: "USD",
      items: cart
    });

    console.log("PURCHASE EVENT FIRED", { total, cart });

    setPage("thankyou");
    setCart([]);
  };

  if (page === "thankyou") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order 🎉</h1>
          <p className="text-gray-600 mb-6">Your purchase has been successfully recorded.</p>
          <button
            onClick={() => setPage("home")}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  if (page === "checkout") {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${total}</div>
        </div>

        <form onSubmit={placeOrder} className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

          <input className="w-full border p-2 mb-3" placeholder="Full Name" required />
          <input className="w-full border p-2 mb-3" placeholder="Email" required />
          <input className="w-full border p-2 mb-3" placeholder="Address" required />

          <button className="w-full bg-black text-white py-3 rounded-xl">
            Place Order
          </button>
        </form>

        <button
          onClick={() => setPage("home")}
          className="mt-4 underline"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Emmanuel Fashion Store</h1>
        <div className="space-x-4">
          <button onClick={() => setPage("checkout")} className="px-4 py-2 rounded-2xl shadow bg-white">
            Cart ({cart.length})
          </button>
        </div>
      </header>

      <section className="bg-white rounded-2xl shadow p-8 mb-10">
        <h2 className="text-4xl font-bold mb-3">Shop Trendy Fashion</h2>
        <p className="text-gray-600 mb-6">Discover premium outfits at amazing prices.</p>
        <button onClick={() => setPage("checkout")} className="bg-black text-white px-6 py-3 rounded-xl">
          Go to Cart
        </button>
      </section>

      {message && (
        <div className="mb-6 p-4 bg-white rounded-xl shadow">
          {message}
        </div>
      )}

      <section className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">${product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-black text-white py-2 rounded-xl mt-4"
            >
              Add to Cart
            </button>

            <button
              onClick={() => buyNow(product)}
              className="w-full border py-2 rounded-xl mt-2"
            >
              Buy Now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
