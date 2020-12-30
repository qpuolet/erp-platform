import cookies from 'js-cookie';

export const getJWT = () => {
  return cookies.get('authToken');
};

export const setJWT = jwt => {
  return cookies.set('authToken', jwt);
};

export const deleteJWT = () => {
  return cookies.remove('authToken');
};
