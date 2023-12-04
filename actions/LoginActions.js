const LoginActions = (state, action) => {
    switch (action.type) {
    case 'LOGIN':
        return {
            ...state,
            email: action.emailUser,
        };
    case 'LOGOUT':
        return {
            ...state,
            email: null,
        };
    default:
        return state;
    }
}

export default LoginActions;