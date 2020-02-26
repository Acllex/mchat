import instance from "./axios";

function login(data){
    return instance.post('/index/login', data);
}
function seeUser() {
    return instance.get('/index/users');
}
export { login,seeUser };