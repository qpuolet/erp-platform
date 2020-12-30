import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { get } from 'lodash';

export default class SkuList extends Component {
    static propTypes = {
        routes: PropTypes.object,
        deleteSku: PropTypes.func,
        skus: PropTypes.array,
        roles: PropTypes.array,
    };

    getColumns() {
        let columns = [
            {
                title: '#',
                dataIndex: 'number',
            },
            {
                title: 'Наименование',
                dataIndex: 'name',
            },
            {
                title: 'Фасовка',
                dataIndex: 'packing',
            }
        ];
        this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
            columns.push({
                title: '',
                dataIndex: '',
                key: 'remove',
                render: ({ id }) => {
                    return (
                        <span
                            onClick={this.showDeleteConfirm.bind(null, id)}
                        >
                                Удалить
                            </span>
                    );
                }
            }))
        this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
            columns.push({
                title: '',
                dataIndex: '',
                key: 'edit',
                render: ({ id }) => {
                    return (
                        <Link to={`${this.props.routes.editSku}${id}`}>
                            <EditOutlined/>
                        </Link>
                    );
                }
            }))

        return columns;
    }

    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Вы уверены, что хотите удалить?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk: () => {
                this.props.deleteSku(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    );

    get skusData() {
        return this.props.skus.map((sku, idx) => {
            return {
                key: idx,
                number: idx + 1,
                name: sku.title,
                packing: get(sku, 'packing', '').join(', '),
                quantity: sku.quantity,
                id: sku.id,
            };
        });
    };


    render() {
        return (
            <Table columns={this.getColumns()} dataSource={this.skusData} size="middle"/>
        );
    }
}
