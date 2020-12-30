import { SIGN_IN, SIGN_OUT } from '../actions/auth';
import {deleteJWT, setJWT} from "../core/utils/auth";

const INITIAL_STATE = sessionStorage.getItem("master_class") ? JSON.parse(sessionStorage.getItem("master_class")):{
    isSignedIn: false,
    user: null,
    userId: null,
    roles: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SIGN_IN:
            var storage ={"isSignedIn": true, "user": payload, "userId": payload.user.id, "roles": payload.user.roles };
            sessionStorage.setItem("master_class",
                JSON.stringify(storage) );
            setJWT(payload.token);
            return { ...state, isSignedIn: true, user: payload, userId: payload.user.id, roles: payload.user.roles };
        case SIGN_OUT:
            deleteJWT();
            sessionStorage.removeItem("master_class");
            return { ...state, isSignedIn: false, user: null, userId: null, roles: null };
        default:
            return state;
    }
};
