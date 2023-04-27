import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import styles from '../styles/Login.module.css'
import {  Modal } from 'antd';
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'



function Login() {

    const [modalSignIn, setModalSignIn] = useState(false);


    // --------------------------------------------------------- Modal content avec SignUp -----------------------------------------------------------------
    const [modalSignUp, setModalSignUp] = useState(false);

    const handleModalSignUp = () => {
        setModalSignUp(true)
        console.log('Sign Up')
    }

    const handleModalSignIn = () => {
        setModalSignIn(true)
        console.log('Sign Up')
    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.partieGauche}>
                {/* Logo twitter */}
                <div className={styles.logoGaucghe}>
                    <Image src="/logo.png" alt="Logo" width={200} height={200} />
                </div>
            </div>
            <div className={styles.partieDroite}>
                <div className={styles.loginContainer}>
                    <div className={styles.titreContainer}>
                        <div className={styles.logoDroite}>
                            <Image src="/logo.png"  alt="Logo" width={200} height={200} />
                        </div>
                        <h1 className={styles.title}>See what's happening</h1>
                    </div> 
                    <div className={styles.connectionContainer}>
                        <h2 className={styles.h2}>Join Hackatweet today</h2>
                        {/* MODAL INPUT */}
                        <button className={styles.signUp} type="primary" onClick={() => handleModalSignUp()}>Sign up</button>
                        <Modal
                            centered
                            open={modalSignUp}
                            onCancel={() => setModalSignUp(false)}
                        >
                            <SignUp style={styles.signUpModal}/>
                        </Modal>
                        {/* Signup */}
                        <h3 className={styles.h3}>Already have an account ?</h3>
                        {/* MODAL INPUT */}
                        <button className={styles.signIn} type="primary" onClick={() => handleModalSignIn()}>Sign in</button>
                        <Modal
                            centered
                            open={modalSignIn}
                            onCancel={() => setModalSignIn(false)}
                        >
                            <SignIn/>
                        </Modal>
                        {/* Sign in */}                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
