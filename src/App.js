import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch} from 'react-router-dom';
import CheckOut from './containers/BurgerBuilder/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';

class App extends Component {
 

    render(){
      return (
        <div >
          <Layout>
            <Switch>
              <Route path='/checkout' component={CheckOut}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/' component={BurgerBuilder}/>
            </Switch>
          </Layout>
        </div>
      );
    }
}

export default App;
