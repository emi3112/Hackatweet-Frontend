import React from "react";
import styles from "../../styles/Hashtags.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export function Hashtags(props) {
  
    return (
        <div className={styles.hashtags}>
            <div className={styles.hashtagInfos}>
                <span className={styles.p1}>{props.name}</span>
                <span className={styles.p2}>{props.number} Tweets</span>
            </div>
        </div>
    );
}
  
  export default Hashtags;