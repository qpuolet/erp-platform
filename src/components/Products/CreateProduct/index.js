import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProduct } from '../../../actions/products';
import { mapFormValues } from '../../../reducers/skuReducer';
import CreateSku from '../../Skus/CreateSku';

class CreateProduct extends React.Component {

    static  propTypes = {
        createProduct: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createProduct(mapFormValues(formValues));
    };

    render() {
        return (
            <CreateSku
                header="Добавить новый товар"
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default connect(null, { createProduct })(CreateProduct);
