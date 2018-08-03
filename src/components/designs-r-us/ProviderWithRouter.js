// https://medium.com/@stipjey/react-router-v4-navigating-from-redux-saga-159c8069902

import React from 'react'
import { Provider } from 'react-redux'
import { withRouter } from 'react-router-dom'
import configureStore from './configureStore';

class ProviderWithRouter extends React.Component {
  constructor(props) {
    super(props);
    console.log('PROPS', props);
    this.store = configureStore({}, {
      routerHistory: props.history,
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default withRouter(ProviderWithRouter);