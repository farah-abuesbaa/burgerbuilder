import React ,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE={
    bacon:0.3,
    salad:0.7,
    cheese:0.3,
    meat:0.7
};
class BurgerBuilder extends Component{

    state={
        ingredients:{
            bacon:0,
            salad:0,
            cheese:0,
            meat:0
        },
        totalPrice:3,
        purchasable:false,
        purchasing: false
    }

    updatePurchase(ingredients){
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum+el;
        },0);

        this.setState({purchasable: sum>0});

    }

    addIngredientsHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+INGREDIENT_PRICE[type];
        this.setState({totalPrice:newPrice , ingredients:updatedIngredients});
        this.updatePurchase(updatedIngredients);
    }

    removeIngredientsHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice- INGREDIENT_PRICE[type];
        this.setState({totalPrice:newPrice , ingredients:updatedIngredients});
        this.updatePurchase(updatedIngredients);
    }

    purchaseHandler=()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        alert('You continue');
    }


    render(){

        const disabledd={
            ...this.state.ingredients
        };
        for(let key in disabledd){
            disabledd[key]=disabledd[key]<=0
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientsHandler}
                removeIngredient={this.removeIngredientsHandler}
                disabled={disabledd}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice.toFixed(2)}
                purchasable={this.state.purchasable}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;