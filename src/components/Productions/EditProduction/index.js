import React from 'react';
import { connect } from 'react-redux';

import { fetchProduction, editProduction } from '../../../actions/productions';
import { mapFormValues } from '../../../reducers/productionsReducer';
import ProductionForm from "../ProductionForm";

class EditProduction extends React.Component {

    componentDidMount() {
        this.props.fetchProduction(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editProduction(
            this.props.match.params.id,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.production) {
            return null;
        }
        const { title} = this.props.production;

        return (
            <div>
                <h3>"Изменить производство"</h3>
                <ProductionForm
                    onSubmit={this.onSubmit}
                    initialValues={{
                        title
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        production: state.productions[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchProduction, editProduction })(EditProduction);
