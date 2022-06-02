import timeago from "lib/timeago";

export default function Tweet({ tweet }) {
  return (
    <>
      {/* <p>
        { tweet.content } - 
      </p> */}
      <div className="border rounded mb-2 w-2/4 p-4">
        <h1><span className="font-bold mr-2">{ tweet.author.name }</span>{ timeago.format(new Date(tweet.createdAt)) }</h1>
        <p>{ tweet.content }</p>
      </div>
    </>
  );
}