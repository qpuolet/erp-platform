import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {createTask} from '../../../actions/tasks';
import { mapFormValues } from '../../../reducers/taskReducer';
import { fetchUserList } from '../../../actions/users';
import TaskForm from "../TaskForm";

class CreateTask extends React.Component {

    static  propTypes = {
        createTask: PropTypes.func,
    };

    componentDidMount() {
        this.props.fetchUserList();
    }

    onSubmit = (formValues, errors) => {
        const formData = {...formValues, status: 'ASSIGNED', ownerUserId:this.props.userId};
        this.props.createTask(mapFormValues(formData));
    };
    render() {
        const {users, userId} = this.props;
        return (
            <div>
                <h3>"Добавить новое задание"</h3>
                <TaskForm
                    onSubmit={this.onSubmit}
                    users={users}
                    userId={userId}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: Object.values(state.users),
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps, { createTask,fetchUserList })(CreateTask);
