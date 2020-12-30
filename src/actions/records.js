import records from '../api/records';
import history from '../history';
import users from "../constants/routes/users";

export const FETCH_RECORD_LIST = 'FETCH_RECORD_LIST';
export const fetchRecordList = (query = '') => async dispatch => {
    await records.get(`/${query}`)
        .then((response) => {
            dispatch({ type: FETCH_RECORD_LIST, payload: response.data});
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const FETCH_RECORD = 'FETCH_RECORD' ;
export const fetchRecord = id => async dispatch => {
    await records.get(`/${id}`)
        .then((response) => {
            dispatch({ type: FETCH_RECORD, payload: response.data });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const CREATE_RECORD = 'CREATE_RECORD' ;
export const createRecord = (formValues, route) => async dispatch => {
    await records.put('/', formValues)
        .then((response) => {
            dispatch({ type: CREATE_RECORD, payload: response.data });
            history.push(route);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const EDIT_RECORD = 'EDIT_RECORD';
export const editRecord = (id, formValues, forward) => async dispatch => {
    await records.put(`/${id}`, formValues)
        .then((response) => {
            dispatch({ type: EDIT_RECORD, payload: response.data });
            history.push(forward);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const DELETE_RECORD = 'DELETE_RECORD';
export const deleteRecord = (id, route) => async dispatch => {
    await records.delete(`/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_RECORD, payload: id });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const TRANSFER_RECORD = 'TRANSFER_RECORD';
export const transferRecord = (formValues, productionIdTo, warehouseIdTo, forward) => async dispatch => {
    await records.patch(`?warehouseIdTo=${warehouseIdTo}&productionIdTo=${productionIdTo}`, formValues)
        .then((response) => {
            dispatch({ type: TRANSFER_RECORD});
            history.push(forward);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};
