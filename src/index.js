import React from 'react';
import ReactDOM from 'react-dom';
import './base.scss';
import App from './containers/App/App';
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/index.js'
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'

const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(

  <Provider store={store}>
    <HashRouter basename={'/possessed-and-dressed'}>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
