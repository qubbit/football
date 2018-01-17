import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './styles/common.scss';
// import {URLS} from './assets';
import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
const body = document.body;
body.style.backgroundImage = `url(${URLS[1]})`;
body.style.backgroundAttachment = "fixed";
body.style.backgroundSize = "cover";
body.style.height = '100%';
*/

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

registerServiceWorker();
