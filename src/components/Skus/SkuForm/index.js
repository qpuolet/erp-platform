import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SkuForm extends React.Component {
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
                    label="Enter Title"
                    value={title}
                />
                <Field
                    name="packing"
                    component={this.renderInput}
                    label="Enter Packing"
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
        errors.title = 'This title has no character';
    }
    if (!formValues.packing) {
        errors.packing = 'This packing has no character';
    }

    return errors;
};

export default reduxForm({
    form: 'SkuForm',
    validate,
})(SkuForm);
