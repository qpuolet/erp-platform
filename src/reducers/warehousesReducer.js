import {
    FETCH_WAREHOUSE_LIST,
    FETCH_WAREHOUSE,
    CREATE_WAREHOUSE,
    EDIT_WAREHOUSE,
    DELETE_WAREHOUSE,
} from '../actions/warehouses';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_WAREHOUSE_LIST:
            let mappedWarehouses = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedWarehouses = { ...mappedWarehouses, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedWarehouses };
        case CREATE_WAREHOUSE:
        case FETCH_WAREHOUSE:
        case EDIT_WAREHOUSE:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_WAREHOUSE:
            return omit(state, action.payload);
        default:
            return state;
    }
}

export const mapFormValues = formValues => {
    return formValues;
};
