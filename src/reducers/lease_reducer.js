export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_LEASES' :
      return action.payload;
    default :
      return state;
  }
}