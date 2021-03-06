import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

const checkOutSummmary=(props)=>{

    return(
        <div className={ classes.CheckOutSummary}>
            <h1 style={{color:'rgb(83, 139, 72)'}}>We hope it taste well ! </h1>
            <div style={{width :'100%' ,margin:'auto'}} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger"
                clicked={props.checkOutCancelled}>CANCEL</Button>
            <Button btnType="Success"
                 clicked={props.checkOutContinued}>CONTINUE</Button>
        </div>
    );

}

export default checkOutSummmary;