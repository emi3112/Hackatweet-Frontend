import Image from 'next/image';
import styles from '../styles/SignUp.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout} from '../reducers/user'


function SignUpModal() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);
    console.log('STATE ====>', user)

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');


    const handleSignUp = () => {
        console.log('Click connect')
        fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
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
					<input className={styles.signUpInput} type="text" placeholder="Firstame" id="signUpFirstame" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname}/>
					<input className={styles.signUpInput} type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}/>
                    <input className={styles.signUpInput} type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}/>
					<button className={styles.signUpButton} id="register" onClick={() => handleSignUp()}>Sign Up</button>
				</div>
        </div>
    )
}

export default SignUpModal;