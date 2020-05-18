import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import routes from '../../../constants/routes/records';
import './RecordCard.scss';

export default class EventCard extends Component {
    static propTypes = {
        record: PropTypes.shape({
            title: PropTypes.string,
        }),
        showMoreLink: PropTypes.bool,
    };

    showMoreLink = id => (
        <Link to={`${routes.record}${id}`}>Открыть</Link>
    );

    render() {
        const { title, dateTime, id } = this.props.record;
        return (
            <Card
                type="inner"
                title={title}
                extra={this.props.showMoreLink ? this.showMoreLink(id) : null}
            >
                {this.props.children}
            </Card>
        );
    }
}
