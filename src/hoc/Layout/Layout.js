import React,{Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state={
        showSideDrawer :false
    }

    SideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    drawerToggleClicked=()=>{
        this.setState((prevState)=>{
            return{showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){
        return(
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.drawerToggleClicked}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    
    }
}

export default Layout;