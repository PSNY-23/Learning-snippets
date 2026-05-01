'use client'

import { useEffect, useState } from "react";

export default function Home() {

  const [user, setUser] = useState(null)
  const fetchUser = async() => {
    const res = await fetch("http://localhost:4000/user");
    const data = await res.json();
    setUser(data)
  }

  useEffect(() => { 
    fetchUser();
  }, [])
  if(!user)   <p>No user exists</p>
  return (
    <div>
      <h1>This is User data from Server: </h1>
      <div>{JSON.stringify(user)}</div>
   </div> 
  );
}
