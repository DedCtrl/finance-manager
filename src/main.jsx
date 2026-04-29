import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
const basename = import.meta.env.PROD ? "/finance-manager" : "";
createRoot(document.getElementById('root')).render(

    <HashRouter basename={basename}>
      <App />
    </HashRouter>

)
