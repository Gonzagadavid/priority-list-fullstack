const getSession = (key) => JSON.parse(sessionStorage.getItem(key));

export default getSession;
