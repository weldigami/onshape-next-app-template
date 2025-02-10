"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  // Retrieve user session and authentication status
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Redirect to home page if user is not authenticated
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    // Fetch user session info from Onshape API if authenticated
    if (status === "authenticated" && session?.user?.accessToken) {
      axios
        .get("https://cad.onshape.com/api/users/sessioninfo", {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        })
        .then((res) => {
          setUserData(res.data);
          toast.success("Onshape data loaded!");
        })
        .catch(() => toast.error("Failed to fetch Onshape data"));
    }
  }, [status, session, router]);

  // Show loading message while authentication status is being determined
  if (status === "loading") return <p>Loading...</p>;
  // Return null if session is not available
  if (!session) return null;

  return (
    <div>
      <h1>Welcome, {session.user?.name || "User"}!</h1>
      {/* Display retrieved user data in a formatted JSON block */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {/* Logout button to sign the user out */}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
