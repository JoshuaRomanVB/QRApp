import { createContext, useContext, useReducer } from 'react'
import LoginActions from '../actions/LoginActions'

const ContextLogin = createContext(null)
const initialState = { email: null }

function LoginProvider({ children }) {
    const [state, dispatch] = useReducer(LoginActions, initialState)
    return (
        <ContextLogin.Provider value={{ state, dispatch }}>
            {children}
        </ContextLogin.Provider>
    )
}

function useContextLogin() {
    const context = useContext(ContextLogin)
    return context
}

export { LoginProvider, useContextLogin }