import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../../components/UI/Button/Button';
import axios from '../../../../axios-order';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state={
        name:'',
        email:'',
        adress:{
            street:'',
            postalCode:''
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading: true});
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:"farah abuesbaa",
                email:"farahabuesbaa33@gmail.com"
            },
            deliveryMethod:"fastest"
        };
        axios.post('/order.json' , order).
        then(response =>{
            this.setState({loading: false });
            this.props.history.push('/');
        }).
        catch(error=>console.log(this.setState({loading: false })
        ));
    }
    
    render(){
        let form=(<form>
                    <input className={classes.Input} type="text" name="name" placeholder="your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
        if(this.state.loading){
            form=(<Spinner/>);
        }
        return(
            <div className={classes.ContactData} >
                <h4 style={{color:'#7f3608'}}>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;