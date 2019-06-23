import React from "react";
import "./SideDrawer.css";
import SideDrawerLogUserOut from "../LogUserOut/SideDrawerLogUserOut";


const SideDrawer = props =>{
    let drawerClass ="side-drawer";
    if(props.show){
        drawerClass = "side-drawer open";
    }
    return(
    <nav className={drawerClass} >
        <div><h2><a href="/dashboard">Assime-228</a></h2></div>
        <hr/>
        <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/storeregistration">Store Registration</a></li>
            <li><SideDrawerLogUserOut/></li>                     
        </ul>
    </nav>
    );
};
export default SideDrawer