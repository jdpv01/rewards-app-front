let data = localStorage['data'];
let auth = localStorage['auth'];

const setData = (data) => {
    localStorage['data'] = JSON.stringify(data);
    updateData(localStorage['data']);
}

const setAuth = (auth) => {
    localStorage['auth'] = JSON.stringify(auth);
    updateAuth(localStorage['auth']);
}

const updateAuth = (newAuth) => {
    auth = newAuth;
}

const updateData = (newData) => {
    data = newData;
}

export { data, setData, auth, setAuth }