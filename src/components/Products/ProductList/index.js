import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    fetchProductList,
} from '../../../actions/products';
import routes from '../../../constants/routes/products';
import SkuList from '../../Skus/SkuList';
import './ProductList.scss';

class ProductList extends Component {

    componentDidMount() {
        this.props.fetchProductList();
    }

    get routes() {
        return {
          createSku: routes.createProduct,
        };
    }

    render() {
        const { products } = this.props;
        return (
            <SkuList
                routes={this.routes}
                skus={products}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        products: Object.values(state.products),
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchProductList,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
