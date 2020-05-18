import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWarehouseList } from '../../../actions/warehouses';
import routes from '../../../constants/routes/warehouses';
import WarehouseCard from '../WarehouseCard';
import './WarehouseList.scss';

class WarehouseList extends Component {

    componentDidMount() {
        this.props.fetchWarehouseList();
    }

    render() {
        const { warehouses } = this.props;
        return (
            <Fragment>
                <h3>Список складов</h3>
                {warehouses.map((warehouse, idx) => (
                    <WarehouseCard
                        key={idx}
                        warehouse={warehouse}
                        showMoreLink
                    />
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        warehouses: Object.values(state.warehouses),
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchWarehouseList,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseList);
