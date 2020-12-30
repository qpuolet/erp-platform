import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

import {
    fetchCreatedTaskList,
    deleteTask
} from '../../../actions/tasks';
import routes from '../../../constants/routes/tasks';

class CreatedTaskList extends Component {

    componentDidMount() {
        this.props.fetchCreatedTaskList(this.props.userId);
    }

    getColumns() {
        let columns = [
            {
                title: '#',
                dataIndex: 'number',
            },
            {
                title: 'Адресат',
                dataIndex: 'name',
            },
            {
                title: 'Задание',
                dataIndex: 'title',
            },
            {
                title: 'Статус',
                dataIndex: 'status',
            }
        ];

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

        columns.push({
            title: '',
            dataIndex: '',
            key: 'edit',
            render: ({ id }) => {
                return (
                    <Link to={`${routes.editTask}${id}`}>
                        <EditOutlined/>
                    </Link>
                );
            }
        });

        return columns;
    }

    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Вы уверены, что хотите удалить задание?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk: () => {
                this.props.deleteTask(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    );

    get taskData() {
        return this.props.createdTasks.map((task, idx) => {
            return {
                key: idx,
                number: idx + 1,
                name: task.assignedUserName,
                title: task.title,
                status: task.status,
                id: task.id,
            };
        });
    };


    render() {
        return (
            <Table columns={this.getColumns()} dataSource={this.taskData} size="middle" rowKey={record => record.id}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        createdTasks: Object.values(state.createdTasks),
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchCreatedTaskList,
        deleteTask
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreatedTaskList);
