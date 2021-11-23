import React from 'react';
import './style.css';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

const initialState = 'IDLE';
const promiseReducer = (state, action) => {
  const type = action.type;
  const payload = action.payload;
  switch (type) {
    case 'NEXT': {
      switch (state) {
        case 'IDLE':
          return 'PENDING';
        case 'PENDING': {
          switch (payload) {
            case 'RESOLVE':
              return 'RESOLVED';
            case 'REJECT':
              return 'REJECTED';
          }
        }
      }
    }
    default:
      return state;
  }
};
const store = createStore(promiseReducer, initialState);

const Promise = () => {
  const state = useSelector((state) => state);
  const data = null;

  const dispatch = useDispatch();
  const nextState = () => {
    if (state === 'IDLE') {
      return dispatch({ type: 'NEXT' });
    }
    return dispatch({ type: 'NEXT', payload: 'REJECT' });
  };
  return (
    <div onClick={nextState}>
      {'👉'} {state}
    </div>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <Promise />
    </Provider>
  );
};
