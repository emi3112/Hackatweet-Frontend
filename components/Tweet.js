import styles from "../styles/Tweet.module.css";

// import { } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Tweet(props) {
  return (
    <div className={styles.dark}>
      <div className={styles.tweetHeader}>
        <h3>user@login - titletweet</h3>
      </div>
      <div>
        <p>Contenu tweet</p>
      </div>
      <div></div>
      <div>
        <footer>
          <FontAwesomeIcon 
          icon={faHeart} 
          className={styles.faHeartIcon}/>
          <FontAwesomeIcon
            icon={faTrashCan}
            className={styles.faTrashCanIcon}/>
        </footer>
      </div>
    </div>
  );
}

export default Tweet;
