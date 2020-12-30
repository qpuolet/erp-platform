import React from 'react';
import { Field, reduxForm } from 'redux-form';

class UserPasswordForm extends React.Component {
    static defaultProps = {
      initialValues: {
          username: '',
          email: '',
      },
    };

    renderError = ({ error, touched}) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues, errors) => {
        console.log("i m clicked", formValues);
        this.props.onSubmit(formValues);
    };

    render() {
        const { handleSubmit } = this.props;
        const { username, email} = this.props.initialValues;

        return (
            <form
                className="ui form error"
                onSubmit={handleSubmit(this.onSubmit)}
            >
                <Field
                    name="username"
                    component={this.renderInput}
                    label="Введите ваше имя"
                    value={username}
                />
                <Field
                    name="email"
                    component={this.renderInput}
                    label="Введите ваш email"
                    value={email}
                />
                <Field
                    name="password"
                    component={this.renderInput}
                    label="Введите новый пароль, если желаете обновить его"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'UserPasswordForm',
})(UserPasswordForm);
