import React from "react";
import styles from '../../styles/Profil.module.css'
import moment from "moment";
// ANT
import {
    UserOutlined,
    MessageOutlined,
    HomeOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Space } from 'antd';
// MIU DESIGN
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
// PRIMEREACT
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
// import { Avatar } from 'primereact/avatar';
// photo profile
import imgBack from '../../public/profileBack.jpg';
import imgFront from '../../public/user.png'
// reducer
import { logout } from "../../reducers/user";
import { addImgBack, addImgFront, addPersonalInfos } from "../../reducers/user";
// COMPOSENTS
import MyTweet from "./MyTweets";
import LastTweets from "../home/LastTweets";
import Tweet from "../home/Tweet";


function Profil() {

    const dispatch = useDispatch()
    const router = useRouter()
  
  // HANDLE USER DATA
    const user = useSelector((state) => state.user.value)
  
    let username = null
    let firstname = null
    let usernameDb = null
    let bio = user.bio ? user.bio : 'Bio'
    let birth = user.birth ? user.birth : 'Date of Birth'
    let location = user.location ? user.location : 'Where are you born ?'
    
    if(user.token && user.username) {
      firstname = user.firstname
      username = `@${user.username}` 
      usernameDb = user.username
    }
    console.log('user reducer ==> ', user)
      // LOGOUT
    const handleLogout = () => {
        dispatch(deleteTweet())
        dispatch(deleteHastags())
        dispatch(logout())
        router.push('/')				
    }

    // handle menu -------------------- MENU ---------------------------------------------------------
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



// ----------------------------------------------------------------PROFILE PART-----------------------------------------------------------------
    
    // FETCHHHHH INFOS
    const inputImgBackRef = useRef(null)
    const [ imageBack, setImageBack ] = useState('')
    const inputImgFrontRef = useRef(null)
    const [ imageFront, setImageFront ] = useState('')

    const fetchPhotos = () => {
        fetch(`http://localhost:3000/users/getImage/${usernameDb}`).then(response => response.json())
        .then(data => {
            if(data.result) {
                console.log(data)
                // BACK
                dispatch(addImgBack(data.photoBack))
                // setImageBack(data.photoBack)
                // FRONT
                dispatch(addImgFront(data.photoFront))
                // setImageFront(data.photoFront)
            }
        })
    }

    // quand init composant
    useEffect(() => {
        fetchPhotos()
    }, [imageBack.length, imageFront.length]);
    const photoBack = useSelector((state) => state.user.value.imgBack)
    const photoFront = useSelector((state) => state.user.value.imgFront)

    // ----------------------------------------------- HANDLE IMAGE-------------------------------------------------
    //handle image upload ==> BACK
    
    const handleImageBackClick = () => {
        inputImgBackRef.current.click()
    }
    const handleChangeImgBack = (event) => {
        const file = event.target.files[0]
            setImageBack(file)    
    }
    
    //handle image upload ==> FRONT
    
    const handleImageFrontClick = () => {
        inputImgFrontRef.current.click()
    }

    const handleChangeImgFront = (event) => {
        const file = event.target.files[0]
            setImageFront(file)
    }

    // handle modal user informations
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleModalUser = () => {
        setOpen(true)
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        backgroundColor: '#17202A',
        borderRadius: 10,
        overflow: 'auto',
      };


    // USER VALUE
    const [ newFirstname, setNewFirstname ] = useState('')
    const [ newBio, setNewBio ] = useState('')
    const [ newBirth, setNewBirth ] = useState('')
    const [ newLocation, setNewLocation ] = useState('')
    const { TextArea } = Input;
    console.log('info modal user ==>', newFirstname, newBio, newBirth, newLocation)


    // SAVE INFO MODAL AND CLOSE
    const handleSaveModalUser = () => {
        setOpen(false)

        if(imageBack) {
            const formDataBack = new FormData();
    
            formDataBack.append('photoBack', imageBack );
        
             fetch(`http://localhost:3000/users/uploadBackImg/${usernameDb}`, {
              method: 'POST',
              body: formDataBack,
              }).then((response) => response.json())
              .then((data) => {
                dispatch(addImgBack(data.url))
              });
        }
        
        if(imageFront) {
            const formDataFront = new FormData();
    
            formDataFront.append('photoFront', imageFront );
    
            fetch(`http://localhost:3000/users/uploadFrontImg/${usernameDb}`, {
            method: 'POST',
            body: formDataFront,
            }).then((response) => response.json())
            .then((data) => {
                dispatch(addImgFront(data.url))
            });
        }

        if(newFirstname || newBio || newBirth || newLocation) {
            fetch(`http://localhost:3000/users/updateInfos/${usernameDb}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newFirstname, newBio, newBirth, newLocation }),
            }).then((response) => response.json())
            .then(data => {
                console.log('data after post user info ==>', data)
                dispatch(addPersonalInfos({bio: data.userUdapte.bio, location: data.userUdapte.location,
                firstname: data.userUdapte.firstname, birth: data.userUdapte.birth}))
                setNewBio('')
                setNewBirth('')
                setNewFirstname('')
                setNewLocation('')
            }) 
        }
    }


    // -----------------------------------------------------MY TWEETS---------------------------------------------------------------------
    const allTweets = useSelector((state) => state.tweets.value)

    const myTweets = allTweets?.map((data, i) => {
        // console.log('data from alltweets ==>',data)
        //  check si le tweet nous appartient
        if(data.username === usernameDb) {
          // si le username apparait en clé étrangère dans le tweet on met isLiked a true sinon false
          if(data.whoLiked.length) {
            const isLiked = data.whoLiked.some((e) => e.username === usernameDb)
            if(isLiked) {
              // récupère le isLiked en props 
              return <LastTweets key={i} {...data} isLiked={true}/>
            } 
            else {
              return <LastTweets key={i} {...data} isLiked={false}/>
            }
          } else {
            // si il n'y a pas de like renvoie quand même le tweet
            return <LastTweets key={i} {...data} isLiked={false}/>
          }
        }
    })

// -----------------------------------------------------MY LIKES---------------------------------------------------------------------

    const myLikes = allTweets?.map((data, i) => {
        if(data.username === usernameDb) {
            // si le username apparait en clé étrangère dans le tweet on met isLiked a true sinon false
            if(data.whoLiked.length) {
              const isLiked = data.whoLiked.some((e) => e.username === usernameDb)
              if(isLiked) {
                // récupère le isLiked en props 
                return <LastTweets key={i} {...data} isLiked={true}/>
              } 
            } 
          } else {
            if(data.whoLiked.length) {
              // pareil pour les tweet qui ne lui appartiennent pas 
              const isLiked = data.whoLiked.some((e) => e.username === usernameDb)
                if(isLiked) {
                  // récupère le isLiked en props 
                  return <Tweet key={i} {...data} isLiked={true} />
                } 
            } 
          }
    })


    return(
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
                            <Image src={photoFront} alt="LogoUser" width={70} height={70} style={{borderRadius: 50}}/>
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
            {/* PROFIL */}
            <div className={styles.profilContainer}>
            <div className={styles.headerProfilContainer}>
                <h2 className={styles.titleProfil}>Profil</h2>
            </div>
            <div className={styles.myProfil}>
                {/* photo profil */}
                <div className={styles.profilPhotoContainer}>
                    {/* mettre condition si le fetch est vide */}
                    {photoBack ? 
                    <Image src={photoBack} width={200} height={200}/> :
                    <Image src={imgBack} width={200} height={200}/>
                    }
                    {/* {imageBack ? 
                    } */}
                    <div className={styles.profilPhotoPage}>
                        {photoFront ? 
                        <Avatar src={photoFront} size={100} /> :
                        <Avatar src={imgFront} size={100} />
                        }
                    </div>
                    <div className={styles.buttonChangeProfil}>
                        <button onClick={() => handleModalUser()} className={styles.editedButton}>Editer le profil</button>
                    </div>
                </div>
            </div>
            <div>
                {/* MODAL EDITER PRPFIL */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalTitleButton}>
                            <h2 className={styles.modalTitle}>Editer le profil</h2>
                            <button onClick={() => handleSaveModalUser()} className={styles.editedButton}>Enregistrer</button>
                        </div>
                        <div className={styles.profilPhotoContainer}>
                        {imageBack ? 
                        <Image className={styles.imageProfileBack} src={URL.createObjectURL(imageBack)} width={200} height={200} onClick={handleImageBackClick}/> :
                        <Image className={styles.imageProfileBack} src={photoBack} width={200} height={200} onClick={handleImageBackClick}/>
                        }
                        <InputText type="file" ref={inputImgBackRef} style={{ display: 'none' }} onChange={handleChangeImgBack}/>
                            <div className={styles.profilPhoto}>
                            {imageFront ? 
                            <Avatar src={URL.createObjectURL(imageFront)} size={130} onClick={handleImageFrontClick}/> :
                            <Avatar src={photoFront} size={130} onClick={handleImageFrontClick}/>
                            }
                            <InputText type="file" ref={inputImgFrontRef} style={{ display: 'none' }} onChange={handleChangeImgFront}/>                            
                            </div>
                        </div>
                        <div className={styles.inputModalInfo}>
                            <Input className={styles.inputinfo}  placeholder={firstname} value={newFirstname} onChange={(value) => (setNewFirstname(value.target.value))}/>
                            <TextArea className={styles.inputinfo} placeholder={bio} maxLength={200} value={newBio} onChange={(value) => (setNewBio(value.target.value))}/>
                            <Input className={styles.inputinfo} type="date" placeholder={birth} value={newBirth} onChange={(value) => (setNewBirth(value.target.value))}/>
                            <Input className={styles.inputinfo} type='location' placeholder={location} value={newLocation} onChange={(value) => (setNewLocation(value.target.value))}/>
                        </div>
                    </div>
                </Box>
            </Modal>
            </div>
            <div className={styles.userInfoContainer}>
                    <h2 className={styles.name}>{firstname}</h2>
                    <h3 className={styles.username}>{username}</h3>
                    {/* dinamiser les informations dessous */}
                    <div>
                        <h4 className={styles.h4}>{bio}</h4>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.useInfoIcons} />
                        <span className={styles.span}>{location}</span>
                        <FontAwesomeIcon  icon={faCakeCandles} className={styles.useInfoIcons} />
                        <span className={styles.span}> né le {moment(birth).format('LL')}</span>
                    </div>
            </div>
            {/* MY TWEETS => fetch get my tweets avec populates */}
            <div className={styles.tweetsContainer}>
                {myTweets}
            </div>
            </div>
            {/* LIKED */}
            <div className={styles.likedContainer}>
            <div className={styles.headerProfilContainer}>
                <h2 className={styles.titleProfil}>Likes</h2>
            </div>
            <div className={styles.tweetsContainer}>
                {myLikes}
            </div>
            {/* MES LIKES => fetch get my likes avec populates */}
            </div>
        </div>
    )
}

export default Profil;