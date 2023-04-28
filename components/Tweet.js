import React from "react";
import styles from "../styles/Tweet.module.css";

// import { } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function Tweet({ id, name, content, like, onDelete }) {
 
  
  const [count, setCount] = useState(0);

  let newLike = { name, id, like, content };
  const onLike = (newLike) => {
    dispatch(addLikeStore(newLike));
    console.log("like", name, id, like);
  };

  return (
    <div className="tweet">
      <h3>{name}</h3>
      <p>{content}</p>
      <footer className="footer_btn">
        <button className="Like" onClick={() => onLike()}>{like} count {count} 💛</button>
        <button className="delete" onClick={() => onDelete(id)}>
          🎚️
        </button>
      </footer>
    </div>
  );
}
