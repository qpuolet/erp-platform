import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ProductionCard from '../ProductionCard';
import RecordList from '../../Records/RecordList';
import { fetchProduction, deleteProduction } from '../../../actions/productions';
import { deleteRecord, fetchRecordList, editRecord, createRecord } from '../../../actions/records';
import {getProducts, getMaterials, mapOnChangeFormValues} from '../../../reducers/recordsReducer';
import { getProductionItems } from '../../../reducers/productionsReducer';
import routes from '../../../constants/routes';
import './Productions.scss';
import {mapUpdatedFormValues} from "../../../reducers/recordsReducer";

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

    onDeleteRecord = (id) => {
        this.props.deleteRecord(
            id,
            `${routes.production}${this.state.productionId}`
        );
    };
    onUpdate = (id, formValues) => {
        this.props.editRecord(
            id,
            mapUpdatedFormValues(formValues),
            `${routes.production}${this.state.productionId}`
        );
    };
    onChange = (formValues, status) => {
        this.props.createRecord(
            mapOnChangeFormValues(formValues, status),
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
        const { production } = this.props;
        if (!production) {
            return null;
        }

        return (
            <Fragment>
                <ProductionCard production={production}>
                    {this.renderProducts()}
                    {this.renderMaterials()}
                </ProductionCard>
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
    editRecord,
    createRecord,
})(Production);
