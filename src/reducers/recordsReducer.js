import {
    FETCH_RECORD_LIST,
    FETCH_RECORD,
    CREATE_RECORD,
    EDIT_RECORD,
    DELETE_RECORD,
} from '../actions/records';
import { omit } from 'lodash';
import { PRODUCTS, MATERIALS, WAREHOUSE, PRODUCTION } from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_RECORD_LIST:
            let mappedRecords = {};
            Object.keys(action.payload).forEach(
                i => {
                    mappedRecords = { ...mappedRecords, [action.payload[i].id]: action.payload[i]}
                }
            );
            return { ...state, ...mappedRecords };
        case CREATE_RECORD:
        case FETCH_RECORD:
        case EDIT_RECORD:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_RECORD:
            return omit(state, action.payload);
        default:
            return state;
    }
}

export const mapFormValues = (formValues, item, itemType, location, locationType) => {
    let locations = {};
    let ids = {
        productId: null,
        rawMaterialId: null,
    };

    if (itemType === MATERIALS) {
        ids.rawMaterialId = formValues.itemId;
    }
    if (itemType === PRODUCTS) {
        ids.productId = formValues.itemId;
        ids.rawMaterialId = item.rawMaterialId;
    }
    if (locationType === PRODUCTION) {
        locations.productionId = location.id;
    }
    if (locationType === WAREHOUSE) {
        locations.warehouseId = location.id;
    }

    return {
        ...ids,
        ...locations,
        quantity: formValues.quantity,
        packing: formValues.packing,
        units: formValues.packing ? 'GRAND' : 'KILOGRAM',
        status: formValues.statusType,
    };
};

export const mapUpdatedFormValues = ({ packing, quantity = '' }) => {
    return {
        packing,
        quantity,
    }
};

export const mapOnChangeFormValues = (formValues, status) => {
    return {
        id:formValues.id,
        rawMaterialId:formValues.rawMaterialId,
        packing:formValues.packing,
        quantity:formValues.quantity,
        units:formValues.units,
        warehouseId:formValues.warehouseId,
        productId:formValues.productId,
        productionId:formValues.productionId,
        status: status,
        total: null,
        title: null
    };
};

export const mapTransferFormValues = (formValues, quantity) => {
    return {
        ...formValues,
        quantity:quantity,
    };
};

export const getProducts = records => Object.values(records).filter(record => record.productId);

export const getMaterials = records => Object.values(records).filter(record => !record.productId);
