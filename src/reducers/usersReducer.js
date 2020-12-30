import {
    FETCH_USER_LIST,
    FETCH_USER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
} from '../actions/users';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_LIST:
            let mappedUsers = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedUsers = { ...mappedUsers, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedUsers };
        case CREATE_USER:
        case FETCH_USER:
        case EDIT_USER:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_USER:
            return omit(state, action.payload);
        default:
            return state;
    }
}

export const mapFormValues = formValues => {
    return formValues;
};

export const mapRestrictedFormValues = ({ username, email,  roles = '', password }) => {
    return {
        username,
        email,
        roles: roles.split(','),
        password
    }
};
