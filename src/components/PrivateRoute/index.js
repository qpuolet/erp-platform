import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import users from '../../constants/routes/users';
import { getJWT } from '../../core/utils/auth';

export default function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            return (
                !!(getJWT())
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: users.login,
                    }}/>
            )
        }}/>
    );
}
