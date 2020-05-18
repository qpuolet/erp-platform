import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProductionList } from '../../../actions/productions';
import routes from '../../../constants/routes/productions';
import ProductionCard from '../ProductionCard';
import './ProductionList.scss';

class ProductionList extends Component {

    componentDidMount() {
        this.props.fetchProductionList();
    }

    render() {
        const { productions } = this.props;
        return (
            <Fragment>
                <h3>Список складов</h3>
                {productions.map((production, idx) => (
                    <ProductionCard
                        key={idx}
                        production={production}
                        showMoreLink
                    />
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        productions: Object.values(state.productions),
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchProductionList,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductionList);
