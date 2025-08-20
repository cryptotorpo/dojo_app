import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import Theme from './theme'
import AppLayout from './router/Layout'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
          <Theme>
            <AppLayout />
          </Theme>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
