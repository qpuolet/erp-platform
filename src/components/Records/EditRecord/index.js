import React from 'react';
import PropTypes from 'prop-types';

import RecordForm from '../RecordForm';

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
                <RecordForm
                    onSubmit={onSubmit}
                    initialValues={{
                        title,
                        // packing: packing.join(', ')
                    }}
                />
            </div>
        );
    }
}
