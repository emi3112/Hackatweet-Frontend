import React from "react";
import styles from '../styles/Home.module.css'
import LastTweets from '../components/LastTweets'
import Tweet from '../components/Tweet';
import Image from 'next/image';
import { logout } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { Input } from 'antd';
const { TextArea } = Input;
import { useEffect, useState } from 'react';
import { addTweet, importTweet, removeLikeStore, deleteTweet } from "../reducers/tweets";
import Hashtag from "../components/Hashtag";
import { importHashtags, deleteHastags } from "../reducers/hashtags";


function Home() {
  
  const dispatch = useDispatch()
  const router = useRouter()

// HANDLE USER DATA
  const user = useSelector((state) => state.user.value)

  let username = null
  let firstname = null
  let usernameDb = null
  
  if(user.token && user.username) {
    firstname = user.token.firstname
    username = `@${user.username}` 
    usernameDb = user.username
  }
  
  // LOGOUT
  const handleLogout = () => {
    dispatch(deleteTweet())
    dispatch(deleteHastags())
    dispatch(logout())
    router.push('/')				
  }

  // fonction qui fetch les hashtags !!!!!!!!!!!!!!!! à mettre dans un ficher a part avec les autres fonction fetch
  const fetchHashtags = () => {
    fetch(`http://localhost:3000/hashtags/allHashtags`).then(response => response.json())
    .then(data => {
      if (data.result) {
        const hashtags = data.hashtags
        console.log('hashtags data from fetch ==>',hashtags)
        dispatch(importHashtags(hashtags))
      }
    });
  }

  // HANDLE POST TWEET 
  const [textTweet, setTextTweet] = useState('')
  const counter = `${textTweet.length}/280`

  // HANDLE HASHTAGS 
  // regex pour trouver les hashtags
  const hashtagsRegex = /#[a-z0-9_]+/

  // fonction qui trouve l'hashtag
  const handleHashtag = (newhashtag) => {
    const test = hashtagsRegex.test(newhashtag)
    if(test) {
      const result = newhashtag.match(hashtagsRegex)
        // return juste le hashatg du text 
        return result[0]
    }
  }

  // post new tweet in db 
  const handleTweet = () => {
    fetch('http://localhost:3000/tweets/newTweet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname: firstname, username: usernameDb, date: null, text: textTweet, likes: 0 }),
    }).then(response => response.json())
    .then(data => {
      if (data.result) {
        // traitement regex hashtag quand post tweet
        if(handleHashtag(data.tweet.text)) {
          // # isolé qui est post
          const name = handleHashtag(data.tweet.text)
          fetch('http://localhost:3000/hashtags/newHashtag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
          }).then(response => response.json())
          .then(data => {
            fetchHashtags()
          })
        }
      }
      // ajoute le tweet dans le reducer (a clean par la suite)
      dispatch(addTweet(data.tweet))
    })
    // met le text de l'input a vide après le post
    setTextTweet('')
  };
  
  // qaund init composant
  useEffect(() => {
    fetchHashtags()
  }, []);
  
  const allHashtags = useSelector((state) => state.hashtags.value)
  console.log('all hashtags from reducer ==> ', allHashtags)
  // composants hashtags sur allhashtags
  const hashatgs = allHashtags?.map((data, i) => {
      return <Hashtag key={i} {...data} />
  })
  

// HANDLE ALL TWEET
  const allTweets = useSelector((state) => state.tweets.value)

  useEffect(() => {
    fetch(`http://localhost:3000/tweets/allTweets/${usernameDb}`).then(response => response.json())
    .then(data => {
      if (data.result) {
        const allTweets = data.allTweets
        dispatch(importTweet(allTweets))
      }
    });
	}, []);

  // si my tweets with trash other no trash 
  const tweets = allTweets?.map((data, i) => {
    if(data.username === usernameDb) {
      return <LastTweets key={i} {...data}/>
    } else {
      return <Tweet key={i} {...data}/>
    }
  })

  
  

   return (
  <div className={styles.homeContainer}>
    <div className={styles.logoBarContainer}>
      <div className={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
      </div>
      <div className={styles.infosContainer}>
        <div className={styles.logoInfos}>
          <div className={styles.userLogo}>
            <Image src="/user.png" alt="LogoUser" width={70} height={70} />
          </div>
          <div className={styles.userInfos}>
            <span className={styles.p}>{firstname}</span>
            <span className={styles.p1}>{username}</span>
          </div>
        </div>
        <div className={styles.button}>
          <button onClick={() => handleLogout()} className={styles.logoutButton}>Logout</button>
        </div>
      </div>
    </div>
    <div className={styles.tweetContainer}>
      <h2 className={styles.titles}>Home</h2>
      <div className={styles.newTweet}>
      <div className={styles.postTweet}>
        <TextArea className={styles.text} placeholder="What's up ?" maxLength={280} onChange={(e) => setTextTweet(e.target.value)} value={textTweet}/>
      </div>
      <div className={styles.divButton}>
        <span className={styles.counter}>{counter}</span>
        <button className={styles.tweetButton} onClick={() => handleTweet()}>Tweet</button>
      </div>
      </div>
      <div className={styles.tweetsContainer}>
        {/* !!!!! gerer le respo,sive des tweet quand ils sont long */}
        {tweets}
      </div>
    </div>
    <div className={styles.trendContainer}>
    <h2 className={styles.titles}>Trends</h2>
      <div className={styles.hashatgsContainer}>
        {hashatgs}
      </div>
    </div>
  </div>
   )
};

export default Home;
