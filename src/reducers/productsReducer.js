import {
    FETCH_PRODUCT_LIST,
    FETCH_PRODUCT,
    CREATE_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
} from '../actions/products';
import { omit } from 'lodash';

export const mapFormValues = ({ title, packing = '', rawMaterialId }) => {
    return {
        title,
        packing: packing.split(','),
        rawMaterialId
    }
};

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_LIST:
            let mappedProducts = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedProducts = { ...mappedProducts, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedProducts };
        case CREATE_PRODUCT:
        case FETCH_PRODUCT:
        case EDIT_PRODUCT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_PRODUCT:
            return omit(state, action.payload);
        default:
            return state;
    }
}
