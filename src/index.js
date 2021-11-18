import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InstagramStreamer from './package/src/InstagramStreamer';

ReactDOM.render(
  <React.StrictMode>
    <InstagramStreamer accessToken="" />
  </React.StrictMode>,
  document.getElementById('root')
);
