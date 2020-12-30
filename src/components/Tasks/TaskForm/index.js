import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class TaskForm extends React.Component {
    static defaultProps = {
        initialValues: {
            assignedUserName: '',
            title: '',
            status: '',
        },
    };

    static propTypes = {
        users: PropTypes.array,
        userId: PropTypes.string,
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

    renderSelectField(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <select  {...field.input}  >
                    {field.children}
                </select>
                <div className="error">
                    {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        )
    }

    onSubmit = (formValues, errors) => {
        console.log("i m clicked", formValues);
        this.props.onSubmit(formValues);
    };

    render() {
        const { handleSubmit, users, userId } = this.props;
        const { assignedUserName, title, status } = this.props.initialValues;

        return (
            <form
                className="ui form error"
                onSubmit={handleSubmit(this.onSubmit)}
            >
                {status ? (
                <Field
                    name="assignedUserId"
                    component={this.renderSelectField}
                    label="Выберете адресата"
                >
                    {users.map((user) => <option value={user.id} selected={user.username===assignedUserName}>{user.username}</option>)}
                </Field>
                ) : [
                    <Field
                        name="assignedUserId"
                        component={this.renderSelectField}
                        label="Выберете адресата"
                        value={{value: {userId}, label: 'assignedUserId'}}
                    >
                        {users.map((user) => <option value={user.id} selected={user.id===userId}>{user.username}</option>)}
                    </Field>
                ]}
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Введите текст задания"
                    value={title}
                />
                {status &&
                <Field
                    name="status"
                    component={this.renderSelectField}
                    label="Выберете статус"
                >
                    <option value="ASSIGNED" selected={"ASSIGNED" === status}>ASSIGNED</option>
                    <option value="IN_PROGRESS" selected={"IN_PROGRESS" === status}>IN_PROGRESS</option>
                    <option value="DONE" selected={"DONE" === status}>DONE</option>
                    <option value="ON_HOLD" selected={"ON_HOLD" === status}>ON_HOLD</option>
                </Field>
                }
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}
const validate = formValues => {
    const errors = {};

    if(!formValues.title) {
        errors.title = 'Наименование должно присутствовать';
    }
    return errors;
};

export default reduxForm({
    form: 'TaskForm',
    validate,
})(TaskForm);
