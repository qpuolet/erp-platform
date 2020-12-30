import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProductionList, deleteProduction } from '../../../actions/productions';
import routes from '../../../constants/routes/productions';
import ProductionCard from '../ProductionCard';
import './ProductionList.scss';

class ProductionList extends Component {

    componentDidMount() {
        this.props.fetchProductionList();
    }

    get routes() {
        return {
            editProd: routes.editProduction,
        };
    }

    render() {
        const { productions, deleteProduction } = this.props;
        return (
            <Fragment>
                <h3>Список производств</h3>
                {productions.map((production, idx) => (
                    <ProductionCard
                        key={idx}
                        production={production}
                        showMoreLink
                        routes={this.routes}
                        deleteProd={deleteProduction}
                        roles={this.props.roles}
                    />
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        productions: Object.values(state.productions),
        roles: state.auth.roles,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchProductionList,
        deleteProduction
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductionList);
