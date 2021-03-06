import Tweet from "./Tweet";

export default function Tweets({ tweets }) {
  if (!tweets) return null;
  
  return (
    <>
      {tweets.map((tweet, index) => {
        return <Tweet key={index} tweet={tweet} />
      })}
    </>
  );
}