import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Modal, Button } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

import routes from '../../../constants/routes/records';

export default class RecordList extends Component {
    static propTypes = {
        deleteRecord: PropTypes.func,
        records: PropTypes.array,
    };

    constructor(props) {
        super(props);
    }

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
                dataIndex: 'count',
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
                            Удалить
                        </span>
                    );
                }
            },
            {
                title: '',
                dataIndex: '',
                key: 'edit',
                render: ({ id }) => {
                    return (
                        <Link to={`${routes.editRecord}${id}`}>
                            <EditOutlined/>
                        </Link>
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
