import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LogInForm from '../LogInForm';
import { signIn, signOut } from '../../../actions/auth';
import { getJWT } from '../../../core/utils/auth';
import routes from '../../../constants/routes/users';

class LogIn extends Component {

    componentDidMount() {
        if (getJWT()) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    }

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

        return (
            <div>Loading...</div>
        )
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
