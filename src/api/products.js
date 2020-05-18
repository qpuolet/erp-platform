import axios from 'axios';
import { getJWT } from '../core/utils/auth';

export default axios.create({
    baseURL: "/erp/api/products",
    headers: {
        "AuthorizationToken": getJWT(),
    }
});
