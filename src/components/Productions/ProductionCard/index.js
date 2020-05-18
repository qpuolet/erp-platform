import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import routes from '../../../constants/routes/productions';
import './ProductionCard.scss';

export default class EventCard extends Component {
    static propTypes = {
        production: PropTypes.shape({
            title: PropTypes.string,
        }),
        showMoreLink: PropTypes.bool,
    };

    showMoreLink = id => (
        <Link to={`${routes.production}${id}`}>Открыть</Link>
    );

    render() {
        const { title, dateTime, id } = this.props.production;
        return (
            <Card
                type="inner"
                title={title}
                extra={this.props.showMoreLink ? this.showMoreLink(id) : null}
            />
        );
    }
}
