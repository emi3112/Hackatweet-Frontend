import Image from 'next/image';
import styles from '../../styles/SignIn.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout} from '../../reducers/user'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { useRef } from 'react';


function SignInModal() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        setIsValidate(true)
    }, []);    


    // const signInUsername = useRef(null)
    // const signInPassword = useRef(null)

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
                    console.log(data)
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
                    router.push('/home')				
				} else {
                    setIsValidate(false)
                }
			});
    }

    // input from MIU
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: '#A0AAB4',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
            color: 'white',
          '& fieldset': {
            borderColor: '#E0E3E7',
          },
          '&:hover fieldset': {
            borderColor: '#B2BAC2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
          },
        },
      });


    return (
        <div className={styles.modalSignIn}>
            <div className={styles.logoP}>
                <div className={styles.logomodalSignIn}>
                    <Image src="/logo.png" alt="Logo" width={200} height={200} />
                </div>
                <p className={styles.p}>Connect to Hackatweet</p>
            </div>
                <div className={styles.registerSection}>
                    {/* <CssTextField label="Username"  type='text' onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername}/>
                    <CssTextField label="Password" type="password" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}/> */}
					          <input className={styles.signInInput} required type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername}/> 
                    <input className={styles.signInInput} required type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}/>
                    {!isValidate && <p className={styles.wrongUser}>User already exist or missing informations</p>}
					<button className={styles.signInButton} id="register" onClick={() => handleSignIn()}>Sign Up</button>
				</div>
        </div>
    )
}

export default SignInModal;