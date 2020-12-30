import React from 'react';
import { connect } from 'react-redux';

import { fetchProduct, editProduct } from '../../../actions/products';
import { fetchMaterialList } from '../../../actions/materials';
import { mapFormValues } from '../../../reducers/productsReducer';
import ProductForm from "../ProductsForm";

class EditProduct extends React.Component {

    componentDidMount() {
        this.props.fetchMaterialList();
        this.props.fetchProduct(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editProduct(
            this.props.match.params.id,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.product) {
            return null;
        }
        const { title, packing, rawMaterialId} = this.props.product;
        const {materials} = this.props;

        return (
            <div>
                <h3>"Изменить данные товара"</h3>
                <ProductForm
                    onSubmit={this.onSubmit}
                    materials={materials}
                    initialValues={{
                        title,
                        packing: packing.join(', '),
                        rawMaterialId
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.id],
        materials: Object.values(state.materials)
    };
};

export default connect(mapStateToProps, { fetchProduct, editProduct, fetchMaterialList })(EditProduct);
