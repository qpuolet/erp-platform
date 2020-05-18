import React from 'react';
import PropTypes from 'prop-types';

import SkuForm from '../SkuForm';

export default class EditProduct extends React.Component {

    static propTypes = {
        header: PropTypes.string,
        title: PropTypes.string,
        packing: PropTypes.array,
        onSubmit: PropTypes.func,
    };

    render() {
        const { title, packing, header, onSubmit } = this.props;

        return (
            <div>
                <h3>{header}</h3>
                <SkuForm
                    onSubmit={onSubmit}
                    initialValues={{
                        title,
                        packing: packing.join(', ')
                    }}
                />
            </div>
        );
    }
}
