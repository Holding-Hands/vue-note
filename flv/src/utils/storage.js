const getStorage = (key) => {
    const user = JSON.parse(sessionStorage.getItem('userInfo')) || {};
    const name = user.userName;
    const storage = JSON.parse(localStorage.getItem(name) || '{}');
    return storage[key];
};

const setStorage = (key, val) => {
    const user = JSON.parse(sessionStorage.getItem('userInfo')) || {};
    const name = user.userName;
    const storage = JSON.parse(localStorage.getItem(name) || '{}');

    storage[key] = val;
    localStorage.setItem(name, JSON.stringify(storage));
};

const deleteStorage = (key) => {
    const user = JSON.parse(sessionStorage.getItem('userInfo')) || {};
    const name = user.userName;
    const storage = JSON.parse(localStorage.getItem(name) || '{}');
    Reflect.deleteProperty(storage, key);

    localStorage.setItem(name, JSON.stringify(storage));
};

export {
    getStorage,
    setStorage,
    deleteStorage,
};
