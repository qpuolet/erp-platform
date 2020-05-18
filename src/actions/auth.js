import users from '../api/users';
import history from '../history';
import routes from '../constants/routes/users';
import { setJWT } from '../core/utils/auth';

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
    type: SIGN_OUT
});

export const SIGN_IN = 'SIGN_IN';
export const signIn = formValues => async dispatch => {
    await users.post(`/login`, {...formValues })
        .then((success) => {
            if (success.status === 200) {
                setJWT(success.data.token);
                dispatch({ type: SIGN_IN, payload: success.data });
                history.push(`${routes.user}${success.data.user.id}`)
            }
        });
};
