import Image from 'next/image';
import styles from '../../styles/SignUp.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout} from '../../reducers/user'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from 'antd';


function SignUpModal() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);
    console.log('STATE ====>', user)

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
    const [isValidate, setIsValidate] = useState(true)

    const router = useRouter()

    
    const handleSignUp = () => {
        console.log('Click connect')
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log(data)
                dispatch(login({ username: signUpUsername, token: data.user.token, firstname: data.user.firstname }));
                setSignUpFirstname('')
                setSignUpUsername('');
                setSignUpPassword('');
                
                setIsValidate(true)
                router.push('/home')				
            } else {
                setIsValidate(!isValidate)
                setSignUpFirstname('')
                setSignUpUsername('');
                setSignUpPassword('');
                }
			});
    }

    return (
        <div className={styles.modalSignUp}>
            <div className={styles.logoP}>
                <div className={styles.logomodalSignUp}>
                    <Image src="/logo.png" alt="Logo" width={200} height={200} />
                </div>
                <p className={styles.p}>Create your Hackatweet account</p>
            </div>
                <div className={styles.registerSection}>
					<Input className={styles.signUpInput} type="text" placeholder="Firstame" id="signUpFirstame" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname}/>
					<Input className={styles.signUpInput} type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}/>
                    <Input.Password className={styles.signUpInput} type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}/>
                    {!isValidate && <p className={styles.wrongUser}>User already exist or missing informations</p>}
					<button className={styles.signUpButton}  href="/home" onClick={() => handleSignUp()}>Sign Up</button>
				</div>
        </div>
    )
}

export default SignUpModal;