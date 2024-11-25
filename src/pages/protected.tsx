// pages/protected.tsx
import { useSession, signIn } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    signIn(); // Redirect to sign-in page
    return null;
  }

  return <p>Welcome, {session?.user?.name}!</p>;
}
