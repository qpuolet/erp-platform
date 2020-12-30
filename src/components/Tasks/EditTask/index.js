import React from 'react';
import { connect } from 'react-redux';

import { fetchTask, editTask } from '../../../actions/tasks';
import { mapFormValues } from '../../../reducers/taskReducer';
import TaskForm from "../TaskForm";
import { fetchUserList } from '../../../actions/users';

class EditTask extends React.Component {

    componentDidMount() {
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchUserList();
    }

    onSubmit = formValues => {
        this.props.editTask(
            this.props.match.params.id,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.createdTask) {
            return null;
        }
        const { assignedUserName, title, status} = this.props.createdTask;
        const {users} = this.props;

        return (
            <div>
                <h3>"Изменить данные задания"</h3>
                <TaskForm
                    onSubmit={this.onSubmit}
                    users={users}
                    initialValues={{
                        assignedUserName,
                        title,
                        status
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        createdTask: state.createdTasks[ownProps.match.params.id],
        users: Object.values(state.users)
    };
};

export default connect(mapStateToProps, { fetchTask, editTask, fetchUserList })(EditTask);
