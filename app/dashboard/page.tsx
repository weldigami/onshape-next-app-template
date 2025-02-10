"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOnshapeUser } from "@/lib/onshape";
import { showToast } from "@/components/Toast";

export default function Dashboard() {
  // Get session data and authentication status
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Redirect to home if user is not authenticated
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    // Fetch Onshape user data if authenticated
    if (status === "authenticated" && session?.user?.accessToken) {
      fetchOnshapeUser(session.user.accessToken)
        .then((data) => {
          setUserData(data);
          showToast("Onshape data loaded!", "success"); // Success notification
        })
        .catch(() => showToast("Failed to fetch Onshape data", "error")); // Error notification
    }
  }, [status, session, router]);

  // Show loading state while checking authentication
  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  return (
    <div>
      {/* Display user name if available, otherwise default to "User" */}
      <h1>Welcome, {session.user?.name || "User"}!</h1>
      
      {/* Display fetched Onshape user data */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      
      {/* Logout button */}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
