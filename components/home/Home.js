import React from "react";
import styles from '../../styles/Home.module.css'
import LastTweets from './LastTweets'
import Tweet from "./Tweet";
import Image from 'next/image';
import { logout } from "../../reducers/user";
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
const { TextArea } = Input;
import { useEffect, useState } from 'react';
import { addTweet, importTweet, deleteTweet } from "../../reducers/tweets";
import Hashtag from "./Hashtag";
import { importHashtags, deleteHastags } from "../../reducers/hashtags";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  UserOutlined,
  MessageOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';


function Home() {
  
  const dispatch = useDispatch()
  const router = useRouter()
// ---------------------------------------------------------------- MENU CONTAINER ------------------------------------------------------------
// HANDLE USER DATA
  const user = useSelector((state) => state.user.value)

  console.log('user connected ==>',user)
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

  // MENU 
  function getItem(label, key, icon, domEvent) {
    return {
      label,
      key,
      icon,
      domEvent
    };
  }
    
  // handle onClick sur chaques items pour nouvelle page 
  const items = [
    getItem('Acceuil', '1', <HomeOutlined/> ),
    getItem('Messages', '2', <MessageOutlined /> ),
    getItem('Profil', '3', <UserOutlined /> ),
  ];
  
  
  // handle change page onClick
  const handleChangePage = (e) => {
    console.log('click !!', e.key)
    if(e.key === '1') {
      router.push('/home')
    } else if(e.key === '2') {
      router.push('/messages')
    } else if(e.key === '3') {
      router.push('/profil')
    }
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
  // fonction qui fetch les tweets !!!!!!!!!!!!!!!! à mettre dans un ficher a part avec les autres fonction fetch
  const fetchAllTweets = () => {
    fetch(`http://localhost:3000/tweets/allTweets/${usernameDb}`).then(response => response.json())
    .then(data => {
      if (data.result) {
        console.log('data fetch all tweets',data)
        const allTweets = data.allTweets
        dispatch(importTweet(allTweets))
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
  
  // HANDLE ALL TWEET
  useEffect(() => {
    fetchAllTweets()
  }, []);

  const allHashtags = useSelector((state) => state.hashtags.value)
  // composants hashtags sur allhashtags
  const hashatgs = allHashtags?.map((data, i) => {
      return <Hashtag key={i} {...data} />
  })
  
  const allTweets = useSelector((state) => state.tweets.value)
  console.log('alltweets after reducer ==>',allTweets)
  // si my tweets with trash other no trash 
  const tweets = allTweets?.map((data, i) => {
    console.log('data from alltweets ==>',data)
    //  check si le tweet nous appartient
    if(data.username === usernameDb) {
      // si le username apparait en clé étrangère dans le tweet on met isLiked a true sinon false
      if(data.whoLiked.length) {
        const isLiked = data.whoLiked.some((e) => e.username === usernameDb)
        if(isLiked) {
          // récupère le isLiked en props 
          return <LastTweets key={i} {...data} isLiked={true}/>
        } 
        else {
          return <LastTweets key={i} {...data} isLiked={false}/>
        }
      } else {
        // si il n'y a pas de like renvoie quand même le tweet
        return <LastTweets key={i} {...data} isLiked={false}/>
      }
    } else {
      if(data.whoLiked.length) {
        // pareil pour les tweet qui ne lui appartiennent pas 
        const isLiked = data.whoLiked.some((e) => e.username === usernameDb)
          if(isLiked) {
            // récupère le isLiked en props 
            return <Tweet key={i} {...data} isLiked={true} />
          } 
          else {
            return <Tweet key={i} {...data} isLiked={false}/>
          }
      } else {
        // si il n'y a pas de like renvoie quand même le tweet
        return <Tweet key={i} {...data} isLiked={false}/>
      }
    }
  })

  // handle modal post tweet
  const [ isShowModal, setIsShowModal ] = useState(true)

  const handleSwhoModalTweet = () => {
    setIsShowModal(!isShowModal)
  }

  const modalPostTweet = (
    <div className={styles.newTweet}>
      <div className={styles.postTweet}>
        <TextArea className={styles.text} placeholder="What's up ?" maxLength={280} onChange={(e) => setTextTweet(e.target.value)} value={textTweet}/>
      </div>
      <div className={styles.divButton}>
        <span className={styles.counter}>{counter}</span>
        <button className={styles.tweetButton} onClick={() => handleTweet()}>Tweet</button>
      </div>
    </div>)


   return (
  <div className={styles.pageContainer}>
    {/* MENU */}
    <div className={styles.menuContainer}>
      <div className={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
      </div>
      <div className={styles.menuModalContainer}>
        <div
            style={{
              width: 300,
            }}
          >
            <Menu
              onClick={(e) => handleChangePage(e)}
              mode="inline"
              theme="dark"
              items={items}
              style={{
                borderRadius: 15,
                backgroundColor: '#273746',
              }}
            />
        </div>
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
    {/* TWEETS -- HOME */}
    <div className={styles.tweetContainer}>
      <div className={styles.headerTweetContainer}>
        <h2 className={styles.titleHome}>Home</h2>
        <div className={styles.plusButtonTweet} onClick={() => handleSwhoModalTweet()}>
          { !isShowModal &&  <FontAwesomeIcon  icon={faPlus} className={styles.plusIcon} /> }
          { isShowModal &&  <FontAwesomeIcon  icon={faMinus} className={styles.plusIcon} />}
        </div>
      </div>
      {isShowModal && modalPostTweet}
      <div className={styles.tweetsContainer}>
        {/* !!!!! gerer le responsive des tweet quand ils sont long */}
        {tweets}
      </div>
    </div>
    {/* TREND */}
    <div className={styles.trendContainer}>
    <h2 className={styles.titleTrend}>Trends</h2>
      <div className={styles.hashatgsContainer}>
        {hashatgs}
      </div>
    </div>
  </div>
   )
};

export default Home;