import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Modal, Button } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

export default class SkuList extends Component {
    static propTypes = {
        routes: PropTypes.object,
        deleteSku: PropTypes.func,
        skus: PropTypes.array,
        enableDeleteSku: PropTypes.bool,
        enableEditSku: PropTypes.bool,
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
            },
            {
                title: 'Количество',
                dataIndex: 'count',
            },
        ];

        if (this.props.enableDeleteSku) {
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
            });
        }

        if (this.props.enableEditSku) {
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
            });
        }

        return columns;
    }

    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
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
                number: idx + 1         ,
                name: sku.title,
                packing: sku.packing,
                quantity: sku.quantity || '-',
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
