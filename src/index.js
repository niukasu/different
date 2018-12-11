import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';
import LeaseList from './components/lease_list';
import LeaseIndex from './components/lease_index';

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/lease" exact component={LeaseIndex} />
        <Route path="/" exact component={LeaseList} />
      </div>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);

