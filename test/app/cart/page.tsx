"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { increment, decrement, incrementBy5, reset } from "@/lib/features/counter/counterSlice";

const CartPage = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className='h-full bg-slate-200 flex flex-col gap-4 justify-center items-center'>
      <h1 className=' text-6xl font-bold bg-gradient-to-br from-black to-slate-300 bg-clip-text text-transparent'>
        Cart : <span className='text-5xl font-bold text-black border border-black p-5'>{count}</span>
      </h1>
      <div className='flex mt-10 gap-4'>
        <button className='bg-gray-600 px-4 py-2 text-white rounded ' onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button className='bg-gray-600 px-4 py-2 text-white rounded ' onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button className='bg-gray-600 px-4 py-2 text-white rounded ' onClick={() => dispatch(incrementBy5())}>
          Increase by 5
        </button>
        <button className='bg-gray-600 px-4 py-2 text-white rounded ' onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CartPage;
