const saveSession = (key, item) => sessionStorage.setItem(key, JSON.stringify(item));

export default saveSession;
