import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.scss';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import { SharedPorvider } from './context/SharedContext';
// import { VideoProvider } from './context/VideoContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
          <SharedPorvider>
        {/*  <VideoProvider> */}
        <App />
        {/* </VideoProvider>*/}
        </SharedPorvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
