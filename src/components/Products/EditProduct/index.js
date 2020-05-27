import React from 'react';
import { connect } from 'react-redux';

import { fetchProduct, editProduct } from '../../../actions/products';
import { mapFormValues } from '../../../reducers/skuReducer';
import EditSku from '../../Skus/EditSku';

class EditProduct extends React.Component {

    componentDidMount() {
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
        const { title, packing } = this.props.product;

        return (
            <EditSku
                title={title}
                packing={packing}
                onSubmit={this.onSubmit}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchProduct, editProduct })(EditProduct);
