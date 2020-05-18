import events from '../api/events';
import history from '../history';
import routes from '../constants/routes/events';

export const FETCH_EVENT_LIST = 'FETCH_EVENT_LIST';
export const fetchEventList = () => async dispatch => {
    const response = await events.get('/');

    dispatch({ type: FETCH_EVENT_LIST, payload: response.data});
};

export const FETCH_EVENT = 'FETCH_EVENT' ;
export const fetchEvent = id => async dispatch => {
    const response = await events.get(`/${id}`);

    dispatch({ type: FETCH_EVENT, payload: response.data });
};

export const CREATE_EVENT = 'CREATE_EVENT' ;
export const createEvent = formValues => async dispatch => {
    const response = await events.post('/', {...formValues });

    dispatch({ type: CREATE_EVENT, payload: response.data });

    history.push(routes.events);
};


export const EDIT_EVENT = 'EDIT_EVENT';
export const editEvent = (id, formValues) => async dispatch => {
    const response = await events.put(`/${id}`, formValues);

    dispatch({ type: EDIT_EVENT, payload: response.data });

    history.push(routes.events);
};

export const DELETE_EVENT = 'DELETE_EVENT';
export const deleteEvent = id => async dispatch => {
    await events.delete(`/${id}`);

    dispatch({ type: DELETE_EVENT, payload: id });

    history.push(routes.events);
};
