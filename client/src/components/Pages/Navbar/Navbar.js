import React, { Component } from "react";
import "./Navbar.css";
import ToggleDrawer from "./ToggleDrawer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutAdmin } from "../../Utils/Actions";
import LogUserOut from "../LogUserOut/LogUserOut";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
      const { admin } = this.props.adminAuth;
    return (
      <header className="toolBar">
        <nav className="toolBar-navigation">
          <div className="toolBar-logo"><a href="/">Assime-228</a></div>
          <div className="spacer"></div>
          <div className="toolBar-links">
            <ul>
              <li><a href="/dashboard">{ admin.name ?`You're loged in as admin, ${admin.name}`: " "}</a></li>
              <li><a href="/storeregistration">Store Registration</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
             <LogUserOut/>
            </ul>
          </div> 
          <div className="toolBar-toggle-button">
            <ToggleDrawer click={this.props.drawerClickHandler}/>
          </div>
        </nav>
      </header>
    )
  }
}

Navbar.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  adminAuth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  adminAuth: state.adminAuth
});

export default connect(
  mapStateToProps,
  { logoutAdmin }
)(Navbar);

