import React from "react";
import styles from '../../styles/Messages.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  UserOutlined,
  MessageOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logout } from "../../reducers/user";
import { useDispatch, useSelector } from 'react-redux';

function Messages() {

    const dispatch = useDispatch()
    const router = useRouter()
  
  // HANDLE USER DATA
    const user = useSelector((state) => state.user.value)
  
    console.log('user connected ==>',user)
    let username = null
    let firstname = null
    let usernameDb = null
    
    if(user.token && user.username) {
      firstname = user.firstname
      username = `@${user.username}` 
      usernameDb = user.username
    }

    // HANDLE MENU
    function getItem(label, key, icon, children, type) {
        return {
        key,
        icon,
        children,
        label,
        type,
        };
    }
        
    // handle onClick sur chaques items pour nouvelle page 
    const items = [
        getItem('Acceuil', '1', <HomeOutlined  />),
        getItem('Messages', '2', <MessageOutlined  />),
        getItem('Profil', '3', <UserOutlined  />),
    ];


    // handle change page onClick
    const handleChangePage = (e) => {
    console.log('click !!', e.key)
    if(e.key === '1') {
      router.push('/home')
    } else if(e.key === '2') {
      router.push('/messages')
    } else if(e.key === '3') {
      router.push('/profil')
    }
  }

    return (
        <div className={styles.pageContainer}>
        {/* MENU */}
        <div className={styles.menuContainer}>
            <div className={styles.logo}>
                <Image src="/logo.png" alt="Logo" width={200} height={200} />
            </div>
            <div className={styles.menuModalContainer}>
                <div
                    style={{
                    width: 300,
                    }}
                >
                    <Menu
                    onClick={(e) => handleChangePage(e)}
                    mode="inline"
                    theme="dark"
                    items={items}
                    style={{
                        borderRadius: 15,
                        backgroundColor: '#273746',
                    }}
                    />
                </div>
            </div>
            <div className={styles.infosContainer}>
                <div className={styles.logoInfos}>
                <div className={styles.userLogo}>
                    <Image src="/user.png" alt="LogoUser" width={70} height={70} />
                </div>
                <div className={styles.userInfos}>
                    <span className={styles.p}>{firstname}</span>
                    <span className={styles.p1}>{username}</span>
                </div>
                </div>
                <div className={styles.button}>
                <button onClick={() => handleLogout()} className={styles.logoutButton}>Logout</button>
                </div>
            </div>
        </div>
        {/* MESSAGES */}
        <div className={styles.messagesContainer}>

        </div>
        {/* CONVERSATION */}
        <div className={styles.conversationContainer}>

        </div>
    </div>
    )
}

export default Messages;