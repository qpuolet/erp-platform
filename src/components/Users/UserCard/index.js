import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import routes from '../../../constants/routes/users';
import './UserCard.scss';

export default class EventCard extends Component {
    static propTypes = {
        user: PropTypes.shape({
            username: PropTypes.string,
            email: PropTypes.string,
        }),
    };

    editLink = id => (
        <Link to={`${routes.editUser}${id}`}>
            <EditOutlined/>
        </Link>
    );

    render() {
        const { username, email, id } = this.props.user;
        return (
            <Card
                type="inner"
                title={username}
                extra={this.editLink(id)}
            >
                {email}
            </Card>
        );
    }
}
