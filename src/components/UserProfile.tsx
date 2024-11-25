// components/UserProfile.tsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <>
        <p>You are not logged in.</p>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }

  return (
    <>
      <p>Welcome, {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}
