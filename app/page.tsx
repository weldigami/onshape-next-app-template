// app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded
    if (!session) {
      router.push("https://oauth.onshape.com/oauth/signin");
    } else {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  return <p>Redirecting...</p>;
}
