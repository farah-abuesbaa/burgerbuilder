import React ,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';





const INGREDIENT_PRICE={
    bacon:0.3,
    salad:0.7,
    cheese:0.3,
    meat:0.7
};
class BurgerBuilder extends Component{

    state={
        ingredients:null,
        totalPrice:3,
        purchasable:false,
        purchasing: false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://burger-builder-b7899.firebaseio.com/ingredients.json').then(
            response=>{
                this.setState({ingredients:response.data});
            }
        ).catch(error=>
            this.setState({error :true}));
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
        // alert('You continue');
       

        const queryParam=[];
        for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) +'=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push('price=' +this.state.totalPrice);
        const queryString=queryParam.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });
    }


    render(){

        const disabledd={
            ...this.state.ingredients
        };
        for(let key in disabledd){
            disabledd[key]=disabledd[key]<=0
        }
        let orderSummary=null;
        
       

         
        let burger= this.state.error? <p> ingredients can't be loaded </p>: <Spinner/>
        if(this.state.ingredients){
            burger=(
                <Auxiliary>
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
            orderSummary= <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
             />;
        }
        
        if(this.state.loading){
            orderSummary=<Spinner/>;
         }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);