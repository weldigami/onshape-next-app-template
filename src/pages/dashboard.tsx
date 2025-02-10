import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react"; 
import { useRouter } from "next/router"; 
import axios from "axios";
import { toast } from "react-toastify"; 

export default function Dashboard() {
  const { data: session, status } = useSession(); // Get session data and authentication status
  const router = useRouter(); // Initialize router instance
  const [userData, setUserData] = useState(null); // State to store user data from Onshape API

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect unauthenticated users to the home page
      return;
    }

    if (status === "authenticated" && session?.user?.accessToken) {
      axios
        .get("https://cad.onshape.com/api/users/sessioninfo", {
          headers: { Authorization: `Bearer ${session.user.accessToken}` }, // Send access token in request headers
        })
        .then((res) => {
          setUserData(res.data); // Store user data in state
          toast.success("Onshape data loaded!"); // Show success notification
        })
        .catch(() => toast.error("Failed to fetch Onshape data")); // Show error notification if request fails
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Loading...</p>; // Show loading message while authentication status is loading
  if (!session) return null; // Return nothing if there is no session data

  return (
    <div>
      <h1>Welcome, {session.user?.name || "User"}!</h1> 
      <pre>{JSON.stringify(userData, null, 2)}</pre> {/* Show formatted user data */}
      <button onClick={() => signOut()}>Sign Out</button> 
    </div>
  );
}
