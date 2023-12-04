import { loginUserAPI } from "../api/auth";

// actions/authActions.js
export const registerUserRequest = (userData) => ({
  type: "REGISTER_USER_REQUEST",
  payload: userData,
});

export const registerUserSuccess = (user) => ({
  type: "REGISTER_USER_SUCCESS",
  payload: user,
});

export const registerUserFailure = (error) => ({
  type: "REGISTER_USER_FAILURE",
  payload: error,
});


export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      // Perform login logic and retrieve user and userData
      const { user, userData } = await loginUserAPI(email, password);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, userData },
      });

      return { user, userData };
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      });

      throw error;
    }
  };
};
