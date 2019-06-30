import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrComponentType} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableComponentTypes from "./TableComponentTypes";
import $ from "jquery";

class ComponentType extends Component {
    state = {
        isLoading: false,//загрузка

        arr: [],

        //для создания
        types: [],
        type: -1,//выбранный в id="typeCmp"
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPICities();
    };

    getAPICities = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_COMPONENTTYPE_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            data = this.sortData(data);
            let tmpTypes = [];
            data.forEach((itemData, i) =>{ tmpTypes.push({name: itemData.name, oid: itemData.oid}) });
            this.setState({arr: data});
            this.setState({types: tmpTypes});
            this.props.setArrComponentTypeFunc(data);
            this.setState({isLoading: false});
        }).catch((error) => {
            console.log(error.message);
        });
    };

    sortData = (data) => {
        data.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        return data;
    };

    search = () => {
        let tmpStr = $('#search').val();
        if (tmpStr === "" || tmpStr === " ") this.props.setArrComponentTypeFunc(this.state.arr);
        else this.filtration();
    };

    filtration = () => {
        let filteredArr = [];
        let regExp = new RegExp($('#search').val());
        this.state.arr.forEach((arrData, arr_i) => {
            let tmpArr = Object.assign({}, arrData);
            tmpArr.components = [];
            arrData.components.forEach((cmData, cm_i) => {
                if (cmData.name.search(regExp) !== -1) {
                    tmpArr.components.push(cmData);
                }
            });
            if (tmpArr.components.length) filteredArr.push(tmpArr);
        });
        this.props.setArrComponentTypeFunc(filteredArr);
    };

    setType = (e) => {
        this.setState({type: e.currentTarget.value});
    };

    //при нажатии кнопки id="btnModal"
    //новый компонент
    btnNewCpm = () => {
        let title = $('#title').val();
        let count = $('#count').val();
        let money = $('#countOne').val();
        let newObject = {};
        if (title === "" || title === " ") return null;
        else {
            newObject = {
                costPerUnit: money,
                name: title,
                numberOnStore: count,
                type: {oid: this.state.type, operation: 0}
            };
            fetch(`${allConst.IP_HOST}${allConst.PATH_COMPONENT_ADD}`, {
                method: 'POST',
                headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
                body: JSON.stringify(newObject),
            }).then(function (response) {
                return response.json();
            }).then(data => {
                window.location.reload();
            }).catch((error) => {
                console.log(error.message);
            });
        }
    };

    //при нажатии кнопки id="btnModal2"
    //новый тип
    btnNewType = () => {
        let title = $('#titleType').val();
        let newObject = {};
        if (title === "" || title === " ") return null;
        else {
            newObject = {name: title};
            fetch(`${allConst.IP_HOST}${allConst.PATH_COMPONENTTYPE_ADD}`, {
                method: 'POST',
                headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
                body: JSON.stringify(newObject),
            }).then(function (response) {
                return response.json();
            }).then(data => {
                window.location.reload();
            }).catch((error) => {
                console.log(error.message);
            });
        }
    };

    render() {
        let itemType = [];
        this.state.types.forEach(function (itemMap, i) {
            itemType.push(<option value={itemMap.oid} key={itemMap.oid}>{itemMap.name}</option>);
        });
        return (
            <Fragment>
                <div id="myModal2" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="headerModal"
                                    className="modal-title"> Создание </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="lastName"> Название типа </label>
                                <input className="form-control" id="titleType" type="search"
                                       placeholder="Введите название" aria-label="Search"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="btnModal2" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.btnNewType}>Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="myModal1" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="headerModal"
                                    className="modal-title"> Создание </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="lastName"> Марка </label>
                                <input className="form-control" id="title" type="search"
                                       placeholder="Введите название" aria-label="Search"/>
                                <label htmlFor="role"> Кол-во на складе </label>
                                <input className="form-control" id="count" type="number"
                                       placeholder="Введите количество" aria-label="Search"/>
                                <label htmlFor="role"> Стоимость единицы </label>
                                <input className="form-control" id="countOne" type="number"
                                       placeholder="Введите количество" aria-label="Search"/>
                                <label htmlFor="role"> Тип </label>
                                <select id="typeCmp" className="form-control" onClick={this.setType}>
                                    {itemType}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="btnModal1" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.btnNewCpm}>Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8 col-xl-5 mt-3">
                            <input id="search" className="form-control" type="search" placeholder="Поиск по названию улиц"
                                   aria-label="Search" onChange={this.search}/>
                        </div>
                        <div className="btn-group col-sm-2 col-xl-3 mt-3">
                            <div className="form-group">
                                <button id="btnNewCpm" className="btn btn-outline-secondary" onClick={this.btnNewCpm} data-toggle="modal" data-target="#myModal1">
                                    <i className="fas fa-plus fa-lg"/> Новая марка
                                </button>
                            </div>
                            <div className="form-group">
                                <button id="btnNewType" className="btn btn-outline-secondary" style={{marginLeft: 10}} onClick={null} data-toggle="modal" data-target="#myModal2">
                                    <i className="fas fa-plus fa-lg"/> Новый тип
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableComponentTypes />}
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
    return {
        setArrComponentTypeFunc: arr => dispatch(setArrComponentType(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentType)