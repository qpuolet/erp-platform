import productions from './productions';
import warehouses from './warehouses';
import materials from './materials';
import products from './products';
import records from './records';
import events from './events';
import users from './users';
import tasks from './tasks';

export default {
    login: '/login',
    ...productions,
    ...warehouses,
    ...materials,
    ...products,
    ...records,
    ...events,
    ...users,
    ...tasks,
};
