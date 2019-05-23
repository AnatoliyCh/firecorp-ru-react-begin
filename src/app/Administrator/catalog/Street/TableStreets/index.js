import React, {Component, Fragment} from 'react';
import * as allConst from "../../../../commonComponents/Const";
import {setArrayStreet} from "../../../Reducer";
import {connect} from "react-redux";

class TableStreets extends Component {

    getRowsTable = () => {
        return this.props.arrStreet.map((item, i) => {
            return (
                <tr key={i}>
                    <th className="oid" scope="row">{item.oid}</th>
                    <td className="type">{item.typeStr}</td>
                    <td>{item.name}</td>
                </tr>
            )
        })
    };

    render() {
        let rows = this.getRowsTable();
        return (
            <Fragment>
                {
                    rows.length ?
                        <table className="table table-sm table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th className="oidTHead" scope="col">oid</th>
                                <th scope="col">Тип</th>
                                <th scope="col">Название</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table> :
                        <p> Нет данных! </p>
                }
            </Fragment>
        )
    }

}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        arrStreet: store.administratorReducer.arrStreet,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrStreetFunc: arr => dispatch(setArrayStreet(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableStreets)