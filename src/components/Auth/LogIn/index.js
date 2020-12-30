import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LogInForm from '../LogInForm';
import { signIn, signOut } from '../../../actions/auth';
import routes from '../../../constants/routes/users';

class LogIn extends Component {

    onSubmit = (formValues, errors) => {
        this.props.signIn(formValues);
    };

    render() {
        if (this.props.isSignedIn === true) {
            return (
                <Redirect to={routes.warehouses} />
            );
        }
        return (
            <LogInForm
                onSubmit={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    isSignedIn: state.isSignedIn,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        signIn,
        signOut,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
