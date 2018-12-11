export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_LEASEID' :
      return action.payload;
    default :
      return state;
  }
}