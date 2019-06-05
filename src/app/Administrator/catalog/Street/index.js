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

    render() {
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8 col-xl-10 mt-3">
                            <input id="search" className="form-control" type="search" placeholder="Поиск по названию улиц"
                                   aria-label="Search" onChange={this.search}/>
                        </div>
                        <div className="btn-group col-sm-4 col-xl-2 mt-3">
                            <div className="form-group">
                                <select className="form-control" id="addProfessor">
                                    <option className="dropdown-item" hidden value=''>Тип</option>
                                    <option className="dropdown-item">Уволен</option>
                                    <option className="dropdown-item">В отпуске</option>
                                </select>
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