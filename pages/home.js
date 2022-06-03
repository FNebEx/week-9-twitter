import NewTweet from "components/NewTweet";
import Tweets from "components/Tweets";
import { getTweets } from "lib/data";
import prisma from "lib/prisma";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

function Home({ tweets }) {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  const router = useRouter();
  const handleSignOut = () => signOut();
  const handleSignIn = () => signIn();
  const error = <p className="text-2xl font-bold">You're not logged</p>;
  let loading = status === "loading";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content) {
      alert('No content!');
      return;
    }

    await fetch('/api/tweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    router.reload(window.location.pathname);
  }

  const handleOnChange = (event) => {
    setContent(event.target.value);
  }

  if (!session) {
    // router.push('/');
    console.log(123);
  }

  if (loading) {
    return null;
  }

  if (session && !session.user.name) {
    router.push('/setup')
  }

  return ( 
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      { !session && <button onClick={handleSignIn} className="border rounded px-10 py-2 bg-cyan-500 text-white inline">Sign In</button> }
      { session && <h1>Welcome {session && session.user.name }</h1>}
      { session && <button 
        onClick={handleSignOut} 
        className="border rounded px-10 py-2 bg-cyan-500 text-white inline"
      >Log Out</button>}
     
      <NewTweet handleSubmit={handleSubmit} handleOnChange={handleOnChange}/>
      <Tweets tweets={tweets}/>
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  let tweets = await getTweets(prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets
    }
  }
}