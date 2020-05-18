import warehouses from '../api/warehouses';
import history from '../history';
import routes from '../constants/routes/warehouses';

export const FETCH_WAREHOUSE_LIST = 'FETCH_WAREHOUSE_LIST';
export const fetchWarehouseList = () => async dispatch => {
    const response = await warehouses.get('/');

    dispatch({ type: FETCH_WAREHOUSE_LIST, payload: response.data});
};

export const FETCH_WAREHOUSE = 'FETCH_WAREHOUSE' ;
export const fetchWarehouse = id => async dispatch => {
    const response = await warehouses.get(`/${id}`);

    dispatch({ type: FETCH_WAREHOUSE, payload: response.data });
};

export const CREATE_WAREHOUSE = 'CREATE_WAREHOUSE' ;
export const createWarehouse = formValues => async dispatch => {
    const response = await warehouses.post('/', {...formValues });

    dispatch({ type: CREATE_WAREHOUSE, payload: response.data });

    history.push(routes.warehouses);
};


export const EDIT_WAREHOUSE = 'EDIT_WAREHOUSE';
export const editWarehouse = (id, formValues) => async dispatch => {
    const response = await warehouses.put(`/${id}`, formValues);

    dispatch({ type: EDIT_WAREHOUSE, payload: response.data });

    history.push(routes.warehouses);
};

export const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';
export const deleteWarehouse = id => async dispatch => {
    await warehouses.delete(`/${id}`);

    dispatch({ type: DELETE_WAREHOUSE, payload: id });

    history.push(routes.warehouses);
};
