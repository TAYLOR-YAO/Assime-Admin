import React, { Component } from 'react';
import Router from "./components/Router/Router";
import Navbar from "./components/Pages/Navbar";
import SideDrawer from "./components/Pages/Navbar/SideDrawer";
import BackDrop from "./components/Pages/Navbar/BackDrop";
import Footer from "./components/Pages/Footer";

class App extends Component {
  state={
    isSignedIn:false,
    sideDrawerOpen:false
  }

  drawerTogglerHandler = ()=>{
    this.setState((previosState)=>{
      return {sideDrawerOpen: !previosState.sideDrawerOpen};
    })
   
   }
   
  backDropHandler = ()=>{
    this.setState({sideDrawerOpen:false})
  }

  render() {
    let backDrop;
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backDropHandler}/>;
    } 
    return (
      <div className="App">
        <Navbar drawerClickHandler={this.drawerTogglerHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backDrop}
        <Router/>
        <Footer/>
    </div>
    );
  }
}

export default App;
