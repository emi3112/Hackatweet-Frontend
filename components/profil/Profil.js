import React from "react";
import styles from '../../styles/Profil.module.css'
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
import { logout } from "../../reducers/user";
import { useDispatch, useSelector } from 'react-redux';
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




function Profil() {

    const dispatch = useDispatch()
    const router = useRouter()
  
  // HANDLE USER DATA
    const user = useSelector((state) => state.user.value)
  
    let username = null
    let firstname = null
    let usernameDb = null
    
    if(user.token && user.username) {
      firstname = user.token.firstname
      username = `@${user.username}` 
      usernameDb = user.username
    }

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

    // handle modal user informations
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
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
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: '#17202A',
        borderRadius: 10,
      };

      const CssTextField = styled(TextField)({
        '& label.Mui-root': {
        //   borderBottomColor: '#B2BAC2',
            color: 'white'
        },
      });

    //handle image upload ==> BACK
    const inputImgBackRef = useRef(null)
    const [ imageBack, setImageBack ] = useState('')
    
    const handleImageBackClick = () => {
        inputImgBackRef.current.click()
    }
    const handleChangeImgBack = (event) => {
        const file = event.target.files[0]
        console.log('file',file)
        setImageBack(file)    
    }
    console.log(imageBack)
    
    //handle image upload ==> FRONT
    const inputImgFrontRef = useRef(null)
    const [ imageFront, setImageFront ] = useState('')
    
    const handleImageFrontClick = (event) => {
        inputImgFrontRef.current.click()
    }

    const handleChangeImgFront = (event) => {
        const file = event.target.files[0]
        setImageFront(file)
    }


    const handleSaveModalUser = () => {
        setOpen(false)
        // post dans la db les nouvelles informations 
        // images (avec cloudinary)
        // infos modifiers du user ==> reutiliser la route post user (création compte) pour modifier son doc
    }

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
            {/* PROFIL */}
            <div className={styles.profilContainer}>
            <div className={styles.headerProfilContainer}>
                <h2 className={styles.titleProfil}>Profil</h2>
            </div>
            <div className={styles.myProfil}>
                {/* photo profil */}
                <div className={styles.profilPhotoContainer}>
                    {imageBack ? 
                    <Image src={URL.createObjectURL(imageBack)} width={200} height={200} onClick={handleImageBackClick}/> :
                    <Image src={imgBack} width={200} height={200} onClick={handleImageBackClick}/>
                    }
                    <InputText type="file" ref={inputImgBackRef} style={{ display: 'none' }} onChange={handleChangeImgBack}/>
                    <div className={styles.profilPhoto}>
                        {imageFront ? 
                        <Avatar src={URL.createObjectURL(imageFront)} size={130} onClick={handleImageFrontClick}/> :
                        <Avatar src={imgFront} size={130} onClick={handleImageFrontClick}/>
                        }
                        <InputText type="file" ref={inputImgFrontRef} style={{ display: 'none' }} onChange={handleChangeImgFront}/>
                    </div>
                    <div className={styles.buttonChangeProfil}>
                        <button onClick={() => handleModalUser()} className={styles.editedButton}>Editer le profil</button>
                    </div>
                </div>
            </div>
            <div>
                {/* MODAL EDITER PRPFIL */}
            {/* <Modal
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
                            <Image 
                            src={profileFinal.length ? profileFinal : imgBack} 
                            alt="Logo fond" 
                            width={200} 
                            height={200}
                            onClick={() => {
                                setImageCrop(true)
                            }}
                            />

                            <div className={styles.profilPhoto}>
                                <Image src="/user.png" alt="Logo" width={130} height={130}/>
                            </div>
                        </div>
                        <CssTextField label="Nom" variant="outlined" margin="dense"/>
                        <CssTextField label="Username" variant="outlined" margin="dense"/>
                        <CssTextField label="Bio" variant="outlined" margin="dense" multiline />
                    </div>
                </Box>
            </Modal> */}
            </div>
            <div className={styles.userInfoContainer}>
                    <h2 className={styles.name}>{firstname}</h2>
                    <h3 className={styles.username}>{username}</h3>
                    {/* dinamiser les informations dessous */}
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.useInfoIcons} />
                        <span className={styles.span}>Billom, France</span>
                        <FontAwesomeIcon  icon={faCakeCandles} className={styles.useInfoIcons} />
                        <span className={styles.span}> né le 31 Janvier 2002</span>
                    </div>
                    <h6 className={styles.numberTweets}>200 Tweets</h6>
            </div>
            {/* MY TWEETS => fetch get my tweets avec populates */}
            </div>
            {/* LIKED */}
            <div className={styles.likedContainer}>
            <div className={styles.headerProfilContainer}>
                <h2 className={styles.titleProfil}>Like</h2>
            </div>
            {/* MES LIKES => fetch get my likes avec populates */}
            </div>
        </div>
    )
}

export default Profil;