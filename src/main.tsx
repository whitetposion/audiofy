import React from 'react'
import ReactDOM from 'react-dom/client'
import { SettingContext } from '@/context/settingsContext.jsx';

import App from './App.jsx';
import './index.css';
import './styles.scss'

{/* Setting context api to provider for all the component
    to have access of fuctions and state */}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingContext>
        <App />
    </SettingContext>
  </React.StrictMode>,
)
