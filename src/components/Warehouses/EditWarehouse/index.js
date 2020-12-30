import React from 'react';
import { connect } from 'react-redux';

import { fetchWarehouse, editWarehouse } from '../../../actions/warehouses';
import { mapFormValues } from '../../../reducers/warehousesReducer';
import WarehouseForm from "../WarehouseForm";

class EditWarehouse extends React.Component {

    componentDidMount() {
        this.props.fetchWarehouse(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editWarehouse(
            this.props.match.params.id,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.warehouse) {
            return null;
        }
        const { title} = this.props.warehouse;

        return (
            <div>
                <h3>"Изменить склад"</h3>
                <WarehouseForm
                    onSubmit={this.onSubmit}
                    initialValues={{
                        title
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        warehouse: state.warehouses[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchWarehouse, editWarehouse })(EditWarehouse);
