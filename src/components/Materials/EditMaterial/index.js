import React from 'react';
import { connect } from 'react-redux';

import { fetchMaterial, editMaterial } from '../../../actions/materials';
import { mapFormValues } from '../../../reducers/skuReducer';
import MaterialForm from "../MaterialsForm";

class EditMaterial extends React.Component {

    componentDidMount() {
        this.props.fetchMaterial(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editMaterial(
            this.props.match.params.id,
            mapFormValues(formValues)
        );
    };

    render() {
        if (!this.props.material) {
            return null;
        }
        const { title, packing, header } = this.props.material;

        return (
            <div>
                <h3>{header}</h3>
                <MaterialForm
                    onSubmit={this.onSubmit}
                    initialValues={{
                        title,
                        packing: packing.join(', ')
                    }}
                />
            </div>
        );
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        material: state.materials[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchMaterial, editMaterial })(EditMaterial);
