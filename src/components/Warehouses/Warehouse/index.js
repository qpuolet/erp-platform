import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';
import { get } from 'lodash';

import WarehouseCard from '../WarehouseCard';
import RecordList from '../../Records/RecordList';
import { fetchWarehouse, deleteWarehouse } from '../../../actions/warehouses';
import { fetchRecordList, deleteRecord } from '../../../actions/records';
import { getProducts, getMaterials } from '../../../reducers/recordsReducer';
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

    showDeleteConfirm = ({ id, title }) => (
        Modal.confirm({
            title: `Удалить склад ${'\u00AB'}${title}${'\u00BB'}`,
            icon: <ExclamationCircleOutlined />,
            content: 'Склад будет удален навсегда',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: () => this.props.deleteWarehouse(id),
            onCancel() {
            },
        })
    );

    onDeleteRecord = (id) => {
        this.props.deleteRecord(
            id,
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
                <Button
                    type="primary"
                    danger
                    onClick={this.showDeleteConfirm.bind(null, warehouse)}
                >
                    Удалить
                </Button>
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
})(Warehouse);
