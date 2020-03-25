import React from 'react';
import LogoImage from '../../assets/Logo/Logo.png';
import classes from './Logo.module.css';

const logo=(props)=>(
    <div className={classes.Logo} style={{height:props.height}} >
        <img src={LogoImage} alt="Burger"/>
    </div>
);

export default logo;