import users from '../api/users';
import history from '../history';
import routes from '../constants/routes/users';

export const FETCH_USER_LIST = 'FETCH_USER_LIST';
export const fetchUserList = () => async dispatch => {
    await users.get('/')
        .then((response) => {
            dispatch({ type: FETCH_USER_LIST, payload: response.data});
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const FETCH_USER = 'FETCH_USER' ;
export const fetchUser = id => async dispatch => {
    await users.get(`/${id}`)
        .then((response) => {
            dispatch({ type: FETCH_USER, payload: response.data });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const CREATE_USER = 'CREATE_USER' ;
export const createUser = formValues => async dispatch => {
    await users.post('/', {...formValues })
        .then((response) => {
            dispatch({ type: CREATE_USER, payload: response.data });
            history.push(routes.users);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};


export const EDIT_USER = 'EDIT_USER';
export const editUser = (id, formValues) => async dispatch => {
    await users.put(`/${id}`, formValues)
        .then((response) => {
            dispatch({ type: EDIT_USER, payload: response.data });
            history.push(routes.users);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const DELETE_USER = 'DELETE_USER';
export const deleteUser = id => async dispatch => {
    await users.delete(`/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_USER, payload: id });
            history.push(routes.users);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};



