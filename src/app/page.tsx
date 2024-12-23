"use client"

import { useState } from "react";

export type User = {
  firstname : string
}


export default function Home() {
  const [users, setUsers] = useState<User[]>([]); // <> type zaaj ogoh
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const res = await fetch("")
  }

  return (
    <div className="">
      hello
    </div>
  );
}
