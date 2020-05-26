export const WAREHOUSE = 'warehouses';
export const PRODUCTION = 'productions';
export const PRODUCTS = 'products';
export const MATERIALS = 'materials';

export const LOCATION_TYPES = {
    [PRODUCTION]: {
        title: 'Производство',
        value: PRODUCTION
    },
    [WAREHOUSE]: {
        title: 'Склад',
        value: WAREHOUSE
    },
};

export const ITEM_TYPES = {
  [PRODUCTS]: {
      title: 'Товар',
      value: PRODUCTS,
  },
  [MATERIALS]: {
      title: 'Сырьё',
      value: MATERIALS,
  },
};

const ON_THE_WAY = 'ON_THE_WAY';
const READY = 'READY';
const WAITING = 'WAITING';

export const STATUS_TYPES = {
    [ON_THE_WAY]: {
        title: 'В пути',
        value: ON_THE_WAY
    },
    [READY]: {
        title: 'Готово',
        value: READY
    },
    [WAITING]: {
        title: 'Ожидает',
        value: WAITING
    },
};
