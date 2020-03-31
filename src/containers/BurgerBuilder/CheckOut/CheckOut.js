import React, { Component } from 'react';
import CheckOutSummary from '../../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from '../../../containers/BurgerBuilder/CheckOut/ContactData/ContactData';
import { Route } from 'react-router-dom';

class CheckOut extends Component{

    state={
    ingredients :null,
    price:0
}

    componentWillMount(){
        const query= new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for( let param of query.entries()){
            if(param[0] === 'price'){
                price=param[1]
            }else{
            ingredients[param[0]]= +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    checkOutCancelledHandler=()=>{
        this.props.history.goBack();
        
    }
    checkOutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){

        return(
            <div>
                 <CheckOutSummary 
                 ingredients={this.state.ingredients}
                 checkOutCancelled={this.checkOutCancelledHandler}
                 checkOutContinued={this.checkOutContinuedHandler}/>

                 <Route path={this.props.match.path +'/contact-data'}  
                 render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>

        );
    }
}

export default CheckOut;