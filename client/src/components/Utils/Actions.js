import axios from "axios";
import setAdminAuthToken from "./setAdminAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  ADMIN_LOADING,
  SET_CURRENT_ADMIN
} from "../Config/types";
// Register Admin
export const registerAdmin = (userData, history) => dispatch => {
  axios
    .post("/api/admin/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginAdmin = userData => dispatch => {
  axios
    .post("/api/admin/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("admin_jwtToken", token);
      // Set token to Admin Auth header
      setAdminAuthToken(token);
      // Decode token to get Admin data
      const decoded = jwt_decode(token);
      // Set current Admin
      dispatch(setCurrentAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in Admin
export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};



// User loading
export const setAdminLoading = () => {
  return {
    type: ADMIN_LOADING
  };
};
// Log Admin out
export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("admin_jwtToken");
  // Remove Adminauth header for future requests
  setAdminAuthToken(false);
  // Set current Admin to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentAdmin({}));
};