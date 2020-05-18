import materials from '../api/materials';
import history from '../history';
import routes from '../constants/routes/materials';

export const FETCH_MATERIAL_LIST = 'FETCH_MATERIAL_LIST';
export const fetchMaterialList = () => async dispatch => {
    const response = await materials.get('/');

    dispatch({ type: FETCH_MATERIAL_LIST, payload: response.data});
};

export const FETCH_MATERIAL = 'FETCH_MATERIAL' ;
export const fetchMaterial = id => async dispatch => {
    const response = await materials.get(`/${id}`);

    dispatch({ type: FETCH_MATERIAL, payload: response.data });
};

export const CREATE_MATERIAL = 'CREATE_MATERIAL' ;
export const createMaterial = formValues => async dispatch => {
    const response = await materials.post('/', {...formValues });

    dispatch({ type: CREATE_MATERIAL, payload: response.data });

    history.push(routes.materials);
};


export const EDIT_MATERIAL = 'EDIT_MATERIAL';
export const editMaterial = (id, formValues) => async dispatch => {
    const response = await materials.put(`/${id}`, formValues);

    dispatch({ type: EDIT_MATERIAL, payload: response.data });

    history.push(routes.materials);
};

export const DELETE_MATERIAL = 'DELETE_MATERIAL';
export const deleteMaterial = id => async dispatch => {
    await materials.delete(`/${id}`);

    dispatch({ type: DELETE_MATERIAL, payload: id });
};
