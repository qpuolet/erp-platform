import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createMaterial } from '../../../actions/materials';
import { mapFormValues } from '../../../reducers/skuReducer';
import CreateSku from '../../Skus/CreateSku';

class CreateMaterial extends React.Component {

    static  propTypes = {
        createMaterial: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createMaterial(mapFormValues(formValues));
    };

    render() {
        return (
            <CreateSku
                header="Добавить новое сырьё"
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default connect(null, { createMaterial })(CreateMaterial);
