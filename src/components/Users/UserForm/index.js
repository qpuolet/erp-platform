import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {mapFormValues} from "../../../reducers/skuReducer";

class EventForm extends React.Component {
    static defaultProps = {
      initialValues: {
          title: '',
          packing: '',
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

    /*
    ***
     TO DO change fake userId
    ***
     */

    onSubmit = (formValues, errors) => {
        this.props.onSubmit({
            ...formValues,
            userId: '5ea69840caa19161df7412fe',
        });
    };

    render() {
        const { handleSubmit } = this.props;
        const { name, email, password } = this.props.initialValues;

        return (
            <form
                className="ui form error"
                onSubmit={handleSubmit(this.onSubmit)}
            >
                <Field
                    name="username"
                    component={this.renderInput}
                    label="Введите ваше имя"
                    value={name}
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
                    label="Введите пароль"
                    value={password}
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title) {
        errors.title = 'This title has no character';
    }
    if (!formValues.packing) {
        errors.packing = 'This packing has no character';
    }

    return errors;
};

export default reduxForm({
    form: 'EventForm',
    validate,
})(EventForm);
