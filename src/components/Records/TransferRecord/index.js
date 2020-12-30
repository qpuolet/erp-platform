import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductionList } from '../../../actions/productions';
import { fetchWarehouseList } from '../../../actions/warehouses';
import { transferRecord } from '../../../actions/records';
import routes from "../../../constants/routes";
import {mapTransferFormValues} from "../../../reducers/recordsReducer";

class TransferRecord extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            warehouseIdToTransfer : '',
            productionIdToTransfer : '',
            quantityToTransfer : ''
        }

        this.updateInput = this.updateInput.bind(this);
        this.updateWarehouseSelect = this.updateWarehouseSelect.bind(this);
        this.updateProductionSelect = this.updateProductionSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchProductionList();
        this.props.fetchWarehouseList();
    }

    updateInput(event){
        console.log('change input: ' + event.target.value)
        this.setState({quantityToTransfer : event.target.value})
    }

    updateWarehouseSelect (event) {
        console.log('change warehouse: ' + event.target.value)
        this.setState({warehouseIdToTransfer : event.target.value})
    };
    updateProductionSelect (event) {
        console.log('change prod: ' + event.target.value)
        this.setState({productionIdToTransfer : event.target.value})
    };

    handleSubmit(){
        console.log('Your quantity input value is: ' + this.state.quantityToTransfer)
        console.log('Your productionId input value is: ' + this.state.productionIdToTransfer)
        console.log('Your warehouseId input value is: ' + this.state.warehouseIdToTransfer)

        this.props.transferRecord(
            mapTransferFormValues(this.props.record, this.state.quantityToTransfer),
            this.state.productionIdToTransfer,
            this.state.warehouseIdToTransfer,
            this.route(this.props.record)
        );
//Send state to the server code
    }

    route(record) {
        return this.state.warehouseIdToTransfer ? `${routes.warehouse}${this.state.warehouseIdToTransfer}`:
            this.state.productionIdToTransfer ? `${routes.production}${this.state.productionIdToTransfer}`:
                record.productionId ? `${routes.production}${record.productionId}`:`${routes.warehouse}${record.warehouseId}`
    }

    render() {
        const { quantity, warehouseId, productionId} = this.props.record;
        const {productions, warehouses} = this.props;

        return (
            <div>
                <h3>Отправить</h3>
                <div>
                    Введите желаемое количество, меньшее {quantity}:
                    <br/>
                    <input type="text" onChange={this.updateInput}></input>
                    <br/>
                    Выберете направление отправки:
                    {warehouseId ?
                        <select
                            name="production"
                            label="Выберете производство"
                            onChange={this.updateProductionSelect}
                        >
                            <option value='' key='1'>Отгрузить клиенту</option>
                            {productions.map((production, idx) => <option value={production.id} key={idx}>{production.title}</option>)}
                        </select>
                        : <select
                            name="warehouse"
                            label="Выберете склад"
                            onChange={this.updateWarehouseSelect}
                        >
                            <option value='' key='1'>Отгрузить</option>
                            {warehouses.map((warehouse, idx) => <option value={warehouse.id} key={idx}>{warehouse.title}</option>)}
                        </select>
                    }
                    <br/>
                    <br/>
                    <input type="submit" onClick={this.handleSubmit}></input>
                    <br/>
                    <br/>
                    <Link to={warehouseId ? `${routes.warehouse}${warehouseId}`:`${routes.production}${productionId}`}>Отменить</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        record: state.records[ownProps.match.params.id],
        warehouses: Object.values(state.warehouses),
        productions: Object.values(state.productions)
    };
};

export default connect(mapStateToProps, { fetchProductionList, fetchWarehouseList, transferRecord })(TransferRecord);
