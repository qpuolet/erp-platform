import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProduction } from '../../../actions/productions';
import { mapFormValues } from '../../../reducers/productionsReducer';
import ProductionForm from '../ProductionForm';

class CreateProduction extends React.Component {

    static  propTypes = {
        createProduction: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createProduction(mapFormValues(formValues));
    };

    render() {
        return (
            <ProductionForm
                header="Добавить новое производство"
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default connect(null, { createProduction })(CreateProduction);
