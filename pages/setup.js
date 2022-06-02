import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from 'react';

function Setup() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const router = useRouter();
  const loading = status === 'loading';

  if (!session || !session.user) return null;
  if (loading) return null;

  if (!loading && session.user.name)
    router.push('/home');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/setup', {
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });

    session.user.name = name;
    router.push('/home');
  }

  return (
    // This too should be its own component
    <>
      <form className="mt-10 ml-20" onSubmit={handleSubmit}>
        <div className="flex-1 mb-5">Username</div>
        <div className="flex-1 mb-5">
          
          <input 
            type="text" 
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)} 
            className="border rounded p-1"
          />
        </div>
        <button className="border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover">Save</button>
      </form>
    </>
  );
}

export default Setup;