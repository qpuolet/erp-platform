import React from 'react';
import { connect } from 'react-redux';

import { editUser } from '../../../actions/users';
import { mapFormValues } from '../../../reducers/usersReducer';
import UserPasswordForm from "../UserPasswordForm";

class EditUserPassword extends React.Component {

    onSubmit = formValues => {
        this.props.editUser(
            this.props.userId,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.user) {
            return null;
        }
        const { username, email } = this.props.user.user;

        return (
            <UserPasswordForm
                onSubmit={this.onSubmit}
                initialValues={{
                    username,
                    email,
                }}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.userId,
        user: state.auth.user,

    };
};

export default connect(mapStateToProps, { editUser })(EditUserPassword);

