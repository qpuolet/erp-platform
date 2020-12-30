import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import routes from '../../../constants/routes/productions';
import './ProductionCard.scss';

export default class ProductionCard extends Component {
    static propTypes = {
        routes: PropTypes.object,
        production: PropTypes.shape({
            title: PropTypes.string,
        }),
        showMoreLink: PropTypes.bool,
        deleteProd: PropTypes.func,
        roles: PropTypes.array,
    };

    showMoreLink = id => (
        <div>
            <Link to={`${routes.production}${id}`}>Открыть</Link>
            {this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
            <Link to={`${this.props.routes.editProd}${id}`}><EditOutlined/></Link>
            )}
            {this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
            <span onClick={this.showDeleteConfirm.bind(null, id)}>Удалить</span>
            )}
        </div>
    );

    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Вы уверены, что хотите удалить это производство?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk: () => {
                this.props.deleteProd(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    );

    render() {
        const { title, id } = this.props.production;
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
