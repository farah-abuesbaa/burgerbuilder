import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls=[
    {label: 'Bacon :' , type :'bacon'},
    {label: 'Salad :' , type :'salad'},
    {label: 'Cheese :' , type :'cheese'},
    {label: 'Meat :' , type :'meat'},
]

const buildControls=(props)=>(
    
    <div className={classes.BuildControls}>
        <strong><p style={{color:'rgb(49, 90, 41)'}}>Total Price : {props.price}</p></strong>
        {controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added={()=>props.addIngredient(ctrl.type)}
                removed={()=>props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
         ))}

        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >Order Now</button>
    </div>
);
export default buildControls;