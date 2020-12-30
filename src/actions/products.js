import products from '../api/products';
import history from '../history';
import routes from '../constants/routes/products';
import users from '../constants/routes/users'

export const FETCH_PRODUCT_LIST = 'FETCH_PRODUCT_LIST';
export const fetchProductList = () => async dispatch => {
    await products.get('/')
        .then((response) => {
            dispatch({ type: FETCH_PRODUCT_LIST, payload: response.data});
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))

        });
};

export const FETCH_PRODUCT = 'FETCH_PRODUCT' ;
export const fetchProduct = id => async dispatch => {
    await products.get(`/${id}`)
        .then((response) => {
            dispatch({ type: FETCH_PRODUCT, payload: response.data });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const CREATE_PRODUCT = 'CREATE_PRODUCT' ;
export const createProduct = formValues => async dispatch => {
    await products.post('/', {...formValues })
        .then((response) => {
            dispatch({ type: CREATE_PRODUCT, payload: response.data });
            history.push(routes.products);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};


export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const editProduct = (id, formValues) => async dispatch => {
    await products.put(`/${id}`, formValues)
        .then((response) => {
            dispatch({ type: EDIT_PRODUCT, payload: response.data });
            history.push(routes.products);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const deleteProduct = id => async dispatch => {
    await products.delete(`/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_PRODUCT, payload: id });
            history.push(routes.products);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};
