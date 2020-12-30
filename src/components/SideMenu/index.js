import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    ShoppingOutlined,
    DatabaseOutlined,
    HomeOutlined,
    BankOutlined
} from '@ant-design/icons';

import routes from '../../constants/routes';
import './SideMenu.scss';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { signOut } from '../../actions/auth';
const { SubMenu } = Menu;

class SideMenu extends Component {

    static  propTypes = {
        isUserLoggedIn: PropTypes.bool,
        userRoles: PropTypes.array
    };

    state = { collapsed: false };

    onCollapse = () => (
        this.setState({
            collapsed: !this.state.collapsed
        })
    );

    onSubmit = () => {
        this.props.signOut();
    };

    render() {

        return (
            <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" mode="inline">
                    {!this.props.isUserLoggedIn ? (
                        <Menu.Item key="16">
                            <Link to={routes.login}>
                                <span>Login</span>
                            </Link>
                        </Menu.Item>
                    ) : [
                        <SubMenu
                            key="tasks"
                            title={
                                <span>
                              <MailOutlined />
                                  <span>Задания</span>
                            </span>
                            }
                        >
                            <Menu.Item key="17">
                                <Link to={routes.tasks}>
                                    <span>Задания для меня</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="18">
                                <Link to={routes.createdTasks}>
                                    <span>Мои задания</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="19">
                                <Link to={routes.createTask}>
                                    <span>Добавить</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>,
                            <SubMenu
                                key="products"
                                title={
                                    <span>
                                        <ShoppingOutlined />
                                  <span>Товары</span>
                            </span>
                                }
                            >
                                <Menu.Item key="3">
                                    <Link to={routes.products}>
                                        <span>Все</span>
                                    </Link>
                                </Menu.Item>
                                {this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
                                <Menu.Item key="4">
                                    <Link to={routes.createProduct}>
                                        <span>Добавить</span>
                                    </Link>
                                </Menu.Item>
                                    )}
                            </SubMenu>,
                            <SubMenu
                                key="materials"
                                title={
                                    <span>
                              <DatabaseOutlined />
                                  <span>Сырьё</span>
                            </span>
                                }
                            >
                                <Menu.Item key="5">
                                    <Link to={routes.materials}>
                                        <span>Все</span>
                                    </Link>
                                </Menu.Item>
                                {this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
                                <Menu.Item key="6">
                                    <Link to={routes.createMaterial}>
                                        <span>Добавить</span>
                                    </Link>
                                </Menu.Item>
                                )}
                            </SubMenu>,
                            <SubMenu
                                key="users"
                                title={
                                    <span>
                              <UserOutlined/>
                                  <span>Пользователи</span>
                            </span>
                                }
                            >
                                {this.props.roles.some(role => "ROLE_ADMIN" === role) && (
                                <Menu.Item key="9">
                                    <Link to={routes.users}>
                                        <span>Все</span>
                                    </Link>
                                </Menu.Item>
                                )}
                                <Menu.Item key="20">
                                    <Link to={routes.editUserPassword}>
                                        <span>Изменить</span>
                                    </Link>
                                </Menu.Item>
                                {this.props.roles.some(role => "ROLE_ADMIN" === role) && (
                                <Menu.Item key="10">
                                    <Link to={routes.createUser}>
                                        <span>Добавить</span>
                                    </Link>
                                </Menu.Item>
                                )}
                            </SubMenu>,
                            <SubMenu
                                key="warehouses"
                                title={
                                    <span>
                              <BankOutlined />
                                  <span>Склады</span>
                            </span>
                                }
                            >
                                <Menu.Item key="11">
                                    <Link to={routes.warehouses}>
                                        <span>Все</span>
                                    </Link>
                                </Menu.Item>
                                {this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
                                <Menu.Item key="12">
                                    <Link to={routes.createWarehouse}>
                                        <span>Добавить</span>
                                    </Link>
                                </Menu.Item>
                                )}
                            </SubMenu>,
                            <SubMenu
                                key="productions"
                                title={
                                    <span>
                              <HomeOutlined />
                                  <span>Производства</span>
                            </span>
                                }
                            >
                                <Menu.Item key="13">
                                    <Link to={routes.productions}>
                                        <span>Все</span>
                                    </Link>
                                </Menu.Item>
                                {this.props.roles.some(role => "ROLE_MODERATOR" === role || "ROLE_ADMIN" === role) && (
                                <Menu.Item key="14">
                                    <Link to={routes.createProduction}>
                                        <span>Добавить</span>
                                    </Link>
                                </Menu.Item>
                                )}
                            </SubMenu>,
                            <Menu.Item key="15">
                                <Link to={routes.createRecord}>
                                    <span>Добавить запись</span>
                                </Link>
                            </Menu.Item>,
                        <Menu.Item key="21" data-theme="dark">
                            <input type="submit" onClick={this.onSubmit} style={{background: 'transparent', border: 'none', color: 'white'}} value="Выйти"></input>
                        </Menu.Item>,
                    ]}
                </Menu>
            </Layout.Sider>
        );
    }
}
const mapStateToProps = state => ({
    roles: state.auth.roles,
    isUserLoggedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, {signOut})(SideMenu);

