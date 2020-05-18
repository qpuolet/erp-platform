import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createEvent } from '../../../actions/events';
import { mapFormValues } from '../../../reducers/eventsReducer';
import EventForm from '../EventForm';

class CreateEvent extends React.Component {

    static  propTypes = {
        createEvent: PropTypes.func,
    };

    onSubmit = (formValues, errors) => {
        this.props.createEvent(mapFormValues(formValues));
    };

    render() {
        return (
            <EventForm
                header="Добавить новую задачу"
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default connect(null, { createEvent })(CreateEvent);
