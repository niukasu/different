import { combineReducers } from 'redux';
import leaseReducer from './lease_reducer';
import leaseIdContentReducer from './lease_id_reducer';

export default combineReducers({
  leases: leaseReducer, 
  leaseIdContent: leaseIdContentReducer
});