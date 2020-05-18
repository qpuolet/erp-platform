import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from "antd";
import { EditOutlined } from '@ant-design/icons';

import { fetchUserList } from '../../../actions/users';
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
                    title: 'Статус',
                    dataIndex: 'packing',
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

    get usersData() {
        return this.props.users.map((user, idx) => {
            return {
                key: idx,
                number: idx + 1,
                name: (
                    <Link to={`${routes.user}${user.id}`}>{user.username}</Link>
                ),
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
                <h3>Список пользователей</h3>
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
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
