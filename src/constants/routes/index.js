import productions from './productions';
import warehouses from './warehouses';
import materials from './materials';
import products from './products';
import records from './records';
import events from './events';
import users from './users';

export default {
    login: '/login',
    ...productions,
    ...warehouses,
    ...materials,
    ...products,
    ...records,
    ...events,
    ...users,
};
