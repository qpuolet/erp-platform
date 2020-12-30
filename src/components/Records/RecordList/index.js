import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Input, InputNumber, Popconfirm, Form } from 'antd';
import { ExclamationCircleOutlined, CloseOutlined, RotateRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import routes from '../../../constants/routes/records';
import {STATUS_TYPES, UNITS_TYPES} from '../../../constants';

export default class RecordList extends Component {
    static propTypes = {
        deleteRecord: PropTypes.func,
        updateRecord: PropTypes.func,
        onChange: PropTypes.func,
        records: PropTypes.array,
        title: PropTypes.string,
    };

    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Вы действительно хотите удалить запись?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
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
                unitsRus: UNITS_TYPES[record.units].title,
                units: record.units,
                total: record.total + ' кг',
                status: STATUS_TYPES[record.status].title,
                id: record.id,
                productId: record.productId,
                productionId: record.productionId,
                warehouseId: record.warehouseId,
                rawMaterialId: record.rawMaterialId,
            };
        });
    };


    render() {
        const originData = this.recordsData;
        const EditableCell = ({
                                  editing,
                                  dataIndex,
                                  title,
                                  inputType,
                                  record,
                                  index,
                                  children,
                                  ...restProps
                              }) => {
            const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
            return (
                <td {...restProps}>
                    {editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    ) : (
                        children
                    )}
                </td>
            );
        };

        const EditableTable = () => {
            const [form] = Form.useForm();
            const [data, setData] = useState(originData);
            const [editingKey, setEditingKey] = useState('');

            const isEditing = (record) => record.key === editingKey;

            const edit = (record) => {
                form.setFieldsValue({
                    name: '',
                    packing: '',
                    quantity: '',
                    unitsRus: '',
                    total: '',
                    ...record,
                });
                setEditingKey(record.key);
            };

            const cancel = () => {
                setEditingKey('');
            };

            const save = async (record) => {
                try {
                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => record.key === item.key);

                    if (index > -1) {
                        const item = newData[index];
                        this.props.updateRecord(item.id, row)
                        newData.splice(index, 1, { ...item, ...row });
                        setData(newData);
                        setEditingKey('');
                    } else {
                        newData.push(row);
                        setData(newData);
                        setEditingKey('');
                    }
                } catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            };

            const columns = [
                {
                    title: '#',
                    dataIndex: 'number',
                    editable: false,
                },
                {
                    title: 'Наименование',
                    dataIndex: 'name',
                    editable: false,
                },
                {
                    title: 'Фасовка',
                    dataIndex: 'packing',
                    editable: true,
                },
                {
                    title: 'Количество',
                    dataIndex: 'quantity',
                    editable: true,
                },
                {
                    title: 'ед. измерения',
                    dataIndex: 'unitsRus',
                    editable: false,
                },
                {
                    title: 'всего, кг',
                    dataIndex: 'total',
                    editable: false,
                },
                {

                    title: 'Статус',
                    key: 'editStatus',
                    editable: false,
                    render:(record) =>(
                        <select
                            name="status"
                            label="Выберете статус"
                            onChange={e => this.props.onChange(record ,e.target.value)}
                        >
                            <option value="WAITING" selected={"Ожидает"===record.status}>Ожидает</option>
                            <option value="ON_THE_WAY" selected={"В пути"===record.status}>В пути</option>
                            <option value="READY" selected={"Готово"===record.status}>Готово</option>
                        </select>
                    )
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
                {
                    title: '',
                    dataIndex: 'operation',
                    render: (_, record) => {
                        const editable = isEditing(record);
                        return editable ? (
                            <span>
            <a
                href="javascript:;"
                onClick={() => save(record)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                        ) : (
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                            </a>
                        );
                    },
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'remove',
                    render: ({ id }) => {
                        return (
                            <Link to={`${routes.transferRecord}${id}`}>
                                <RotateRightOutlined />
                            </Link>
                        );
                    }
                },
            ];
            const mergedColumns = columns.map((col) => {
                if (!col.editable) {
                    return col;
                }

                return {
                    ...col,
                    onCell: (record) => ({
                        record,
                        inputType: col.dataIndex === 'age' ? 'number' : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: isEditing(record),
                    }),
                };
            });
            return (
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            );
        };

        return (
            <div>
                <h3>{this.props.title}</h3>
                <EditableTable />
            </div>
        );
    }
}
