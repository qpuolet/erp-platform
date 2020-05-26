import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';

import ProductionCard from '../ProductionCard';
import RecordList from '../../Records/RecordList';
import { fetchProduction, deleteProduction } from '../../../actions/productions';
import { deleteRecord, fetchRecordList } from '../../../actions/records';
import { getProducts, getMaterials } from '../../../reducers/recordsReducer';
import { getProductionItems } from '../../../reducers/productionsReducer';
import routes from '../../../constants/routes';
import './Productions.scss';

class Production extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productionId: props.match.params.id,
        };
    }

    componentDidMount() {
        this.props.fetchProduction(this.state.productionId);
        this.props.fetchRecordList(`?productionId=${this.state.productionId}`);
    }

    showDeleteConfirm = ({ id, title }) => (
        Modal.confirm({
            title: `Удалить производство ${'\u00AB'}${title}${'\u00BB'}`,
            icon: <ExclamationCircleOutlined />,
            content: 'Производство будет удалено навсегда',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: () => this.props.deleteProduction(id),
            onCancel() {
            },
        })
    );

    onDeleteRecord = (id) => {
        this.props.deleteRecord(
            id,
            `${routes.production}${this.state.productionId}`
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
        const { production } = this.props;
        if (!production) {
            return null;
        }

        return (
            <Fragment>
                <Link to={routes.createRecord}>Добавить запись</Link>
                <ProductionCard production={production}>
                    {this.renderProducts()}
                    {this.renderMaterials()}
                </ProductionCard>
                <Button
                    type="primary"
                    danger
                    onClick={this.showDeleteConfirm.bind(null, production)}
                >
                    Удалить
                </Button>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        production: state.productions[ownProps.match.params.id],
        products: getProductionItems(getProducts(state.records), ownProps.match.params.id),
        materials: getProductionItems(getMaterials(state.records), ownProps.match.params.id),
    };
};

export default connect(mapStateToProps, {
    fetchProduction,
    deleteProduction,
    fetchRecordList,
    deleteRecord,
})(Production);
