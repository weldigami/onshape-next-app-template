"use client";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session) return <p>Loading...</p>;
  const fetchData = async () => {
    try {
      
      toast({ title: "Success", description: "Data fetched from Onshape!" });

    } catch {
      toast({ title: "Error", description: "Failed to fetch data" });
    }
  };
  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={fetchData}>Fetch Onshape Data</button>
    </div>
  );
}