import productions from '../api/productions';
import history from '../history';
import routes from '../constants/routes/productions';
import users from "../constants/routes/users";

export const FETCH_PRODUCTION_LIST = 'FETCH_PRODUCTION_LIST';
export const fetchProductionList = () => async dispatch => {
    await productions.get('/')
        .then((response) => {
            dispatch({ type: FETCH_PRODUCTION_LIST, payload: response.data})
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const FETCH_PRODUCTION = 'FETCH_PRODUCTION' ;
export const fetchProduction = id => async dispatch => {
    await productions.get(`/${id}`)
        .then((response) => {
            dispatch({ type: FETCH_PRODUCTION, payload: response.data });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const CREATE_PRODUCTION = 'CREATE_PRODUCTION' ;
export const createProduction = formValues => async dispatch => {
    await productions.post('/', {...formValues })
        .then((response) => {
            dispatch({ type: CREATE_PRODUCTION, payload: response.data });
            history.push(routes.productions);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};


export const EDIT_PRODUCTION = 'EDIT_PRODUCTION';
export const editProduction = (id, formValues) => async dispatch => {
    await productions.put(`/${id}`, formValues)
        .then((response) => {
            dispatch({ type: EDIT_PRODUCTION, payload: response.data });
            history.push(routes.productions);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const DELETE_PRODUCTION = 'DELETE_PRODUCTION';
export const deleteProduction = id => async dispatch => {
    await productions.delete(`/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_PRODUCTION, payload: id });
            history.push(routes.productions);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};
