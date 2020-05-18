import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';

import UserCard from '../UserCard';
import { fetchUser, deleteUser } from '../../../actions/users';
import './User.scss';

class User extends Component {

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    showDeleteConfirm = ({ id, username }) => (
        Modal.confirm({
            title: `Удалить пользователя ${'\u00AB'}${username}${'\u00BB'}`,
            icon: <ExclamationCircleOutlined />,
            content: 'Пользователь будет удален навсегда',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: () => this.props.deleteUser(id),
            onCancel() {
            },
        })
    );

    render() {
        const { user } = this.props;
        if (!user) {
            return null;
        }

        return (
            <Fragment>
                <UserCard user={user}/>
                <Button
                    type="primary"
                    danger
                    onClick={this.showDeleteConfirm.bind(null, user)}
                >
                    Удалить
                </Button>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchUser, deleteUser })(User);
