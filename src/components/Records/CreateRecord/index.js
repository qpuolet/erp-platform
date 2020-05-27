import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import RecordForm from '../RecordForm';
import { mapFormValues } from '../../../reducers/recordsReducer';
import { createRecord } from '../../../actions/records';
import { fetchProductList } from '../../../actions/products';
import { fetchMaterialList } from '../../../actions/materials';
import { fetchWarehouseList } from '../../../actions/warehouses';
import { fetchProductionList } from '../../../actions/productions';
import routes from '../../../constants/routes';
import { PRODUCTS, MATERIALS, WAREHOUSE, PRODUCTION } from '../../../constants';

class CreateRecord extends Component {

    static propTypes = {
        createRecord: PropTypes.func,
        fetchProductList: PropTypes.func,
        fetchMaterialList: PropTypes.func,
    };

    static defaultProps = {
        products: [],
        materials: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            itemsType: PRODUCTS,
            locationsType: PRODUCTION,
            selectedItem: {},
            selectedLocation: {},
        };
    }

    componentDidMount() {
        this.fetchItemsByType(this.state.itemsType);
        this.fetchLocationsByType(this.state.locationsType);
    }

    get route() {
        const id = this.state.selectedLocation.id;
        switch (this.state.locationsType) {
            case WAREHOUSE:
                return `${routes.warehouse}${id}`;
            case PRODUCTION:
                return `${routes.production}${id}`;
            default:
                return '/';
        }
    }

    onSubmit = formValues => {
        this.props.createRecord(mapFormValues(
            formValues,
            this.state.selectedItem,
            this.state.itemsType,
            this.state.selectedLocation,
            this.state.locationsType,
        ), this.route);
    };

    fetchItemsByType = type => {
        if (type === PRODUCTS) {
            this.props.fetchProductList();
        } else if (type === MATERIALS) {
            this.props.fetchMaterialList();
        }
    };

    fetchLocationsByType = type => {
        if (type === PRODUCTION) {
            this.props.fetchProductionList();
        } else if (type === WAREHOUSE) {
            this.props.fetchWarehouseList();
        }
    };

    getItems = ({ products, materials }) => {
        switch (this.state.itemsType) {
            case PRODUCTS:
                return products;
            case MATERIALS:
                return materials;
            default:
                return [];
        }
    };

    getLocations = ({ warehouses, productions }) => {
        switch (this.state.locationsType) {
            case WAREHOUSE:
                return warehouses;
            case PRODUCTION:
                return productions;
            default:
                return [];
        }
    };

    onItemTypeChange = e => {
        const type = e.target.value;
        this.setState({ itemsType: type });
        this.fetchItemsByType(type);
    };

    onLocationTypeChange = e => {
        const type = e.target.value;
        this.setState({ locationsType: type });
        this.fetchLocationsByType(type);
    };

    onItemSelect = e => {
        const id = e.target.value;
        const type = this.state.itemsType;
        this.setState({
            selectedItem: this.props[type].find(item => item.id === id),
        });
    };

    onLocationSelect = e => {
        const id = e.target.value;
        const type = this.state.locationsType;
        this.setState({
            selectedLocation: this.props[type].find(item => item.id === id),
        });
    };

    render() {
        return (
            <div>
                <h3>Добавить новую запись</h3>
                <RecordForm
                    locationsType={this.state.locationsType}
                    itemsType={this.state.itemsType}
                    selectedItem={this.state.selectedItem}
                    items={this.getItems(this.props)}
                    locations={this.getLocations(this.props)}
                    onItemTypeChange={this.onItemTypeChange}
                    onItemSelect={this.onItemSelect}
                    onLocationTypeChange={this.onLocationTypeChange}
                    onLocationSelect={this.onLocationSelect}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: Object.values(state.products),
    materials: Object.values(state.materials),
    warehouses: Object.values(state.warehouses),
    productions: Object.values(state.productions),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        createRecord,
        fetchProductList,
        fetchMaterialList,
        fetchWarehouseList,
        fetchProductionList,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecord);
