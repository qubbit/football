import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { URLS } from './assets';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
rootElement.style.backgroundImage = `url(${URLS[1]})`;
rootElement.style.backgroundAttachment = 'fixed';
rootElement.style.backgroundSize = 'cover';

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
