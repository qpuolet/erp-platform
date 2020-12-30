import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWarehouseList, deleteWarehouse } from '../../../actions/warehouses';
import routes from '../../../constants/routes/warehouses';
import WarehouseCard from '../WarehouseCard';
import './WarehouseList.scss';

class WarehouseList extends Component {

    componentDidMount() {
        this.props.fetchWarehouseList();
    }
    get routes() {
        return {
            editWarehouse: routes.editWarehouse,
        };
    }
    render() {
        const { warehouses, deleteWarehouse } = this.props;
        return (
            <Fragment>
                <h3>Список складов</h3>
                {warehouses.map((warehouse, idx) => (
                    <WarehouseCard
                        key={idx}
                        warehouse={warehouse}
                        showMoreLink
                        routes={this.routes}
                        deleteWarehouse={deleteWarehouse}
                        roles={this.props.roles}
                    />
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        warehouses: Object.values(state.warehouses),
        roles: state.auth.roles,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchWarehouseList,
        deleteWarehouse
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseList);
