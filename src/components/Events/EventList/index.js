import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchEventList } from '../../../actions/events';
import EventCard from '../EventCard';
import './EventList.scss';

class EventList extends Component {

    componentDidMount() {
        this.props.fetchEventList();
    }

    render() {
        const { events } = this.props;
        return (
            <Fragment>
                <h3>Список задач</h3>
                {events.map((event, idx) => <EventCard key={idx} event={event} />)}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: Object.values(state.events),
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchEventList,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
