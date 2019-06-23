import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../Utils/Actions";
import {IconButton, Menu, MenuItem} from "react-mdl"
class SideDrawerLogUserOut extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutAdmin();
  };
render() {
    const { admin } = this.props.adminAuth;
return (
        <div style={{position: 'absolute', color:"#fff" }}>
            <IconButton name="more_vert" id="demo-menu-lower-left" />
            <Menu target="demo-menu-lower-left" valign="bottom" ripple>
                <MenuItem>Some Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                {admin.name ? <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem> : <MenuItem><a href="/login" style={{color:"#000"}}>login</a></MenuItem>}
            </Menu>
        </div>


    );
  }
}
SideDrawerLogUserOut.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  adminAuth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  adminAuth: state.adminAuth
});
export default connect(
  mapStateToProps,
  { logoutAdmin }
)(SideDrawerLogUserOut);
