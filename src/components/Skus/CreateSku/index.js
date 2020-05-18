import React from 'react';
import PropTypes from 'prop-types';

import SkuForm from '../SkuForm';

export default class CreateSku extends React.Component {

    static propTypes = {
        header: PropTypes.string,
        onSubmit: PropTypes.func,
    };

    render() {
        const { header, onSubmit } = this.props;
        return (
            <div>
                <h3>{header}</h3>
                <SkuForm onSubmit={onSubmit} />
            </div>
        );
    }
}
