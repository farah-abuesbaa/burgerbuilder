import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../../components/UI/Button/Button';
import axios from '../../../../axios-order';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';

class ContactData extends Component{

    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required: true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value:'',
                    validation:{
                        required: true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required: true
                    },
                    valid:false,
                    touched:false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required: true,
                        minLength :'5',
                        maxLength:'5'
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required: true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[{value:'fastest' ,displayValue:'Fastest'},
                                 {value:'cheapest' ,displayValue:'Cheapest'} 
                    ]
                    },
                    value:'',
                    validation:{},
                    fromIsValid:true
                },
        },
        fromIsValid:false,
        loading: false
    }

    checkValidity(value , rules){
        let isValid=true;

        if(rules.required){
            isValid=value.trim()!==''&& isValid;
        }

        if(rules.minLength){
            isValid=value.length>= rules.minLength &&isValid;
        }
        if(rules.maxLength){
            isValid=value.length<= rules.maxLength &&isValid;
        }

        return isValid;
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading: true});
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
        };
        axios.post('/order.json' , order).
        then(response =>{
            this.setState({loading: false });
            this.props.history.push('/');
        }).
        catch(error=>console.log(this.setState({loading: false })
        ));
    }


    inputChangedHandler=(event , inputIdentifier)=>{

        const updatedOrderForm={
            ...this.state.orderForm
        };

        const updatedElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedElement.value= event.target.value;
        updatedElement.valid=this.checkValidity(updatedElement.value , updatedElement.validation);
        updatedElement.touched=true;
        updatedOrderForm[inputIdentifier]= updatedElement;
        console.log(updatedElement);

        let fromIsValid=true
        for( let inputIdentifier in updatedOrderForm){
            fromIsValid=updatedOrderForm[inputIdentifier].valid && fromIsValid;
        }


        this.setState({orderForm: updatedOrderForm , fromIsValid: fromIsValid});
    }
    
    render(){

        const formElementArray=[];
        for(let key in this.state.orderForm)
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });

        
        let form=(<form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement=>(
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event )=> this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                    ))}
                    <Button btnType="Success" 
                    disabled={!this.state.fromIsValid}>ORDER</Button>
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