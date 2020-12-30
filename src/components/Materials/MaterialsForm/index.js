import React from 'react';
import { Field, reduxForm } from 'redux-form';

class MaterialForm extends React.Component {
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

    onSubmit = (formValues, errors) => {
        this.props.onSubmit(formValues);
    };

    render() {
        const { handleSubmit } = this.props;
        const { title, packing } = this.props.initialValues;

        return (
            <form
                className="ui form error"
                onSubmit={handleSubmit(this.onSubmit)}
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Введите наименование"
                    value={title}
                />
                <Field
                    name="packing"
                    component={this.renderInput}
                    label="Ведите варианты фасовки"
                    value={packing}
                    type="number"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if(!formValues.title) {
        errors.title = 'Наименование не может быть пустым';
    }
    if (!formValues.packing) {
        errors.packing = 'Варианты упаковки не могут быть пустыми';
    }

    return errors;
};

export default reduxForm({
    form: 'MaterialForm',
    validate,
})(MaterialForm);
