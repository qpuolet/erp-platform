import {
    FETCH_TASK_LIST,
    FETCH_TASK,
    CREATE_TASK,
    EDIT_TASK,
    DELETE_TASK,
    EDIT_TASK_STATUS, FETCH_CREATED_TASK_LIST,
} from '../actions/tasks';
import { omit } from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TASK_LIST:
            let mappedTasks = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedTasks = { ...mappedTasks, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedTasks };
        case FETCH_CREATED_TASK_LIST:
            let mappedCreatedTasks = {};
            Object.keys(action.payload).forEach(
                i =>
                    mappedCreatedTasks = { ...mappedCreatedTasks, [action.payload[i].id]: action.payload[i]}
            );
            return { ...state, ...mappedCreatedTasks };
        case CREATE_TASK:
        case FETCH_TASK:
        case EDIT_TASK:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_TASK:
            return omit(state, action.payload);
        case EDIT_TASK_STATUS:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}

export const mapFormValues = formValues => {
    return formValues;
};

export const getTaskItems = (items, taskId) =>
    items.filter(item => item.taskId === taskId);

