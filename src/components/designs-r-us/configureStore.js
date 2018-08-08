// https://medium.com/@stipjey/react-router-v4-navigating-from-redux-saga-159c8069902
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import baseSaga from '../../sagas/baseSaga';
import baseReducer from '../../reducers/baseReducer';

export default (initialState, context = {}) => {
  const sagaMiddleware = createSagaMiddleware({
    context
  });

  const enhancers = [
    applyMiddleware(
      sagaMiddleware,
    )
  ];
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__)
  }

  const store = createStore(baseReducer, initialState, compose(...enhancers));
  sagaMiddleware.run(baseSaga);
  return store;
}