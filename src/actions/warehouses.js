import warehouses from '../api/warehouses';
import history from '../history';
import routes from '../constants/routes/warehouses';
import users from "../constants/routes/users";

export const FETCH_WAREHOUSE_LIST = 'FETCH_WAREHOUSE_LIST';
export const fetchWarehouseList = () => async dispatch => {
    await warehouses.get('/')
        .then((response) => {
            dispatch({ type: FETCH_WAREHOUSE_LIST, payload: response.data});
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const FETCH_WAREHOUSE = 'FETCH_WAREHOUSE' ;
export const fetchWarehouse = id => async dispatch => {
    await warehouses.get(`/${id}`)
        .then((response) => {
            dispatch({ type: FETCH_WAREHOUSE, payload: response.data });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const CREATE_WAREHOUSE = 'CREATE_WAREHOUSE' ;
export const createWarehouse = formValues => async dispatch => {
    await warehouses.post('/', {...formValues })
        .then((response) => {
            dispatch({ type: CREATE_WAREHOUSE, payload: response.data });
            history.push(routes.warehouses);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};


export const EDIT_WAREHOUSE = 'EDIT_WAREHOUSE';
export const editWarehouse = (id, formValues) => async dispatch => {
    await warehouses.put(`/${id}`, formValues)
        .then((response) => {
            dispatch({ type: EDIT_WAREHOUSE, payload: response.data });
            history.push(routes.warehouses);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';
export const deleteWarehouse = id => async dispatch => {
    await warehouses.delete(`/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_WAREHOUSE, payload: id });
            history.push(routes.warehouses);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};
