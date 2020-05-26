import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';

import routes from '../../constants/routes';
import './SideMenu.scss';
const { SubMenu } = Menu;

export default class SideMenu extends Component {

    state = { collapsed: false };

    onCollapse = () => (
        this.setState({
            collapsed: !this.state.collapsed
        })
    );

    render() {

        return (
            <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" mode="inline">
                    <SubMenu
                        key="products"
                        title={
                            <span>
                              <UserOutlined/>
                                  <span>Товары</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3">
                            <Link to={routes.products}>
                                <span>Все</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={routes.createProduct}>
                                <span>Добавить</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="materials"
                        title={
                            <span>
                              <UserOutlined/>
                                  <span>Сырьё</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to={routes.materials}>
                                <span>Все</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={routes.createMaterial}>
                                <span>Добавить</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="events"
                        title={
                            <span>
                              <UserOutlined/>
                                  <span>Задачи</span>
                            </span>
                        }
                    >
                        <Menu.Item key="7">
                            <Link to={routes.events}>
                                <span>Все</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to={routes.createEvent}>
                                <span>Добавить</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="users"
                        title={
                            <span>
                              <UserOutlined/>
                                  <span>Пользователи</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9">
                            <Link to={routes.users}>
                                <span>Все</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link to={routes.createUser}>
                                <span>Добавить</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="warehouses"
                        title={
                            <span>
                              <UserOutlined/>
                                  <span>Склады</span>
                            </span>
                        }
                    >
                        <Menu.Item key="11">
                            <Link to={routes.warehouses}>
                                <span>Все</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="12">
                            <Link to={routes.createWarehouse}>
                                <span>Добавить</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="productions"
                        title={
                            <span>
                              <UserOutlined/>
                                  <span>Производства</span>
                            </span>
                        }
                    >
                        <Menu.Item key="13">
                            <Link to={routes.productions}>
                                <span>Все</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="14">
                            <Link to={routes.createProduction}>
                                <span>Добавить</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="15">
                        <Link to={routes.createRecord}>
                            <span>Добавить запись</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        );
    }
}
