import users from '../api/users';
import history from '../history';
import routes from '../constants/routes/users';

export const FETCH_USER_LIST = 'FETCH_USER_LIST';
export const fetchUserList = () => async dispatch => {
    const response = await users.get('/');

    dispatch({ type: FETCH_USER_LIST, payload: response.data});
};

export const FETCH_USER = 'FETCH_USER' ;
export const fetchUser = id => async dispatch => {
    const response = await users.get(`/${id}`);

    dispatch({ type: FETCH_USER, payload: response.data });
};

export const CREATE_USER = 'CREATE_USER' ;
export const createUser = formValues => async dispatch => {
    const response = await users.post('/', {...formValues });

    dispatch({ type: CREATE_USER, payload: response.data });

    history.push(routes.users);
};


export const EDIT_USER = 'EDIT_USER';
export const editUser = (id, formValues) => async dispatch => {
    const response = await users.put(`/${id}`, formValues);

    dispatch({ type: EDIT_USER, payload: response.data });

    history.push(routes.users);
};

export const DELETE_USER = 'DELETE_USER';
export const deleteUser = id => async dispatch => {
    await users.delete(`/${id}`);

    dispatch({ type: DELETE_USER, payload: id });

    history.push(routes.users);
};



