import React, { useEffect } from 'react'
import {HiMenuAlt4,HiX} from 'react-icons/hi'
import {motion} from 'framer-motion'
import { useState } from 'react'
import safe from '../assets/Footer.png' 
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie/cjs/Cookies';

import './style.scss'


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState(false)
    const navigate=useNavigate()
    const cookies=new Cookies()

    useEffect(() => {
        if(!cookies.get("token"))
            setLoggedInUser(false)
        else    
            setLoggedInUser(true)
    },[])

    const logOut=(e) => {
        e.preventDefault()
        cookies.remove("token",{path:"/"})
        cookies.remove("loggedInPartnerUser",{path:"/"})
        cookies.remove("type",{path:"/"})
        navigate("/login")
        window.location.reload()
    }

    return (
    loggedInUser?(
            <nav className='app__navbar' >
                <div className='app__navbar-logo'>
                    {/* <img src={images.logoFiverr2} /> */}
                    {/* <div className='app__navSafe'>
                        <img  src={safe} alt='weSafe' />
                    </div> */}
                    
                    <h2> <img src={safe} alt='weSafe' style={{height:'1.7rem'}} /> </h2>
                </div>
                <ul className='app__navbar-links'>
                    {
                        ['home','login'].map((item)=> (
                            <li className='app__flex p-text' key={`/${item}`} >
                                <div></div>
                                <a href={`/${item}`}>{item}</a>
                            </li>
                        ) )
                    }
                    <li className='app__flex p-text' key={`${loggedInUser}`}>
                        <div></div>
                        <a href="/#" onClick={logOut} >LogOut</a>
                    </li>
                </ul>
                    <div className='app__navbar-menu'  >
                        <HiMenuAlt4 onClick={() => setToggle(true)} />
                        {
                            toggle && (
                                <motion.div
                                    whileInView={{x:[300,0]}}
                                    transition={{duration:0.85,ease:'easeOut'}}

                                >
                                    <HiX onClick={() => setToggle(false)} />
                                    <ul>
                                    {
                                        ['home','login'].map((item)=> (
                                            <li key={item} >
                                                
                                                <a onClick={() => setToggle(false) } href={`/${item}`}>{item}</a>
                                            </li>
                                        ) )
                                    }
                                    <li className='app__flex p-text' key={`${loggedInUser}`}>
                                        <div></div>
                                        <a href="" onClick={logOut} >LogOut</a>
                                    </li>
                                    </ul>
                                </motion.div>
                            )
                        }
                    </div>
            </nav>
    ):(
            <nav className='app__navbar' >
            <div className='app__navbar-logo'>
                {/* <img src={images.logoFiverr2} /> */}
                {/* <div className='app__navSafe'>
                    <img  src={safe} alt='weSafe' />
                </div> */}
                
                <h2> <img src={safe} alt='weSafe' style={{height:'1.7rem'}} /> </h2>
            </div>
            <ul className='app__navbar-links'>
                {
                    ['home','login'].map((item)=> (
                        <li className='app__flex p-text' key={`/${item}`} >
                            <div></div>
                            <a href={`/${item}`}>{item}</a>
                        </li>
                    ) )
                }
            </ul>
                <div className='app__navbar-menu'  >
                    <HiMenuAlt4 onClick={() => setToggle(true)} />
                    {
                        toggle && (
                            <motion.div
                                whileInView={{x:[300,0]}}
                                transition={{duration:0.85,ease:'easeOut'}}

                            >
                                <HiX onClick={() => setToggle(false)} />
                                <ul>
                                {
                                    ['home','login'].map((item)=> (
                                        <li key={item} >
                                            
                                            <a onClick={() => setToggle(false) } href={`/${item}`}>{item}</a>
                                        </li>
                                    ) )
                                }
                                </ul>
                            </motion.div>
                        )
                    }
                </div>
        </nav>
    )
  )
}

export default Navbar