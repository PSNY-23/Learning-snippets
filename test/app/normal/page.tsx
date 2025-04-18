'use client'

import React, { useState } from "react";

export default function CartApp() {
  const [cart, setCart] = useState<Record<string, number>>({
    shoes: 0,
    shirts: 0,
    pants: 0,
    books: 0,
  });

  const addItem = (item: string) => {
    setCart((prev) => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const removeItem = (item: string) => {
    setCart((prev) => ({
      ...prev,
      [item]: prev[item] > 0 ? prev[item] - 1 : 0,
    }));
  };

  const resetCart = () => {
    setCart({ shoes: 0, shirts: 0, pants: 0, books: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-50">
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
              <p className="mb-10 border-2 p-4">The state management with <span className="text-xl text-black font-bold">useState</span></p>
        <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
        <ul className="mb-4 space-y-2">
          {Object.entries(cart).map(([item, count]) => (
            <li key={item} className="flex justify-between">
              <span className="capitalize">{item}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-3">
          {Object.keys(cart).map((item) => (
            <React.Fragment key={item}>
              <button
                onClick={() => addItem(item)}
                className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1 text-sm"
              >
                Add {item}
              </button>
              <button
                onClick={() => removeItem(item)}
                className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm"
              >
                Remove {item}
              </button>
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={resetCart}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded py-2"
        >
          Reset Cart
        </button>
      </div>
    </div>
  );
}
