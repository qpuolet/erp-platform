import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import history from '../history';
import PrivateRoute from './PrivateRoute';
import LogIn from './Auth/LogIn';
import WarehouseList from './Warehouses/WarehouseList';
import CreateWarehouse from './Warehouses/CreateWarehouse';
import EditWarehouse from './Warehouses/EditWarehouse';
import Warehouse from './Warehouses/Warehouse';
import ProductionList from './Productions/ProductionList';
import CreateProduction from './Productions/CreateProduction';
import Production from './Productions/Production';
import EditProduction from './Productions/EditProduction';
import ProductList from './Products/ProductList';
import CreateProduct from './Products/CreateProduct';
import EditProduct from './Products/EditProduct';
import MaterialList from './Materials/MaterialList';
import CreateMaterial from './Materials/CreateMaterial';
import EditMaterial from './Materials/EditMaterial';
import EventList from './Events/EventList';
import CreateEvent from './Events/CreateEvent';
import Event from './Events/Event';
import UserList from './Users/UserList';
import CreateUser from './Users/CreateUser';
import EditUser from './Users/EditUser';
import EditUserPassword from './Users/EditUserPassword';
import Record from './Records/Record';
import CreateRecord from './Records/CreateRecord';
import TransferRecord from './Records/TransferRecord';
import SideMenu from './SideMenu';
import routes from '../constants/routes';
import TaskList from './Tasks/TaskList';
import CreatedTaskList from './Tasks/CreatedTaskList';
import EditTask from './Tasks/EditTask';
import CreateTask from './Tasks/CreateTask';
import './App.scss';

const { Header, Content } = Layout;

export default function App() {

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Router history={history}>
                <SideMenu />
                {/*<LogIn />*/}
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Switch>
                                <PrivateRoute path={routes.warehouses} exact component={WarehouseList}/>
                                <PrivateRoute path={routes.createWarehouse} component={CreateWarehouse}/>
                                <PrivateRoute path={`${routes.warehouse}:id`} component={Warehouse}/>
                                <PrivateRoute path={routes.productions} exact component={ProductionList}/>
                                <PrivateRoute path={routes.createProduction} component={CreateProduction}/>
                                <PrivateRoute path={`${routes.production}:id`} component={Production}/>
                                <PrivateRoute path={routes.production} component={Production}/>
                                <PrivateRoute path={routes.createProduct} component={CreateProduct}/>
                                <PrivateRoute path={`${routes.editProduct}:id`} component={EditProduct}/>
                                <PrivateRoute path={routes.products} component={ProductList}/>
                                <PrivateRoute path={routes.createMaterial} component={CreateMaterial}/>
                                <PrivateRoute path={`${routes.editMaterial}:id`} component={EditMaterial}/>
                                <PrivateRoute path={routes.materials} component={MaterialList}/>
                                <PrivateRoute path={routes.events} component={EventList}/>
                                <PrivateRoute path={routes.createEvent} component={CreateEvent}/>
                                <PrivateRoute path={`${routes.event}:id`} component={Event}/>
                                <PrivateRoute path={routes.users} component={UserList}/>
                                <PrivateRoute path={routes.createUser} component={CreateUser}/>
                                <PrivateRoute path={routes.editUserPassword} component={EditUserPassword}/>
                                <PrivateRoute path={`${routes.editUser}:id`} component={EditUser}/>
                                <PrivateRoute path={`${routes.records}:id`} component={Record}/>
                                <PrivateRoute path={`${routes.createRecord}`} component={CreateRecord}/>
                                <PrivateRoute path={`${routes.transferRecord}:id`} component={TransferRecord}/>
                                <Route path={routes.login} component={LogIn}/>
                                <PrivateRoute path={`${routes.editProduction}:id`} component={EditProduction}/>
                                <PrivateRoute path={`${routes.editWarehouse}:id`} component={EditWarehouse}/>
                                <PrivateRoute path={`${routes.editWarehouse}:id`} component={EditWarehouse}/>
                                <PrivateRoute path={`${routes.editTask}:id`} component={EditTask}/>
                                <PrivateRoute path={routes.createTask} component={CreateTask}/>
                                <PrivateRoute path={routes.tasks} component={TaskList}/>
                                <PrivateRoute path={routes.createdTasks} component={CreatedTaskList}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Router>
        </Layout>
    );
}
