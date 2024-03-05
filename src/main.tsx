import React from 'react'
import ReactDOM from 'react-dom/client'
import { SettingContext } from '@/context/settingsContext.jsx';
import App from './App.jsx';
import './index.css';
import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingContext>
        <App />
    </SettingContext>
  </React.StrictMode>,
)
