import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SkuList from '../../Skus/SkuList';

import {
    fetchProductList,
	deleteProduct
} from '../../../actions/products';
import routes from '../../../constants/routes/products';
import './ProductList.scss';

class ProductList extends Component {

    componentDidMount() {
        this.props.fetchProductList();
    }

    get routes() {
        return {
          editSku: routes.editProduct,
          createSku: routes.createProduct,
        };
    }

    render() {
        const {deleteProduct, products } = this.props;
        return (
            <SkuList
                routes={this.routes}
				deleteSku={deleteProduct}
                skus={products}
                roles={this.props.roles}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        products: Object.values(state.products),
        roles: state.auth.roles,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchProductList,
		deleteProduct,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
