import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrCities} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableCities from "./TableCities";
import $ from "jquery";

let typeCity = new Map([
    [1, "Город"],
    [2, "Посёлок"],
]);

class City extends Component {
    state = {
        isLoading: false,//загрузка

        arrCity: [],

        //для создания
        type: 1,
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPICities();
    };

    getAPICities = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_CITY_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            data = this.sortData(data);
            this.setState({arrCity: data});
            this.props.setArrCitiesFunc(data);
            this.setState({isLoading: false});
        }).catch((error) => {
            console.log(error.message);
        });
    };

    sortData = (data) => {
        data.forEach((itemData) => itemData.typeStr = typeCity.get(itemData.type));
        data.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        return data;
    };

    search = () => {
        let tmpStr = $('#search').val();
        if (tmpStr === "" || tmpStr === " ") this.props.setArrCitiesFunc(this.state.arrCity);
        else this.filtration();
    };

    filtration = () => {
        let filteredArr = [];
        let regExp = new RegExp($('#search').val());
        this.state.arrCity.forEach((itemData, iData) =>{
            if (itemData.name.search(regExp) !== -1) filteredArr.push(itemData);
        });
        this.props.setArrCitiesFunc(filteredArr);
    };

    setType = (e) => {
        this.setState({type: e.currentTarget.value});
    };

    //при нажатии кнопки id="btnNewObject"
    btnNewObject = () => {
        this.setState({type: 1});
    };

    ////при нажатии кнопки id="btnModal"
    modalBtnClick = () => {
        let title = $('#title').val();
        let newObject = {};
        if (title === "" || title === " ") return null;
        else {
            newObject = {
                name: title,
                type: this.state.type,
                valid: true,
            };
        }
        fetch(`${allConst.IP_HOST}${allConst.PATH_CITY_ADD}`, {
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
    };

    render() {
        let itemsTypes = [];
        typeCity.forEach(function (itemMap, i) {
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
                        <div className="btn-group col-sm-4 col-xl-2 mt-3">
                            <div className="form-group">
                                <button id="btnNewStreet" className="btn btn-outline-secondary" onClick={this.btnNewObject} data-toggle="modal" data-target="#myModal">
                                    <i className="fas fa-plus fa-lg"/> Создание нас. пункта
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableCities/>}
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
    return {
        setArrCitiesFunc: arr => dispatch(setArrCities(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)