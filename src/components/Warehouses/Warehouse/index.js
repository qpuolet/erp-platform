import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import WarehouseCard from '../WarehouseCard';
import RecordList from '../../Records/RecordList';
import { fetchWarehouse, deleteWarehouse } from '../../../actions/warehouses';
import {fetchRecordList, deleteRecord, editRecord, createRecord} from '../../../actions/records';
import {getProducts, getMaterials, mapUpdatedFormValues, mapOnChangeFormValues} from '../../../reducers/recordsReducer';
import { getWarehouseItems } from '../../../reducers/warehousesReducer';
import routes from '../../../constants/routes';
import './Warehouse.scss';

class Warehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
          warehouseId: props.match.params.id,
        };
    }

    componentDidMount() {
        this.props.fetchWarehouse(this.state.warehouseId);
        this.props.fetchRecordList(`?warehouseId=${this.state.warehouseId}`);
    }

    onDeleteRecord = (id) => {
        this.props.deleteRecord(
            id,
            `${routes.warehouse}${this.state.warehouseId}`
        );
    };

    onUpdate = (id, formValues) => {
        this.props.editRecord(
            id,
            mapUpdatedFormValues(formValues),
            `${routes.warehouse}${this.state.warehouseId}`
        );
    };

    onChange = (formValues, status) => {
        this.props.createRecord(
            mapOnChangeFormValues(formValues, status),
            `${routes.warehouse}${this.state.warehouseId}`
        );
    };

    renderProducts = () => {
        const { products } = this.props;

        if (products.length) {
            return (
                <RecordList
                    records={products}
                    deleteRecord={this.onDeleteRecord}
                    updateRecord={this.onUpdate}
                    onChange={this.onChange}
                    title="Список готовой продукции"
                />
            )
        }

        return null;
    };

    renderMaterials = () => {
        const { materials } = this.props;

        if (materials.length) {
            return (
                <RecordList
                    records={materials}
                    deleteRecord={this.onDeleteRecord}
                    updateRecord={this.onUpdate}
                    title="Список сырья"
                />

            )
        }
    };

    render() {
        const { warehouse } = this.props;
        if (!warehouse) {
            return null;
        }

        return (
            <Fragment>
                <WarehouseCard warehouse={warehouse}>
                    {this.renderProducts()}
                    {this.renderMaterials()}
                </WarehouseCard>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    warehouse: state.warehouses[ownProps.match.params.id],
    products: getWarehouseItems(getProducts(state.records), ownProps.match.params.id),
    materials: getWarehouseItems(getMaterials(state.records), ownProps.match.params.id),
});

export default connect(mapStateToProps, {
    fetchWarehouse,
    deleteWarehouse,
    fetchRecordList,
    deleteRecord,
    editRecord,
    createRecord
})(Warehouse);
