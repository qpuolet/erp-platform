import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import routes from '../../../constants/routes/warehouses';
import './WarehouseCard.scss';

export default class EventCard extends Component {
    static propTypes = {
        warehouse: PropTypes.shape({
            title: PropTypes.string,
        }),
        showMoreLink: PropTypes.bool,
    };

    showMoreLink = id => (
        <Link to={`${routes.warehouse}${id}`}>Открыть</Link>
    );

    render() {
        const { title, dateTime, id } = this.props.warehouse;
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
