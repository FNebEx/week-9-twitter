import { signOut, useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();
  const handleSignOut = () => signOut();

  let success = <p className="text-2xl font-bold">You're logged in</p>;
  let error = <p className="text-2xl font-bold">You're not logged in logged in</p>;
  return ( 
    <div>
      <h1>Home</h1>
      { session ? success : error }
      { session && <button 
        onClick={handleSignOut} 
        className="border rounded px-10 py-2 bg-cyan-500 text-white"
      >Log Out</button>}
     
    </div>
  );
}

export default Home;