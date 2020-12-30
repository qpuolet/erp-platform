import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

import { fetchUserList,deleteUser } from '../../../actions/users';
import routes from '../../../constants/routes/users';
import './UserList.scss';

class UserList extends Component {

    componentDidMount() {
        this.props.fetchUserList();
    }

    get columns() {
        return (
            [
                {
                    title: '#',
                    dataIndex: 'number',
                },
                {
                    title: 'Имя',
                    dataIndex: 'name',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'delete',
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
                            <Link to={`${routes.editUser}${id}`}>
                                <EditOutlined/>
                            </Link>
                        );
                    }
                },
            ]
        );
    }
    showDeleteConfirm = id => (
        Modal.confirm({
            title: 'Вы уверены, что хотите удалить пользователя?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk: () => {
                this.props.deleteUser(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    );

    get usersData() {
        return this.props.users.map((user, idx) => {
            return {
                key: idx,
                number: idx + 1,
                name: (
                    <Link to={`${routes.user}${user.id}`}>{user.username}</Link>
                ),
				email: user.email,
                id: user.id,
            };
        });
    };

    renderTable = () => (
        <Table columns={this.columns} dataSource={this.usersData} size="middle"/>
    );

    render() {
        return (
            <Fragment>
                <h3>Список всех пользователей</h3>
                {this.renderTable()}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: Object.values(state.users),
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchUserList,
        deleteUser
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
