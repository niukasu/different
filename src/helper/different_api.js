import axios from 'axios';

export default axios.create({
  baseURL: 'https://hiring-task-api.herokuapp.com/v1/leases'
});