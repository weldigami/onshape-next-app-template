import { useSession, signIn } from "next-auth/react"; 
import { useEffect } from "react";
import { useRouter } from "next/router"; 

export default function Home() {
  const { data: session } = useSession(); // Get session data from authentication
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    if (session) {
      router.push("/dashboard"); // Redirect authenticated users to the dashboard
    }
  }, [session, router]); // Re-run effect when session or router changes

  return (
    <div>
      <h1>Welcome to OnShape Plugin</h1> 
      <button onClick={() => signIn("onshape")}>Sign in with OnShape</button> 
    </div>
  );
}
