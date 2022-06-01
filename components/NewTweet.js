const { useSession } = require("next-auth/react");

function NewTweet({ handleSubmit, handleOnChange}) {
  const { data: session } = useSession();

  if (!session) return null;

  return ( 
    // This form should be it's own component
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div class="flex-1 px-1 pt-2 mt-2 mr-1 ml-1">
          <textarea 
            onChange={handleOnChange}
            className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
            name="content" 
            rows={2} 
            cols={50} 
            placeholder="What's Happening?"
          />
        </div>
      </div>
      <div className="flex">
        <div class="flex-1 mb-5">
          <button className="border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full">Tweet</button>
        </div>
      </div>
    </form>
  );
}

export default NewTweet;