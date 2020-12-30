import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createUser } from '../../../actions/users';
import {mapRestrictedFormValues} from '../../../reducers/usersReducer';
import UserForm from '../UserForm';

class CreateUser extends React.Component {

    static  propTypes = {
        createUser: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createUser(mapRestrictedFormValues(formValues));
    };

    render() {
        return (
            <UserForm
                header="Добавить нового пользователя"
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default connect(null, { createUser })(CreateUser);
