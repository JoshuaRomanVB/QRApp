import { createContext, useContext, useReducer } from 'react'
import PanelQRCodeActions from '../actions/PanelQRCodeActions'

const ContextPanelQRCode = createContext(null)
const initialState = { text: 'QRCode', size: 100, color: 'black' }

function QRCodeProvider({ children }) {
    const panelQRCodeReducer = useReducer(PanelQRCodeActions, initialState)
    return (
        <ContextPanelQRCode.Provider value={panelQRCodeReducer}>
            {children}
        </ContextPanelQRCode.Provider>
    )
}

function useContextPanelQRCode() {
    const context = useContext(ContextPanelQRCode)
    return context
}

export { QRCodeProvider, useContextPanelQRCode }