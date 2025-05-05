import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // ADD THIS
import store from './redux/store.js';       // ADD THIS
import './index.css';
import { App } from './app.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* <-- WRAP App inside Provider */}
      <App />
    </Provider>
  </StrictMode>
);
