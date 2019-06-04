import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

class TableJobTypes extends Component {

    getRowsTable = () => {
        return this.props.arrJobType.map((item, i) => {
            return (
                <tr key={i}>
                    <th className="oid" scope="row">{item.oid}</th>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.duration}</td>
                    <td>{item.costPerUnit}</td>
                    <td>{this.getServiceInterval(item.serviceInterval)}</td>
                    <td>{item.needPhoto ? "Да" : "Нет"}</td>
                </tr>
            )
        })
    };

    getServiceInterval = (interval) => {
        if (interval === 0) return "Разовый";
        else if (interval === 1) return "Eжемесячно";
        else if (interval >= 2) return interval + " мес.";
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
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Продолжительность (мин)</th>
                            <th scope="col">Стоимость единицы (руб)</th>
                            <th scope="col">Периодичность</th>
                            <th scope="col">Необходимо фотографировать</th>
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
                            <th scope="col">Описание</th>
                            <th scope="col">Продолжительность (мин)</th>
                            <th scope="col">Стоимость единицы (руб)</th>
                            <th scope="col">Периодичность</th>
                            <th scope="col">Необходимо фотографировать</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="0">
                            <td colSpan="8" className="emptyText">Нет данных!</td>
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
        arrJobType: store.administratorReducer.arrJobType,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableJobTypes)