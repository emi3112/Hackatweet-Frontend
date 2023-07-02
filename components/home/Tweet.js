import React from "react";
import styles from "../../styles/Tweet.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import { importTweet } from "../../reducers/tweets";
// GIPHY
import {
  Grid,
  Gif
} from "@giphy/react-components";

export function Tweet(props) {

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
  // gestion date avec moment 
  const date = moment(props.date).format('LLL')

  // fonction qui fetch les tweets !!!!!!!!!!!!!!!! à mettre dans un ficher a part avec les autres fonction fetch
  const fetchAllTweets = () => {
    fetch(`http://localhost:3000/tweets/allTweets/${usernameDb}`).then(response => response.json())
    .then(data => {
      if (data.result) {
        const allTweets = data.allTweets
        dispatch(importTweet(allTweets))
      }
    });
  }

  // handle likes
  let color = "#f7f7f8"
  if(props.isLiked) {
    color = 'red'
  } 

  const handleLikes = (props) => {
    console.log('CLICK Like props isLiked', props.isLiked)
    // mettre condition si le style du like est noir = like sinon dislike et fetch -1
    if(props.isLiked === false) {
      console.log('isLiked censé être false ==>', props.isLiked)
      fetch(`http://localhost:3000/tweets/newLike/${usernameDb}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text: props.text, date: props.date}),
      }).then(response => response.json())
      .then(data => {
        fetchAllTweets()
      })
    } else {
      console.log('isLiked censé être true ==>', props.isLiked)
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
  const hashtagsRegex = /#[a-z0-9_]+/

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

  // HANDLE PHOTO PROFILE OTHER USER
  const [ photoProfile, setPhotoProfile ] = useState('')
  const fetchPhotoOtherUser = () => {
    fetch(`http://localhost:3000/users/otherUserInfos/${props.username}`).then(response => response.json())
    .then(data => {
      if(data.result) {
        console.log(data.userInfos)
        setPhotoProfile(data.userInfos[0].photoProfileFront)
      }
    })
  }
  useEffect(() => {
    fetchPhotoOtherUser()
  }, []);

  return (
    <div className={styles.tweet}>
        <div className={styles.logoInfos}>
          <div className={styles.userLogo}>
            <Image src={photoProfile ? photoProfile : '/user.png'} alt="LogoUser" width={60} height={60} style={{borderRadius: 50}}/>
          </div>
          <div className={styles.userInfos}>
            <span className={styles.p}>{props.firstname}</span>
            <span className={styles.p1}>@{props.username}</span>
            <span className={styles.p2}>{date}</span>
          </div>
        </div>
        <div className={styles.paragraphe}>
          {text()}
          {props.gif && <Gif gif={props.gif} width={300}/>}
        </div>
        <footer className={styles.footer_btn}>
        <FontAwesomeIcon  icon={faHeart} className={styles.heart} color={color} onClick={() => handleLikes(props)}/>
        <span className={styles.like}>{props.likes}</span>
      </footer> 
    </div>
    
  );
}

export default Tweet;