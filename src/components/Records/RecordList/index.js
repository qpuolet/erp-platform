import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Modal, Button } from 'antd';
import { ExclamationCircleOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

import routes from '../../../constants/routes/records';
import { STATUS_TYPES } from '../../../constants';

export default class RecordList extends Component {
    static propTypes = {
        deleteRecord: PropTypes.func,
        records: PropTypes.array,
    };

    getColumns() {
        return [
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
                dataIndex: 'quantity',
            },
            {
                title: 'Статус',
                dataIndex: 'status',
            },
            {
                title: '',
                dataIndex: '',
                key: 'remove',
                render: ({ id }) => {
                    return (
                        <span
                            onClick={this.showDeleteConfirm.bind(null, id)}
                        >
                            <CloseOutlined />
                        </span>
                    );
                }
            },
        ];
    }

    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Are you sure delete this record?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.deleteRecord(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    );

    get recordsData() {
        return this.props.records.map((record, idx) => {
            return {
                key: idx,
                number: idx + 1,
                name: <Link to={`${routes.records}${record.id}`}>{record.title}</Link>,
                packing: record.packing,
                quantity: record.quantity || '-',
                status: STATUS_TYPES[record.status].title,
                id: record.id,
            };
        });
    };


    render() {
        return (
            <Table columns={this.getColumns()} dataSource={this.recordsData} size="middle"/>
        );
    }
}
