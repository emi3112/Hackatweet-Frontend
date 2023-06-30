import React from "react";
import styles from "../../styles/Tweet.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import { importMyTweets } from "../../reducers/user";


export function MyTweet(props) {

    const dispatch = useDispatch()

  // HANDLE USER DATA
  const user = useSelector((state) => state.user.value)

  let username = null
  let firstname = null
  let usernameDb = null
  
  if(user.token && user.username) {
    firstname = user.firstname
    username = `@${user.username}` 
    usernameDb = user.username
  }

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

  // fonction qui fetch les hashtags !!!!!!!!!!!!!!!! à mettre dans un ficher a part avec les autres fonction fetch
  const fetchHashtags = () => {
    fetch(`http://localhost:3000/hashtags/allHashtags`).then(response => response.json())
    .then(data => {
      if (data.result) {
        const hashtags = data.hashtags
        dispatch(importHashtags(hashtags))
      }
    });
  }
  // fonction qui fetch les tweets !!!!!!!!!!!!!!!! à mettre dans un ficher a part avec les autres fonction fetch
  const fetchAllTweets = () => {
    fetch(`http://localhost:3000/tweets/allTweets/${usernameDb}`).then(response => response.json())
    .then(data => {
      if (data.result) {
        const myTweets = data.myTweets
        dispatch(importMyTweets(myTweets))
      }
    });
  }

  //  géer les delete des clés étrangères dans le user quand delete tweet !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // delete dans db et dans dom quand click on trash 
  const handleDelete = (tweet) => {
    const text = tweet.text
    // if true delete dans la db hashtags 
    if(handleHashtag(text)) {
      const hashtag = handleHashtag(text)
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
            // fetch les hashtags et import reducer
            fetchHashtags()
          })
        }
      })
    } else {
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
  const date = moment(props.date).format('LLL')

  // handle likes
  let color = "#f7f7f8"
  if(props.isLiked) {
    color = 'red'
  } 

  const handleLikes = (props) => {
    // mettre condition si le style du like est noir = like sinon dislike et fetch -1
    if(props.isLiked === false) {
      fetch(`http://localhost:3000/tweets/newLike/${usernameDb}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text: props.text, date: props.date}),
      }).then(response => response.json())
      .then(data => {
        fetchAllTweets()
      })
    } else {
      fetch(`http://localhost:3000/tweets/dislike/${usernameDb}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text: props.text, date: props.date}),
      }).then(response => response.json())
      .then(data => {
        fetchAllTweets()
      })
    }
  }
// handle # en couleur
  const text = () => {
    let indexHashtag
    let text = props.text.split(' ')
    let hashtag 
    let debut
    let fin
    if(hashtagsRegex.test(props.text)) {
      hashtag = props.text.match(hashtagsRegex)[0]
      indexHashtag = text.indexOf(props.text.match(hashtagsRegex)[0])
      debut = text.slice(0, indexHashtag).join(' ')
      fin = text.slice(indexHashtag + 1).join(' ')
      return (
        <p className={styles.p3}>
          <span>{debut} </span>
          <b style={{color: '#0066CC'}}>{hashtag}</b>
          <span> {fin}</span>
        </p>
      )
    } else {
      return <p className={styles.p3}>{props.text}</p>
    }
  }

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
          {text()}
        </div>
      <footer className={styles.footer_btn}>
        <FontAwesomeIcon  icon={faHeart} className={styles.heart} color={color} onClick={() => handleLikes(props)}/>
        <span className={styles.like}>{props.likes}</span>
        <FontAwesomeIcon icon={faTrash} className={styles.trash} style={{color: "#f7f7f8",}} onClick={() => handleDelete(props)}/>      
      </footer>
    </div>
  );
}
  

export default MyTweet;