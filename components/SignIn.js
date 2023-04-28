import Image from 'next/image';
import styles from '../styles/SignIn.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout} from '../reducers/user'
import Link from 'next/link';
import { useRouter } from 'next/router'


function SignInModal() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);


    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

    const router = useRouter()

    const handleSignIn = () => {
        console.log('Click connect')
        fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
                    console.log(data)
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/home')				
				}
			});
    }


    return (
        <div className={styles.modalSignIn}>
            <div className={styles.logoP}>
                <div className={styles.logomodalSignIn}>
                    <Image src="/logo.png" alt="Logo" width={200} height={200} />
                </div>
                <p className={styles.p}>Connect to Hackatweet</p>
            </div>
                <div className={styles.registerSection}>
                    {/* onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}  */}
					<input className={styles.signInInput}type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername}/>
                    <input className={styles.signInInput}type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}/>
					<button className={styles.signInButton} id="register" onClick={() => handleSignIn()}>Sign Up</button>
				</div>
        </div>
    )
}

export default SignInModal;