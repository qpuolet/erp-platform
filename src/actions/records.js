import records from '../api/records';
import history from '../history';

export const FETCH_RECORD_LIST = 'FETCH_RECORD_LIST';
export const fetchRecordList = (query = '') => async dispatch => {
    const response = await records.get(`/${query}`);
    dispatch({ type: FETCH_RECORD_LIST, payload: response.data});
};

export const FETCH_RECORD = 'FETCH_RECORD' ;
export const fetchRecord = id => async dispatch => {
    const response = await records.get(`/${id}`);

    dispatch({ type: FETCH_RECORD, payload: response.data });
};

export const CREATE_RECORD = 'CREATE_RECORD' ;
export const createRecord = (formValues, route) => async dispatch => {
    const response = await records.put('/', formValues);

    dispatch({ type: CREATE_RECORD, payload: response.data });

    history.push(route);
};

export const EDIT_RECORD = 'EDIT_RECORD';
export const editRecord = (id, formValues, forward) => async dispatch => {
    const response = await records.put(`/${id}`, formValues);

    dispatch({ type: EDIT_RECORD, payload: response.data });

    history.push(forward);
};

export const DELETE_RECORD = 'DELETE_RECORD';
export const deleteRecord = (id, route) => async dispatch => {
    await records.delete(`/${id}`);
    debugger;
    dispatch({ type: DELETE_RECORD, payload: id });

    // history.push(route);
};

export const TRANSFER_RECORD = 'TRANSFER_RECORD';
export const transferRecord = (formValues, productionIdTo, warehouseIdTo, forward) => async dispatch => {
    await records.patch(`?warehouseIdTo=${warehouseIdTo}&productionIdTo=${productionIdTo}`, formValues);
    debugger;
    dispatch({ type: TRANSFER_RECORD});

    history.push(forward);
};
