import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignIn = () => signIn();
  const handleSignOut = () => signOut();

  if (status === 'loading') return null;
  if (session) router.push('/home'); 

  return (
    <>
      <h1 className="text-2xl font-bold">Twitter Clone</h1>

      <button 
        onClick={handleSignIn} 
        className="border rounded px-10 py-2 bg-cyan-500 text-white"
      >Log In</button>
    </>
  )
}
