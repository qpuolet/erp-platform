import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';

import ProductionCard from '../ProductionCard';
import { fetchProduction, deleteProduction } from '../../../actions/productions';
import './Productions.scss';

class EditProduction extends Component {

    componentDidMount() {
        this.props.fetchProduction(this.props.match.params.id);
    }

    showDeleteConfirm = ({ id, title }) => (
        Modal.confirm({
            title: `Удалить производство ${'\u00AB'}${title}${'\u00BB'}`,
            icon: <ExclamationCircleOutlined />,
            content: 'Производство будет удалено навсегда',
            okText: 'Удалить',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: () => this.props.deleteProduction(id),
            onCancel() {
            },
        })
    );

    render() {
        const { production } = this.props;
        if (!production) {
            return null;
        }

        return (
            <Fragment>
                <ProductionCard production={production}/>
                <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
                <Button
                    type="primary"
                    danger
                    onClick={this.showDeleteConfirm.bind(null, production)}
                >
                    Удалить
                </Button>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        production: state.productions[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchProduction, deleteProduction })(EditProduction);
