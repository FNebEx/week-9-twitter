import NewTweet from "components/NewTweet";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

function Home() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const handleSignOut = () => signOut();
  let error = <p className="text-2xl font-bold">You're not logged</p>;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!content) {
      alert('No content!');
      return;
    }

    fetch('/api/tweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
  }

  const handleOnChange = (event) => {
    setContent(event.target.value);
  }

  if (!session || !session.user) return error;

  if (status === 'loading') {
    return <p>Loading ...</p>
  }

  return ( 
    <div>
      <h1>Home</h1>
      { session ? <NewTweet handleSubmit={handleSubmit} handleOnChange={handleOnChange}/> : error }
      { session && <button 
        onClick={handleSignOut} 
        className="border rounded px-10 py-2 bg-cyan-500 text-white"
      >Log Out</button>}
     
    </div>
  );
}

export default Home;