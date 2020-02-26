import axios from 'axios';
// import store from 'store';
let instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
});

instance.interceptors.request.use((config) => {
    window.console.log('请求开始');
    let token = sessionStorage.getItem('token');
    // Do something before request is sent
    config.headers.Authorization = token;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default instance;