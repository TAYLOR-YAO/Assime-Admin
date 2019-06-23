import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, adminAuth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      adminAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  adminAuth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  adminAuth: state.adminAuth
});
export default connect(mapStateToProps)(PrivateRoute);