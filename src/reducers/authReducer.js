import { SIGN_IN, SIGN_OUT } from '../actions/auth';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, user: payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, user: null };
        default:
            return state;
    }
};
