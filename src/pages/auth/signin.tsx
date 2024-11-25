// pages/auth/signin.tsx
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <label>
        Email:
        <input name="email" type="email" />
      </label>
      <br />
      <label>
        Password:
        <input name="password" type="password" />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
}
