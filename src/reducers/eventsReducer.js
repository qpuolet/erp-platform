import {
    FETCH_EVENT_LIST,
    FETCH_EVENT,
    CREATE_EVENT,
    EDIT_EVENT,
    DELETE_EVENT,
} from '../actions/events';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_EVENT_LIST:
            let mappedEvents = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedEvents = { ...mappedEvents, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedEvents };
        case CREATE_EVENT:
        case FETCH_EVENT:
        case EDIT_EVENT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_EVENT:
            return omit(state, action.payload);
        default:
            return state;
    }
}

export const mapFormValues = formValues => {
    return formValues;
};
