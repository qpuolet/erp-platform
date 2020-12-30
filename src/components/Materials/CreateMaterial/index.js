import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createMaterial } from '../../../actions/materials';
import { mapFormValues } from '../../../reducers/skuReducer';
import MaterialForm from "../MaterialsForm";

class CreateMaterial extends React.Component {

    static  propTypes = {
        createMaterial: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createMaterial(mapFormValues(formValues));
    };

    render() {
        return (
            <div>
                <h3>"Добавить новое сырьё"</h3>
                <MaterialForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

export default connect(null, { createMaterial })(CreateMaterial);
