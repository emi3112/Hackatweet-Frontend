import React from "react";
import '../styles/Home.module.css';
import styles from '../styles/Home.module.css'
import LastTweets from '../components/LastTweets'


const Home = () => {

  

   return (
  <div className={styles.container}>
    <div className={styles.logoBarContainer}>
    <h1>logoBarContainer!</h1>
      {/*log*/}
    </div>
    <div className={styles.tweetContainer}>
    <h1>tweetContainer!</h1>
    <LastTweets/>
    
    </div>
    <div className={styles.trendContainer}>
    <h1>trendContainer!</h1>
      {/*trend*/}
    </div>
  </div>
   )
};

export default Home;
