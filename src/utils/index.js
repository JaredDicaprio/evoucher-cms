export const getToken = () => {
  try {
    const tkn = window.localStorage.getItem('auth_token');
    return tkn;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setToken = (label = 'auth_token', value) => {
  try {
    window.localStorage.setItem(label, value);
  } catch (err) {
    console.error(err);
  }
};

export * from './actions';
