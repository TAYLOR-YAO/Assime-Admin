import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../Utils/Actions";
import {IconButton, Menu, MenuItem} from "react-mdl"

class LogUserOut extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutAdmin();
  };
render() {
    const { admin } = this.props.adminAuth;
return (
      <div style={{position: 'relative'}}>
          <IconButton name="more_vert" id="demo-menu-lower-right" />
          <Menu target="demo-menu-lower-right" align="right">
              <MenuItem>Some Action</MenuItem>
              <MenuItem>Another Action</MenuItem>
              {admin.name ? <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem> : <MenuItem><a href="/login" style={{color:"#000"}}>login</a></MenuItem>}
          </Menu>
      </div>
    );
  }
}
LogUserOut.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  adminAuth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  adminAuth: state.adminAuth
});
export default connect(
  mapStateToProps,
  { logoutAdmin }
)(LogUserOut);
