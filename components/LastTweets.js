import React from "react";
import styles from "../styles/Tweet.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeLikeStore } from '../reducers/tweets'
import moment from "moment";
import { removeHastag } from "../reducers/hashtags";



function LastTweets(props) {

  const dispatch = useDispatch()

  // handle le delete hashtags avec le fetch delete !!!!!!!!!!!!!
  const hashtagsRegex = /#[a-z0-9_]+/

  const handleHashtag = (newhashtag) => {
    const test = hashtagsRegex.test(newhashtag)
    if(test) {
      const result = newhashtag.match(hashtagsRegex)
        // return juste le hashatg du text 
        return result[0]
    }
  }

  // delete dans db et dans dom quand click on trash 
  const handleDelete = (tweet) => {
    const text = tweet.text
    // if true delete dans la db hashtags 
    if(handleHashtag(text)) {
      const hashtag = handleHashtag(text)
      console.log('hashtag before fetch ==> ',hashtag)
      console.log('CLICKK DELETE HASHTAG TWEET')
      fetch(`http://localhost:3000/tweets/delete`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text})
      }).then(response => response.json())
      .then(data => {
        if(data.result) {
          // suprrime le tweet du reducer
          dispatch(removeLikeStore(tweet))
          // fetch pour suprrimer le hashtag de la db
          fetch(`http://localhost:3000/hashtags/delete`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: hashtag})
          }).then(response => response.json())
          .then(data => {
            
          })
        }
      })
    } else {
      console.log('CLICKK DELETE NORMAL TWEET')
      fetch(`http://localhost:3000/tweets/delete`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text})
      }).then(response => response.json())
      .then(data => {
        if(data.result) {
          dispatch(removeLikeStore(tweet))
        }
      })
    }
  }

  // gestion date 
  const date = moment(props.date).format('DD/MM/YYYY')


  return (
    <div className={styles.tweet}>
        <div className={styles.logoInfos}>
          <div className={styles.userLogo}>
            <Image src="/user.png" alt="LogoUser" width={70} height={70} />
          </div>
          <div className={styles.userInfos}>
            <span className={styles.p}>{props.firstname}</span>
            <span className={styles.p1}>{props.username}</span>
            <span className={styles.p2}>{date}</span>
          </div>
        </div>
        <div className={styles.paragraphe}>
          <p className={styles.p3}>{props.text}</p>
        </div>
      <footer className={styles.footer_btn}>
        {/* onClick coeur en rouge et +1 au counter de likes */}
        <FontAwesomeIcon  icon={faHeart} className={styles.heart} style={{color: "#f7f7f8",}}/>
        <span className={styles.like}>{props.likes}</span>
        {/* onClick suppression de la props */}
        <FontAwesomeIcon icon={faTrash} className={styles.trash} style={{color: "#f7f7f8",}} onClick={() => handleDelete(props)}/>      
      </footer>
    </div>
  );
}
  export default LastTweets;
  