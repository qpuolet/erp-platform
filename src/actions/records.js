import records from '../api/records';
import history from '../history';
import routes from '../constants/routes/records';

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
export const createRecord = formValues => async dispatch => {
    const response = await records.post('/', {...formValues });

    dispatch({ type: CREATE_RECORD, payload: response.data });

    history.push(routes.records);
};


export const EDIT_RECORD = 'EDIT_RECORD';
export const editRecord = (id, formValues) => async dispatch => {
    const response = await records.put(`/${id}`, formValues);

    dispatch({ type: EDIT_RECORD, payload: response.data });

    history.push(routes.records);
};

export const DELETE_RECORD = 'DELETE_RECORD';
export const deleteRecord = (id, route) => async dispatch => {
    await records.delete(`/${id}`);
    debugger;
    dispatch({ type: DELETE_RECORD, payload: id });

    // history.push(route);
};
