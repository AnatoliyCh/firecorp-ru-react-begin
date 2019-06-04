import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
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
        isUpdate: false,//обновление данных
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
            this.props.setArrStreetFunc(this.sortData(data));
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
            this.props.setArrStreetFunc(this.sortData(data));
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
        data.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        return data;
    };

    render() {
        //<div className="row"> испрвить
        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по названию улиц"
                               aria-label="Search" onChange=""/>
                    </form>
                    <div className="btn-group col-sm-4 col-xl-2 mt-3">
                        <div className="form-group">
                            <select className="form-control" id="addProfessor">
                                <option className="dropdown-item" hidden value=''>Статус</option>
                                <option className="dropdown-item">Уволен</option>
                                <option className="dropdown-item">В отпуске</option>
                            </select>
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