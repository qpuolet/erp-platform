import React from 'react';
import { connect } from 'react-redux';

import { fetchUser, editUser } from '../../../actions/users';
import { mapFormValues } from '../../../reducers/skuReducer';
import UserForm from '../UserForm';

class EditUser extends React.Component {

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editUser(
            this.props.match.params.id,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.user) {
            return null;
        }
        const { username, email, password } = this.props.user;

        return (
            <UserForm
                initialValues={{
                    username,
                    email,
                    password,
                }}
            />
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchUser, editUser })(EditUser);
