import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';

import EventCard from '../EventCard';
import { fetchEvent, deleteEvent } from '../../../actions/events';
import './Event.scss';

class EditEvent extends Component {

    componentDidMount() {
        this.props.fetchEvent(this.props.match.params.id);
    }

    showDeleteConfirm = ({ id, title }) => (
        Modal.confirm({
            title: `Удалить задачу ${'\u00AB'}${title}${'\u00BB'}`,
            icon: <ExclamationCircleOutlined />,
            content: 'Задача будет удалена навсегда',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: () => this.props.deleteEvent(id),
            onCancel() {
            },
        })
    );

    render() {
        const { event } = this.props;
        if (!event) {
            return null;
        }

        return (
            <Fragment>
                <EventCard event={event}/>
                <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
                <Button
                    type="primary"
                    danger
                    onClick={this.showDeleteConfirm.bind(null, event)}
                >
                    Удалить
                </Button>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        event: state.events[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchEvent, deleteEvent })(EditEvent);
