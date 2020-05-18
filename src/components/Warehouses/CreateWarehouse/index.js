import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createWarehouse } from '../../../actions/warehouses';
import { mapFormValues } from '../../../reducers/warehousesReducer';
import WarehouseForm from '../WarehouseForm';

class CreateWarehouse extends React.Component {

    static  propTypes = {
        createWarehouse: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createWarehouse(mapFormValues(formValues));
    };

    render() {
        return (
            <WarehouseForm
                header="Добавить новый склад"
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default connect(null, { createWarehouse })(CreateWarehouse);
