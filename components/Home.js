import styles from '../styles/Home.module.css';
import Login from './Login';

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <Login/>
      </main>
    </div>
  );
}

export default Home;
