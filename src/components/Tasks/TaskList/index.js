import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table } from 'antd';

import {
    fetchTaskList,
    editTaskStatus
} from '../../../actions/tasks';

class TaskList extends Component {

    componentDidMount() {
        this.props.fetchTaskList(this.props.userId);

    }

    onChange = (id, status) => {
        this.props.editTaskStatus(
            id,
            status
        );
    };

    getColumns() {
        let columns = [
            {
                title: '#',
                dataIndex: 'number',
            },
            {
                title: 'Создатель задания',
                dataIndex: 'name',
            },
            {
                title: 'Задание',
                dataIndex: 'title',
            }
        ];
        columns.push({

            title: 'Статус',
            key: 'editStatus',
            render:(record) =>(
                <select
                    name="status"
                    label="Выберете статус"
                    onChange={e => this.onChange(record.id ,e.target.value)}
                >
                    <option value="ASSIGNED" selected={"ASSIGNED"===record.status}>ASSIGNED</option>
                    <option value="IN_PROGRESS" selected={"IN_PROGRESS"===record.status}>IN_PROGRESS</option>
                    <option value="DONE" selected={"DONE"===record.status}>DONE</option>
                    <option value="ON_HOLD" selected={"ON_HOLD"===record.status}>ON_HOLD</option>
                </select>
            )
        });

        return columns;
    }
    get taskData() {
        return this.props.tasks.map((task, idx) => {
            return {
                key: idx,
                number: idx + 1,
                name: task.ownerName,
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
        tasks: Object.values(state.tasks),
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchTaskList,
        editTaskStatus
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
