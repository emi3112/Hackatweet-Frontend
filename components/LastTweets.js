import { useState } from "react";
import { Tweet } from "./Tweet";

const DEFAULT_TWEET = [
  { id: 0, name: "nomab", content: "trop cool", like: 8 },
  { id: 1, name: "nomaba", content: "pas cool", like: 0 },
  { id: 2, name: "pifou", content: "top cool", like: 70 },
  { id: 3, name: "toto", content: "Bof & cool", like: 30 },
];




function LastTweets() {
    let [tweets, setTweets] = useState(DEFAULT_TWEET);
  
    const onDelete = (tweetId) => {
      setTweets((e)=>e.filter((tweet)=>tweet.id !== tweetId))
    }
  
    return (
      <div style={{ border: "1px solid red" }}>
        <p>Je suis un composant </p>
        <div className="tweet-container">
          {tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                id={tweet.id}
                name={tweet.name}
                content={tweet.content}
                like={tweet.like}
                onDelete={(id) =>{onDelete(id)}}
              />
            );
          })}
        </div>
      </div>
    );
  }
  export default LastTweets;
  