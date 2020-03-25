import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const ordarSummary =(props)=>{

    const ingredientsSummary= Object.keys(props.ingredients).map(igKey=>{
    return(<li key ={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>
    :{props.ingredients[igKey]}
    </li>);
    })

    return(
        <Auxiliary>
            <h3> Your Order  </h3>
            <p>A delecious burger with the following ingredients : </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total Price : {props.totalPrice.toFixed(2)}</p>
            <p>Continue to CHECKOUT ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}> CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxiliary>
    );


}

export default ordarSummary;