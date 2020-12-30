import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Card } from 'antd';


import { fetchRecordList, deleteRecord } from '../../../actions/records';

class Record extends Component {

    static propTypes = {
        record: PropTypes.object,
        fetchRecordList: PropTypes.func,
        deleteRecord: PropTypes.func,
    };

    componentDidMount() {
        this.props.fetchRecordList();
    }

    render() {
        const record = this.props.records[this.props.match.params.id];

        if (!record) {
            return null;
        }

        console.log(record);
        return (
            <Card
                type="inner"
                title={record.title}
            >
                {Object.keys(record).map(key => {
                    return (<p>{`${key}: ${record[key]}`}</p>)
                })}
            </Card>
        )
    }
}

const mapStateToProps = state => ({
  records: state.records,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchRecordList,
        deleteRecord,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Record);
