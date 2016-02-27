import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import counter from './counter';
import library from './library';

const rootReducer = combineReducers({
  counter,
  library,
  routing
});

export default rootReducer;
