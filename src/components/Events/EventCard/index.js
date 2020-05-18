import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import routes from '../../../constants/routes/events';
import './EventCard.scss';

export default class EventCard extends Component {
    static propTypes = {
        event: PropTypes.shape({
            title: PropTypes.string,
            dateTime: PropTypes.string,
        }),
    };

    get date() {
        const { dateTime } = this.props.event;
        const date = new Date(dateTime);
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    }

    showMoreLink = id => (
        <Link to={`${routes.event}${id}`}>Развернуть</Link>
    );

    render() {
        const { title, dateTime, id } = this.props.event;
        return (
            <Card
                type="inner"
                title={title}
                extra={this.showMoreLink(id)}
            >
                {this.date}
            </Card>
        );
    }
}
