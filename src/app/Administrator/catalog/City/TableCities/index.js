import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

class TableCities extends Component {

    getRowsTable = () => {
        return this.props.arrCities.map((item, i) => {
            return (
                <tr key={i}>
                    <th className="oid" scope="row">{item.oid}</th>
                    <td>{item.typeStr}</td>
                    <td>{item.name}</td>
                </tr>
            )
        })
    };

    render() {
        let rows = this.getRowsTable();
        return (
            <Fragment>
                {rows.length ?
                    <table className="table table-sm table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th className="oidTHead" scope="col">oid</th>
                            <th className="width_10" scope="col">Тип</th>
                            <th scope="col">Название</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    :
                    <table className="table table-sm">
                        <thead className="thead-light">
                        <tr>
                            <th className="oidTHead" scope="col">oid</th>
                            <th className="width_10" scope="col">Тип</th>
                            <th scope="col">Название</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="0">
                            <td colSpan="3" className="emptyText">Нет данных!</td>
                        </tr>
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
        arrCities: store.administratorReducer.arrCities,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableCities)