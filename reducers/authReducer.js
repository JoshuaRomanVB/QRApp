// reducers/authReducer.js
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER_REQUEST":
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };

    case "REGISTER_USER_SUCCESS":
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, loading: false };

    case "REGISTER_USER_FAILURE":
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default authReducer;
