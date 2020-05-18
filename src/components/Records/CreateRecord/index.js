import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import RecordForm from '../RecordForm';
import { mapFormValues } from '../../../reducers/recordsReducer';
import { createRecord } from '../../../actions/records';

class CreateRecord extends Component {

    static propTypes = {
        header: PropTypes.string,
        createRecord: PropTypes.func,
    };

    onSubmit = (formValues) => {
        this.props.createRecord(mapFormValues(formValues));
    };

    render() {
        return (
            <div>
                <h3>Добавить новую запись</h3>
                <RecordForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        createRecord,
    }, dispatch);

export default connect(null, mapDispatchToProps)(CreateRecord);
