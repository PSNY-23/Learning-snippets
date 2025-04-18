"use client";

import { useState } from "react";
import { useUserStore } from "./store/cart-store";


const Page = () => {
  const { user, changeName, changeAge, changeJob, changeCountry } = useUserStore();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [job, setJob] = useState("");
  const [country, setCountry] = useState("");
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-lg font-bold'>Zustand Implementation in Nextjs</h1>
      <div className='flex flex-col border p-4 text-3xl gap-4'>
        <div className='grid grid-cols-3 gap-2 items-center justify-around'>
          <p>Name: {user.name}</p>
          <input
            className='outline-none border-2 border-black'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => changeName(name)}>Change Name</button>
        </div>
        <div className='grid grid-cols-3 gap-2 items-center justify-center'>
          <p>Age: {user.age}</p>
          <input className='outline-none border-2 border-black' value={age} onChange={(e) => setAge(e.target.value)} />
          <button onClick={() => changeAge(age)}>Change age</button>
        </div>
        <div className='grid grid-cols-3 gap-2 items-center justify-center'>
          <p>JOB: {user.job}</p>
          <input className='outline-none border-2 border-black' value={job} onChange={(e) => setJob(e.target.value)} />
          <button onClick={() => changeJob(job)}>Change JOB</button>
        </div>
        <div className='grid grid-cols-3 gap-2 items-center justify-center'>
          <p>Country: {user.country}</p>
          <input
            className='outline-none border-2 border-black'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button onClick={() => changeCountry(country)}>Change country</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
