"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h1>Welcome to OnShape Plugin</h1>
      {/* Button to initiate sign-in with OnShape authentication provider */}
      <button
        onClick={() =>
          signIn("onshape", {
            callbackUrl: "http://localhost:3000/dashboard", // Redirect after successful login
          })
        }
      >
        Sign in with OnShape
      </button>
    </div>
  );
}
