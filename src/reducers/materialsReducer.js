import {
    FETCH_MATERIAL_LIST,
    FETCH_MATERIAL,
    CREATE_MATERIAL,
    EDIT_MATERIAL,
    DELETE_MATERIAL,
} from '../actions/materials';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MATERIAL_LIST:
            let mappedMaterials = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedMaterials = { ...mappedMaterials, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedMaterials };
        case CREATE_MATERIAL:
        case FETCH_MATERIAL:
        case EDIT_MATERIAL:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_MATERIAL:
            return omit(state, action.payload);
        default:
            return state;
    }
}
