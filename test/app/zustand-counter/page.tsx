"use client";

import { useCountStore } from "@/app/zustand-counter/store/count-store";

export default function Home() {
  const { count, decrease, increase, reset } = useCountStore();
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-4xl font-bold'>Counter: {count}</h1>
      <div className='flex gap-4'>
        <button className='bg-green-500 px-4 py-2 rounded text-white' onClick={increase}>
          Increase
        </button>
        <button className='bg-red-500 px-4 py-2 rounded text-white' onClick={decrease}>
          Decrease
        </button>
        <button className='bg-gray-600 px-4 py-2 rounded text-white' onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
