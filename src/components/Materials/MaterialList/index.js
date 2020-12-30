import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    fetchMaterialList,
    deleteMaterial,
} from '../../../actions/materials';
import routes from '../../../constants/routes/materials';
import SkuList from '../../Skus/SkuList';
import './MaterialList.scss';

class ProductList extends Component {

    componentDidMount() {
        this.props.fetchMaterialList();
    }

    get routes() {
        return {
          editSku: routes.editMaterial,
          createSku: routes.createMaterial,
        };
    }

    render() {
        const { deleteMaterial, materials } = this.props;

        return (
            <SkuList
                routes={this.routes}
                deleteSku={deleteMaterial}
                skus={materials}
                roles={this.props.roles}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        materials: Object.values(state.materials),
        roles: state.auth.roles,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchMaterialList,
        deleteMaterial,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
