import different_api from '../helper/different_api'

export const fetchLeases = () => async dispatch => {
  const response = await different_api.get();
  dispatch({type: 'FETCH_LEASES', payload: response.data});
};

export const fetchLeaseId= id => async dispatch => {
  const response = await different_api.get(`/${encodeURIComponent(id)}`);
  dispatch({type: 'FETCH_LEASEID', payload: response.data});
};