import axios from 'axios';
import { getJWT } from '../core/utils/auth';

export default axios.create({
    baseURL: "/erp/api/inventory/records",
    headers: {
        "AuthorizationToken": getJWT(),
    }
});
