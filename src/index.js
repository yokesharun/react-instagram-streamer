import React from 'react';
import ReactDOM from 'react-dom';
import InstagramStreamer from './package/src/InstagramStreamer';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <h1 className="header">React Instagram Streamer</h1>
    <div className="container">
        <InstagramStreamer accessToken="IGQVJXcDMybmg5eTBiS2dpdjFyYkRMRENlREg0UzVTdjNaU01OSW9BX1Rzby10a3BST3RTbExBemtGcEhjWEVnS0xDQUQwa3NhdF9hbkdncXdVMXBZAMVFSWkRXUVNkYy1HdG9zMFE3VWVVNlJNMFlhZAwZDZD" />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
