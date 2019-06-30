import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrJobType} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableJobTypes from "./TableJobTypes";
import $ from "jquery";

class JobType extends Component {
    state = {
        isLoading: false,//загрузка

        arr: [],

        //для модала
        needPhoto: true
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIJobType();
    };

    getAPIJobType = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_JOBTYPE_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            data = this.sortData(data);
            this.setState({arr: data});
            this.props.setArrJobTypeFunc(data);
            this.setState({isLoading: false});
            console.log(data);
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
        if (tmpStr === "" || tmpStr === " ") this.props.setArrJobTypeFunc(this.state.arr);
        else this.filtration();
    };

    filtration = () => {
        let filteredArr = [];
        let regExp = new RegExp($('#search').val());
        this.state.arr.forEach((itemData, iData) =>{
            if (itemData.name.search(regExp) !== -1) filteredArr.push(itemData);
        });
        this.props.setArrJobTypeFunc(filteredArr);
    };

    setType = (e) => {
        this.setState({needPhoto: e.currentTarget.value});
    };

    setTypeNew = () => {
        this.setState({needPhoto: true});
    };

    ////при нажатии кнопки id="btnModal"
    modalBtnClick = () => {
        let title = $('#title').val();
        let description = $('#description').val();
        let tMin = $('#tMin').val();
        let mnPu = $('#mnPu').val();
        let serviceInterval = $('#serviceInterval').val();
        let needPhoto = this.state.needPhoto;
        let newObject = {};
        if (title === "" || title === " ") return null;
        else {
            newObject = {
                costPerUnit: mnPu,
                description: description,
                duration: tMin,
                impList: [],
                name: title,
                needPhoto: needPhoto,
                serviceInterval: serviceInterval,
                obligatory: true,
            };
            fetch(`${allConst.IP_HOST}${allConst.PATH_JOBTYPE_ADD}`, {
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
                                <label htmlFor="role"> Описание </label>
                                <textarea className="form-control" id="description" type="search" style={{resize: "none"} }
                                          rows="8" placeholder="Введите описание" aria-label="Search"/>
                                <label htmlFor="role">Продолжительность (мин)</label>
                                <input className="form-control" id="tMin" type="number"
                                       placeholder="Введите количество" aria-label="Search"/>
                                <label htmlFor="role">Стоимость единицы (руб)</label>
                                <input className="form-control" id="mnPu" type="number"
                                       placeholder="Введите количество" aria-label="Search"/>
                                <label htmlFor="lastName"> Периодичность </label>
                                <input className="form-control" id="serviceInterval" type="number"
                                       placeholder="Введите период" aria-label="Search"/>
                                <label htmlFor="role">Необходимо фотографировать</label>
                                <select id="needPhoto" className="form-control" onClick={this.setType}>
                                    <option value={true} key="1">Да</option>
                                    <option value={false} key="0">Нет</option>
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
                            <input id="search" className="form-control" type="search" placeholder="Поиск по типам работ"
                                   aria-label="Search" onChange={this.search}/>
                        </div>
                        <div className="btn-group col-sm-4 col-xl-5 mt-3">
                            <div className="form-group">
                                <button id="btnNewStreet" className="btn btn-outline-secondary" onClick={this.setTypeNew} data-toggle="modal" data-target="#myModal">
                                    <i className="fas fa-plus fa-lg"/> Создание типа работы
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableJobTypes/>}
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
    return {
        setArrJobTypeFunc: arr => dispatch(setArrJobType(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobType)