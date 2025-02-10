"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      {/* Display the main heading of the application */}
      <h1>Welcome to OnShape Plugin</h1>
      
      {/* Button to trigger the OnShape authentication process */}
      <button onClick={() => signIn("onshape")}>Sign in with OnShape</button>
    </div>
  );
}
