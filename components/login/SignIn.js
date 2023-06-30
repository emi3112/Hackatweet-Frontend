import Image from 'next/image';
import styles from '../../styles/SignIn.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout} from '../../reducers/user'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { useRef, createRef } from 'react';
import { Input } from 'antd';


function SignInModal() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        setIsValidate(true)
    }, []);    

    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
    const [isValidate, setIsValidate] = useState(true)

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
                    console.log('user from fetch', data.user.firstname)
					dispatch(login({ username: signInUsername, token: data.user.token, firstname: data.user.firstname }));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/home')				
				} else {
                    setIsValidate(false)
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
                    <Input className={styles.signInInput} placeholder="Username" type='text' onChange={(e) => (setSignInUsername(e.target.value))} value={signInUsername}/>
                    <Input.Password className={styles.signInInput} placeholder="Password" type="password"  onChange={(e) => (setSignInPassword(e.target.value))} value={signInPassword}/>
                    {!isValidate && <p className={styles.wrongUser}>User already exist or missing informations</p>}
					<button className={styles.signInButton} id="register" onClick={() => handleSignIn()}>Sign Up</button>
				</div>
        </div>
    )
}

export default SignInModal;