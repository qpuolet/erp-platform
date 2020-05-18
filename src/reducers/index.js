import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import productsReducer from './productsReducer';
import materialsReducer from './materialsReducer';
import eventsReducer from './eventsReducer';
import usersReducer from './usersReducer';
import warehousesReducer from './warehousesReducer';
import productionsReducer from './productionsReducer';
import recordsReducer from './recordsReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    products: productsReducer,
    materials: materialsReducer,
    events: eventsReducer,
    users: usersReducer,
    warehouses: warehousesReducer,
    productions: productionsReducer,
    records: recordsReducer,
});
