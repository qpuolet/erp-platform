import materials from '../api/materials';
import history from '../history';
import routes from '../constants/routes/materials';
import users from "../constants/routes/users";

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
    await materials.post('/', {...formValues })
        .then((success) => {
            if (success.status === 200) {
                dispatch({ type: CREATE_MATERIAL, payload: success.data });
                history.push(routes.materials);
            }
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))

        });
};


export const EDIT_MATERIAL = 'EDIT_MATERIAL';
export const editMaterial = (id, formValues) => async dispatch => {
    await materials.put(`/${id}`, formValues)
        .then((success) => {
            if (success.status === 200) {
                dispatch({ type: EDIT_MATERIAL, payload: success.data });
                history.push(routes.materials);
            }
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))

        });
};

export const DELETE_MATERIAL = 'DELETE_MATERIAL';
export const deleteMaterial = id => async dispatch => {
    await materials.delete(`/${id}`)
        .then((success) => {
           dispatch({ type: DELETE_MATERIAL, payload: id });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))

        });
};
