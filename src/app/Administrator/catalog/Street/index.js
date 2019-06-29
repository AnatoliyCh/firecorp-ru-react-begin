import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import $ from 'jquery';
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrStreet} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableStreets from "./TableStreets";

let typeStreet = new Map([
    [16, "Улица"],
    [32, "Проспект"],
    [48, "Шоссе"],
]);

class Street extends Component {
    state = {
        isLoading: false,//загрузка
        arrStreet: [],//массив всех сущностей
        isUpdate: false,//обновление данных
        isSearch: false, //поиск


        //для создания
        type: 16,
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIStreets();
    };

    getAPIStreets = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_STREETS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({arrStreet: this.sortData(data)});//сохраняем полный массив
            if (this.state.isSearch) this.props.setArrStreetFunc(this.filtration());//если поиск то фильтруем и показываем
            else this.props.setArrStreetFunc(this.state.arrStreet);//иначе показываем полный массив
            setTimeout(this.updateStreets, allConst.getTiming(2));//подключаем обновление списка
            this.setState({isLoading: false});
        }).catch((error) => {
            console.log(error.message);
            setTimeout(this.getAPIStreets, allConst.getTiming(1));
            this.setState({isLoading: false});
        });
    };

    updateStreets = () => {
        console.log("updateStreets");
        this.setState({isUpdate: true});
        fetch(`${allConst.IP_HOST}${allConst.PATH_STREETS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({arrStreet: this.sortData(data)});
            if (this.state.isSearch) this.props.setArrStreetFunc(this.filtration());
            else this.props.setArrStreetFunc(this.state.arrStreet);
            setTimeout(this.updateStreets, allConst.getTiming(2));
            this.setState({isUpdate: false});
        }).catch((error) => {
            console.log(error.message);
            setTimeout(this.getAPIStreets, allConst.getTiming(1));
            this.setState({isUpdate: false});
        });
    };

    sortData = (data) => {
        data.forEach(function (itemData, iData) {
            itemData.typeStr = typeStreet.get(itemData.type);
        });
        if (this.props.sortHeaderStreet[0] === "oid") data.sort((a, b) => { return a.oid > b.oid ? 1 : -1; });
        else if (this.props.sortHeaderStreet[0] === "type") data.sort((a, b) => { return a.typeStr.toLowerCase() > b.typeStr.toLowerCase() ? 1 : -1; });
        else if (this.props.sortHeaderStreet[0] === "name") data.sort((a, b) => {  return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1; });
        if (this.props.sortHeaderStreet[1] === "down") data.reverse();
        return data;
    };

    search = () => {
        let tmpStr = $('#search').val();
        if (tmpStr === "" || tmpStr === " ") {
            this.setState({isSearch: false});
            this.props.setArrStreetFunc(this.state.arrStreet);
        }
        else {
            this.setState({isSearch: true});
            this.filtration();
        }
    };

    filtration = () => {
        let filteredArr = [];
        let regExp = new RegExp($('#search').val());
        this.state.arrStreet.forEach((itemData, iData) =>{
            if (itemData.name.search(regExp) !== -1) filteredArr.push(itemData);
        });
        this.props.setArrStreetFunc(filteredArr);
    };

    setType = (e) => {
        this.setState({type: e.currentTarget.value});
    };

    //при нажатии кнопки id="btnNewStreet"
    btnNewStreet = () => {
        this.setState({type: 16});
    };

    ////при нажатии кнопки id="btnModal"
    modalBtnClick = () => {
        let title = $('#title').val();
        let newStret = {};
        if (title === "" || title === " ") return null;
        else {
            newStret = {
                city: {oid: 2, operation: 0},
                location: {state: 0, geoy: 0, geox: 0, gpsTime: {timeInMS: 1561563979078}},
                name: title,
                type: this.state.type,
                valid: true,
            };
        }
        fetch(`${allConst.IP_HOST}${allConst.PATH_STREET_ADD}`, {
            method: 'POST',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            body: JSON.stringify(newStret),
        }).then(function (response) {
            return response.json();
        }).then(data => {
            window.location.reload();
        }).catch((error) => {
            console.log(error.message);
        });
    };


    render() {
        let itemsTypes = [];
        typeStreet.forEach(function (itemMap, i) {
            itemsTypes.push(<option value={i} key={i}>{itemMap}</option>);
        });
        return (
            <Fragment>
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="headerModal"
                                    className="modal-title"> Создание </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="lastName"> Название </label>
                                <input className="form-control" id="title" type="search"
                                       placeholder="Введите название" aria-label="Search"/>
                                <label htmlFor="role"> Тип </label>
                                <select id="type" className="form-control" onClick={this.setType}>
                                    {itemsTypes}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="btnModal" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.modalBtnClick}>Добавить
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
                        <div className="btn-group col-sm-4 col-xl-5 mt-3">
                            <div className="form-group">
                                <button id="btnNewStreet" className="btn btn-outline-secondary" onClick={this.btnNewStreet} data-toggle="modal" data-target="#myModal">
                                    <i className="fas fa-plus fa-lg"/> Создание новой улицы
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableStreets/>}
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Street)