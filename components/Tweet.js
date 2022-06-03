import timeago from "lib/timeago";
import Link from "next/link";

export default function Tweet({ tweet }) {
  return (
    <>
      <div className="border rounded mb-2 w-2/4 p-4">
        <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
          <a>
            <h1>
              <span className="font-bold mr-2">
                <Link href={`/${tweet.author.name}`}>
                  <a>{ tweet.author.name }</a>
                </Link>
              </span>{ timeago.format(new Date(tweet.createdAt)) }
            </h1>
            <p>{ tweet.content }</p>
          </a>
        </Link>
      </div>
    </>
  );
}