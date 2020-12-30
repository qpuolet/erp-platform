import tasks from '../api/tasks';
import history from '../history';
import routes from '../constants/routes/tasks';
import users from '../constants/routes/users'

export const FETCH_TASK_LIST = 'FETCH_TASK_LIST';
export const fetchTaskList = (userId) => async dispatch => {
    await tasks.get(`?userId=${userId}`)
        .then((response) => {
            dispatch({ type: FETCH_TASK_LIST, payload: response.data});
        })
        .catch(function (error) {
            debugger;
            // if (error.response.status === 401) {
            //  history.push(users.login);
            // }
        });
};

export const FETCH_CREATED_TASK_LIST = 'FETCH_CREATED_TASK_LIST';
export const fetchCreatedTaskList = (ownerId) => async dispatch => {
    await tasks.get(`?ownerId=${ownerId}`)
        .then((response) => {
            dispatch({ type: FETCH_CREATED_TASK_LIST, payload: response.data});
        })
        .catch(function (error) {
            debugger;
            // if (error.response.status === 401) {
            //  history.push(users.login);
            // }
        });
};


export const FETCH_TASK = 'FETCH_TASK' ;
export const fetchTask = id => async dispatch => {
    await tasks.get(`/${id}`)
        .then((response) => {
            dispatch({ type: FETCH_TASK, payload: response.data });
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const CREATE_TASK = 'CREATE_TASK' ;
export const createTask = formValues => async dispatch => {
    await tasks.post('/', {...formValues })
        .then((response) => {
            dispatch({ type: CREATE_TASK, payload: response.data });
            history.push(routes.createdTasks);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};


export const EDIT_TASK = 'EDIT_TASK';
export const editTask = (id, formValues) => async dispatch => {
    await tasks.put(`/${id}`, formValues)
        .then((response) => {
            dispatch({ type: EDIT_TASK, payload: response.data });
            history.push(routes.createdTasks);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const EDIT_TASK_STATUS = 'EDIT_TASK_STATUS';
export const editTaskStatus = (id, status) => async dispatch => {
    await tasks.put(`/${id}/status?status=${status}`)
        .then((response) => {
            dispatch({ type: EDIT_TASK_STATUS, payload: response.data });
            history.push(routes.tasks);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = id => async dispatch => {
    await tasks.delete(`/${id}`)
        .then((response) => {
            dispatch({ type: DELETE_TASK, payload: id });
            history.push(routes.createdTasks);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push(users.login);
            }
            alert(error.response.status + " " + (error.response.data ? error.response.data.message:""))
        });
};
