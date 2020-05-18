import productions from '../api/productions';
import history from '../history';
import routes from '../constants/routes/productions';

export const FETCH_PRODUCTION_LIST = 'FETCH_PRODUCTION_LIST';
export const fetchProductionList = () => async dispatch => {
    const response = await productions.get('/');

    dispatch({ type: FETCH_PRODUCTION_LIST, payload: response.data});
};

export const FETCH_PRODUCTION = 'FETCH_PRODUCTION' ;
export const fetchProduction = id => async dispatch => {
    const response = await productions.get(`/${id}`);

    dispatch({ type: FETCH_PRODUCTION, payload: response.data });
};

export const CREATE_PRODUCTION = 'CREATE_PRODUCTION' ;
export const createProduction = formValues => async dispatch => {
    const response = await productions.post('/', {...formValues });

    dispatch({ type: CREATE_PRODUCTION, payload: response.data });

    history.push(routes.productions);
};


export const EDIT_PRODUCTION = 'EDIT_PRODUCTION';
export const editProduction = (id, formValues) => async dispatch => {
    const response = await productions.put(`/${id}`, formValues);

    dispatch({ type: EDIT_PRODUCTION, payload: response.data });

    history.push(routes.productions);
};

export const DELETE_PRODUCTION = 'DELETE_PRODUCTION';
export const deleteProduction = id => async dispatch => {
    await productions.delete(`/${id}`);

    dispatch({ type: DELETE_PRODUCTION, payload: id });

    history.push(routes.productions);
};
