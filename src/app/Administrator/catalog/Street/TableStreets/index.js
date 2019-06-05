import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {setArrStreet, setSortHeader} from "../../../Reducer";

class TableStreets extends Component {
    state = {
        headersMap: new Map([
            [0, {name: "oid", th: "oid", sortMode: "no"}],
            [1, {name: "Тип", th: "type",sortMode: "no"}],
            [2, {name: "Название" ,th: "name", sortMode: "no"}],
        ]),
    };

    getRowsTable = () => {
        return this.props.arrStreet.map((item, i) => {
            return (
                <tr key={i}>
                    <th className="oid" scope="row">{item.oid}</th>
                    <td>{item.typeStr}</td>
                    <td>{item.name}</td>
                </tr>
            )
        })
    };

    sort = (e) => {
        e.preventDefault();
        let tmpHeadersMap = this.state.headersMap;
        let tmpArrStreet = this.props.arrStreet;
        switch (e.currentTarget.id) {
            case this.state.headersMap.get(0).th:
                if (tmpHeadersMap.get(0).sortMode === "up") {
                    tmpHeadersMap.get(0).sortMode = "down";
                    tmpHeadersMap.get(1).sortMode = "no";
                    tmpHeadersMap.get(2).sortMode = "no";
                    this.props.setSortHeaderStreetFunc(this.state.headersMap.get(0).th, "down");
                    tmpArrStreet.sort((a, b) => {
                        return a.oid > b.oid ? 1 : -1;
                    });
                    tmpArrStreet.reverse();
                }
                else {
                    tmpHeadersMap.get(0).sortMode = "up";
                    tmpHeadersMap.get(1).sortMode = "no";
                    tmpHeadersMap.get(2).sortMode = "no";
                    this.props.setSortHeaderStreetFunc(this.state.headersMap.get(0).th, "up");
                    tmpArrStreet.sort((a, b) => {
                        return a.oid > b.oid ? 1 : -1;
                    });
                }
                break;
            case this.state.headersMap.get(1).th:
                if (tmpHeadersMap.get(1).sortMode === "up") {
                    tmpHeadersMap.get(0).sortMode = "no";
                    tmpHeadersMap.get(1).sortMode = "down";
                    tmpHeadersMap.get(2).sortMode = "no";
                    this.props.setSortHeaderStreetFunc(this.state.headersMap.get(1).th, "down");
                    tmpArrStreet.sort((a, b) => {
                        return a.typeStr.toLowerCase() > b.typeStr.toLowerCase() ? 1 : -1;
                    });
                    tmpArrStreet.reverse();
                }
                else {
                    tmpHeadersMap.get(0).sortMode = "no";
                    tmpHeadersMap.get(1).sortMode = "up";
                    tmpHeadersMap.get(2).sortMode = "no";
                    this.props.setSortHeaderStreetFunc(this.state.headersMap.get(1).th, "up");
                    tmpArrStreet.sort((a, b) => {
                        return a.typeStr.toLowerCase() > b.typeStr.toLowerCase() ? 1 : -1;
                    });
                }
                break;
            case this.state.headersMap.get(2).th:
                if (tmpHeadersMap.get(2).sortMode === "up") {
                    tmpHeadersMap.get(0).sortMode = "no";
                    tmpHeadersMap.get(1).sortMode = "no";
                    tmpHeadersMap.get(2).sortMode = "down";
                    this.props.setSortHeaderStreetFunc(this.state.headersMap.get(2).th, "down");
                    tmpArrStreet.sort((a, b) => {
                        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                    });
                    tmpArrStreet.reverse();
                }
                else {
                    tmpHeadersMap.get(0).sortMode = "no";
                    tmpHeadersMap.get(1).sortMode = "no";
                    tmpHeadersMap.get(2).sortMode = "up";
                    this.props.setSortHeaderStreetFunc(this.state.headersMap.get(2).th, "up");
                    tmpArrStreet.sort((a, b) => {
                        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                    });
                }
                break;
            default:
                break;
        }
        this.setState({headersMap: tmpHeadersMap});
        this.props.setArrStreetFunc(tmpArrStreet);
    };

    render() {
        let rows = this.getRowsTable();
        let arrow_oidMode = this.state.headersMap.get(0).sortMode;
        let arrow_TypeMode = this.state.headersMap.get(1).sortMode;
        let arrow_NameMode = this.state.headersMap.get(2).sortMode;
        let arrowOid = arrow_oidMode === "no" ? null : arrow_oidMode === "up" ? <i className="fas fa-angle-up"> </i> : <i className="fas fa-angle-down"> </i>;
        let arrowType = arrow_TypeMode === "no" ? null : arrow_TypeMode === "up" ? <i className="fas fa-angle-up"> </i> : <i className="fas fa-angle-down"> </i>;
        let arrowName = arrow_NameMode === "no" ? null : arrow_NameMode === "up" ? <i className="fas fa-angle-up"> </i> : <i className="fas fa-angle-down"> </i>;

        return (
            <Fragment>
                {rows.length ?
                    <table id="tblStreets" className="table table-sm table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th id={this.state.headersMap.get(0).th} className="oidTHead tableHeader" scope="col"
                                onClick={this.sort}>{this.state.headersMap.get(0).name} {arrowOid}</th>
                            <th id={this.state.headersMap.get(1).th} className="width_10 tableHeader" scope="col"
                                onClick={this.sort}>{this.state.headersMap.get(1).name} {arrowType}</th>
                            <th id={this.state.headersMap.get(2).th} className="tableHeader" scope="col"
                                onClick={this.sort}>{this.state.headersMap.get(2).name} {arrowName}</th>
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
        arrStreet: store.administratorReducer.arrStreet,
        sortHeaderStreet: store.administratorReducer.sortHeaderStreet,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrStreetFunc: arr => dispatch(setArrStreet(arr)),
        setSortHeaderStreetFunc: (th,mode) => dispatch(setSortHeader(th, mode)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableStreets)