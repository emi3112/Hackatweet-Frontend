import React from "react";
import '../styles/Home.module.css';
import styles from '../styles/Home.module.css'
<<<<<<< HEAD
import LastTweets from '../components/LastTweets'
=======
import Tweet from '../components/Tweet';
import Image from 'next/image';
import { logout } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { Input } from 'antd';
const { TextArea } = Input;
>>>>>>> 2156d5aa83a8349c54a29bfefc116a4e4d655612


function Home() {

  const user = useSelector((state) => state.user.value)
  console.log('USER DATA ==>', user)

  let username = null
  let firstname = null

  if(user.token && user.username) {
    firstname = user.token.firstname
    username = `@${user.username}` 
  }

  const dispatch = useDispatch()

  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')				
  }

  

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
          <button className={styles.logoutButton} onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>
    </div>
    <div className={styles.tweetContainer}>
<<<<<<< HEAD
    <h1>tweetContainer!</h1>
    <LastTweets/>
    
=======
      <h2 className={styles.titles}>Home</h2>
      <div className={styles.postTweet}>
        {/* Création tweets BUTTON = TWeet / 280 caractère max / ecriture What's up  */}
        <TextArea showCount maxLength={100} />
      </div>
        <button className={styles.tweetButton}>Tweet</button>
      {/* <Tweet /> */}
>>>>>>> 2156d5aa83a8349c54a29bfefc116a4e4d655612
    </div>
    <div className={styles.trendContainer}>
    <h2 className={styles.titles}>Trends</h2>
      {/*trend*/}
    </div>
  </div>
   )
};

export default Home;
