import React from 'react';
import { connect } from 'react-redux';

import { fetchMaterial, editMaterial } from '../../../actions/materials';
import { mapFormValues } from '../../../reducers/skuReducer';
import EditSku from '../../Skus/EditSku';

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
        const { title, packing } = this.props.material;

        return (
            <EditSku
                title={title}
                packing={packing}
                onSubmit={this.onSubmit}
            />
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        material: state.materials[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchMaterial, editMaterial })(EditMaterial);
