import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class ProductForm extends React.Component {
    static defaultProps = {
        initialValues: {
            title: '',
            packing: '',
            rawMaterialId: '',
        },
    };

    static propTypes = {
        materials: PropTypes.array,
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
        const { handleSubmit, materials } = this.props;
        const { title, packing, rawMaterialId } = this.props.initialValues;

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
                <Field
                    name="rawMaterialId"
                    component={this.renderSelectField}
                    label="Выберете сырьё"
                >
                    <option />
                    {materials.map((material) => <option value={material.id} selected={material.id===rawMaterialId}>{material.title}</option>)}
                </Field>
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
    if (!formValues.packing) {
        errors.packing = 'Варианты фасовки должны присутствовать';
    }

    return errors;
};

export default reduxForm({
    form: 'ProductForm',
    validate,
})(ProductForm);
