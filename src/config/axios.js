import axios from 'axios';

const clientAxions = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API + 'api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default clientAxions;
