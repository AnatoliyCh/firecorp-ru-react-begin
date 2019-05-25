import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

class TableComponentTypes extends Component {

    getTables = () => {
        return this.props.arrComponentType.map((item, i) => {
            return (
                <table key={i} className="table table-sm table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th className="middleColumn" scope="col">oid: {item.oid}</th>
                        <th colSpan="3" className="width_10" scope="col">Тип: {item.name}</th>
                    </tr>
                    </thead>
                    <thead className="thead-light">
                    <tr>
                        <th className="oidTHead" scope="col">oid</th>
                        <th scope="col">Марка</th>
                        <th className="width_10" scope="col">Количество на складе</th>
                        <th className="width_10" scope="col">Стоимость единицы</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getRowsTable(item.components)}
                    </tbody>
                </table>
            )
        })
    };

    getRowsTable = (data) => {
        return data.map((item, i) => {
            return (
                <tr key={i}>
                    <th className="oid" scope="row">{item.oid}</th>
                    <td>{item.name}</td>
                    <td>{item.numberOnStore}</td>
                    <td>{item.costPerUnit}</td>
                </tr>
            )
        })
    };

    render() {
        let tables = this.getTables();
        return (
            <Fragment>
                {tables.length ?
                    tables
                    :
                    <table className="table table-sm">
                        <thead className="thead-light">
                        <tr>
                            <th className="emptyText" scope="col">Нет данных!</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                }
            </Fragment>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        arrComponentType: store.administratorReducer.arrComponentType,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponentTypes)