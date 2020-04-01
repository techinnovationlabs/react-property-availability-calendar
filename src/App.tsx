import React, { Component } from 'react';
import './App.css';

import { createStore, Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import propertyReducer from './redux/reducer/propertyReducer';
import Property from './components/Property/Property';

class App extends Component {

  store: Store = createStore(propertyReducer, applyMiddleware(ReduxThunk));

  render() {
    return (
      <Provider store={this.store}>
        <Property />
      </Provider>
    )
  }
}

export default App;