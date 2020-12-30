import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {createProduct} from '../../../actions/products';
import { mapFormValues } from '../../../reducers/productsReducer';
import { fetchMaterialList } from '../../../actions/materials';
import ProductForm from "../ProductsForm";

class CreateProduct extends React.Component {

    static  propTypes = {
        createProduct: PropTypes.func,
    };

    componentDidMount() {
        this.props.fetchMaterialList();
    }

    onSubmit = (formValues, errors) => {
        this.props.createProduct(mapFormValues(formValues));
    };
    render() {
        const {materials} = this.props;
        return (
            <div>
                <h3>"Добавить новый товар"</h3>
                <ProductForm
                    onSubmit={this.onSubmit}
                    materials={materials}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        materials: Object.values(state.materials)
    };
};

export default connect(mapStateToProps, { createProduct,fetchMaterialList })(CreateProduct);
