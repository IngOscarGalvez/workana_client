import clientAxions from './axios';

const tokenAuth = token => {    
    if (token) {
        clientAxions.defaults.headers.common['Authorization'] = `bearer ${token}`;
    } else {
        delete clientAxions.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;

