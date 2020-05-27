import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { isEmpty } from 'lodash';

import {
    PRODUCTS,
    MATERIALS,
    PRODUCTION,
    WAREHOUSE,
    STATUS_TYPES,
    ITEM_TYPES,
    LOCATION_TYPES
} from '../../../constants';

const locationTypes = Object.values(LOCATION_TYPES);
const statusTypes = Object.values(STATUS_TYPES);
const itemTypes = Object.values(ITEM_TYPES);

class RecordForm extends Component {
    static defaultProps = {
        items: [],
        initialValues: {
            locationType: locationTypes[0],
            statusType: statusTypes[0],
            itemType: itemTypes[0],
        },
    };

    renderError = ({ error, touched}) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = ({ input, label, meta }) => {
        return (
            <div className='field'>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
            </div>
        );
    };

    renderItemSelect = (type, items) => {
        if (isEmpty(items)) {
            return null;
        }

        switch (type) {
            case PRODUCTS:
                return (
                    <div>
                        <label>Выберите товар</label>
                        <Field
                            onChange={e => this.props.onItemSelect(e)}
                            name="itemId"
                            component="select"
                        >
                            <option />
                            {items.map((product, idx) => (
                                <option
                                    key={idx}
                                    value={product.id}
                                >
                                    {product.title}
                                </option>
                            ))}
                        </Field>
                    </div>
                );
            case MATERIALS:
                return (
                    <div>
                        <label>Выберите сырьё</label>
                        <Field
                            onChange={e => this.props.onItemSelect(e)}
                            name="itemId"
                            component="select"
                        >
                            <option />
                            {items.map((material, idx) => (
                                <option
                                    key={idx}
                                    value={material.id}
                                >
                                    {material.title}
                                </option>
                            ))}
                        </Field>
                    </div>
                );
            default:
                return null;
        }
    };

    renderItemPackingSelect = item => {
      if (isEmpty(item)) {
          return null;
      }

      return (
          <div>
              <label>Выберите фасовку</label>
              <Field
                  name="packing"
                  component="select"
              >
                  <option />
                  {item.packing.map((size, idx) => (
                      <option
                          key={idx}
                          value={size}
                      >
                          {size}
                      </option>
                  ))}
              </Field>
          </div>
      );
    };

    renderItemTypeSelect = () => (
        <div>
            <label>Выберите тип</label>
            <Field
                name="itemType"
                component="select"
                onChange={e => this.props.onItemTypeChange(e)}
                value={this.props.initialValues.itemType}
            >
                {itemTypes.map(({ title, value }, idx) => (
                    <option
                        key={idx}
                        value={value}
                    >
                        {title}
                    </option>
                ))}
            </Field>
        </div>
    );

    renderItemStatusSelect = () => (
        <div>
            <label>Выберите статус</label>
            <Field
                name="statusType"
                component="select"
                value={this.props.initialValues.statusType}
            >
                {statusTypes.map(({ title, value }, idx) => (
                    <option
                        key={idx}
                        value={value}
                    >
                        {title}
                    </option>
                ))}
            </Field>
        </div>
    );

    renderLocationTypeSelect = selectedType => (
        <div>
            <label>Выберите локацию</label>
            <Field
                name="locationType"
                component="select"
                onChange={e => this.props.onLocationTypeChange(e)}
                value={this.props.initialValues.locationType}
            >
                {locationTypes.map(({ title, value }, idx) => (
                    <option
                        key={idx}
                        value={value}
                    >
                        {title}
                    </option>
                ))}
            </Field>
        </div>
    );

    renderLocationSelect = (type, locations) => {
        if (isEmpty(locations)) {
            return null;
        }

        switch (type) {
            case PRODUCTION:
                return (
                    <div>
                        <label>Выберите производство</label>
                        <Field
                            onChange={e => this.props.onLocationSelect(e)}
                            name="locationId"
                            component="select"
                        >
                            <option />
                            {locations.map((production, idx) => (
                                <option
                                    key={idx}
                                    value={production.id}
                                >
                                    {production.title}
                                </option>
                            ))}
                        </Field>
                    </div>
                );
            case WAREHOUSE:
                return (
                    <div>
                        <label>Выберите товар</label>
                        <Field
                            onChange={e => this.props.onLocationSelect(e)}
                            name="locationId"
                            component="select"
                        >
                            <option />
                            {locations.map((warehouse, idx) => (
                                <option
                                    key={idx}
                                    value={warehouse.id}
                                >
                                    {warehouse.title}
                                </option>
                            ))}
                        </Field>
                    </div>
                );
            default:
                return null;
        }
    };

    onSubmit = (formValues, errors) => {
        this.props.onSubmit(formValues);
    };

    render() {
        const { handleSubmit, itemsType, items, selectedItem, locationsType, locations } = this.props;
        return (
            <form
                className="ui form error"
                onSubmit={handleSubmit(this.onSubmit)}
            >
                {this.renderLocationTypeSelect(locationsType)}
                {this.renderLocationSelect(locationsType, locations)}
                {this.renderItemTypeSelect()}
                {this.renderItemSelect(itemsType, items)}
                {this.renderItemPackingSelect(selectedItem)}
                {!isEmpty(selectedItem)
                    ? (
                        <Fragment>
                            <Field
                                name="quantity"
                                component={this.renderInput}
                                label="Введите количество"
                                type="number"
                            />
                            {this.renderItemStatusSelect()}
                        </Fragment>
                    )
                    : null
                }
                <button
                    disabled={isEmpty(selectedItem)}
                    className="ui button primary"
                >
                    Submit
                </button>
            </form>
        );
    }
}

const validate = formValues => {
    return {};
};

export default reduxForm({
    form: 'RecordForm',
    validate,
})(RecordForm);
