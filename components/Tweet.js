import React from "react";
import styles from "../styles/Tweet.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
// import {RelativeTime} from '@primer/react'


export function Tweet(props) {
  // Onclick like 

  // gestion date avec moment 
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
        <FontAwesomeIcon  icon={faHeart} className={styles.heart} style={{color: "#f7f7f8",}}/>
        <span className={styles.like}>{props.likes}</span>
      </footer> 
    </div>
    
  );
}

export default Tweet;