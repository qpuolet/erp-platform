import {
    FETCH_PRODUCTION_LIST,
    FETCH_PRODUCTION,
    CREATE_PRODUCTION,
    EDIT_PRODUCTION,
    DELETE_PRODUCTION,
} from '../actions/productions';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTION_LIST:
            let mappedProductions = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedProductions = { ...mappedProductions, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedProductions };
        case CREATE_PRODUCTION:
        case FETCH_PRODUCTION:
        case EDIT_PRODUCTION:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_PRODUCTION:
            return omit(state, action.payload);
        default:
            return state;
    }
}

export const mapFormValues = formValues => {
    return formValues;
};

export const getProductionItems = (items, productionId) =>
    items.filter(item => item.productionId === productionId);

