import {combineReducers} from 'redux';

const INITIAL_STATE = {
  user: '',
};

const MainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'user':
      return {...state, user: action.payload};

    default:
      return state;
  }
};

export default combineReducers({MainReducer});
