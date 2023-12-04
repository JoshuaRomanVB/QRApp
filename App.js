// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';  // Asegúrate de importar tu rootReducer correcto

import AppNavigator from './navigation/AppNavigator';
import { LoginProvider } from './providers/LoginProvider';
import { QRCodeProvider } from "./providers/QRCodeProvider";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <LoginProvider>  
          <QRCodeProvider>
            <AppNavigator />
          </QRCodeProvider>   
      </LoginProvider>
    </Provider>
  );
}
