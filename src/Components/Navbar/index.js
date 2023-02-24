import React from 'react'
import {HiMenuAlt4,HiX} from 'react-icons/hi'
import {motion} from 'framer-motion'
import { useState } from 'react'
import safe from '../assets/safe.png' 
import './style.scss'


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
  return (
    <nav className='app__navbar' >
        <div className='app__navbar-logo'>
            {/* <img src={images.logoFiverr2} /> */}
            {/* <div className='app__navSafe'>
                <img  src={safe} alt='weSafe' />
            </div> */}
            <h2><a href='#' style={{textDecoration:'none',color:'black'}} > PartnersPortal</a></h2>
        </div>
        <ul className='app__navbar-links'>
            {
                ['home','user','signup','login'].map((item)=> (
                    <li className='app__flex p-text' key={`/${item}`} >
                        <div></div>
                        <a href={`/${item}`}>{item}</a>
                    </li>
                ) )
            }
        </ul>
            <div className='app__navbar-menu'>
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
                                ['home','user','signup','login'].map((item)=> (
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
}

export default Navbar