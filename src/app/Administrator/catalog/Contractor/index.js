import React, {Component, Fragment} from 'react';
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import $ from "jquery";

class Contractor extends Component {
    state = {
        isLoading: false,//загрузка

        arr: [],
        arrS: [],//при поиске

        //для модала
        needPhoto: true
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPICities();
    };

    getAPICities = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_CONTRACTOR_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            data = this.sortData(data);
            this.setState({arr: data});
            this.setState({arrS: data});
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
        if (tmpStr === "" || tmpStr === " ") this.setState({arrS: this.state.arr});
        else this.filtration();
    };

    filtration = () => {
        let filteredArr = [];
        let regExp = new RegExp($('#search').val());
        this.state.arr.forEach((itemData, iData) =>{
            if (itemData.name.search(regExp) !== -1) filteredArr.push(itemData);
        });
        this.setState({arrS: filteredArr});
    };

    ////при нажатии кнопки id="btnModal"
    modalBtnClick = () => {
        let title = $('#title').val();
        let inn = $('#inn').val();
        let newObject = {};
        if (title === "" || title === " ") return null;
        else {
            newObject = {
                INN: inn,
                address: {
                    city: "",
                    home: "",
                    location: {
                        geox: 0,
                        geoy: 0,
                        gpsTime: {timeInMS: 1561563985582},
                        state: 0,
                    },
                    office: "",
                    street: "",
                    type: 4369,
                },
                bookKeeper: {},
                boss: {},
                facilityes: [],
                name: title,
                user: {},
            };
            fetch(`${allConst.IP_HOST}${allConst.PATH_CONTRACTOR_ADD}`, {
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

    getRowsTable = () => {
        return this.state.arrS.map((item, i) => {
            return (
                <tr key={i}>
                    <th className="oid" scope="row">{item.oid}</th>
                    <td>{item.name}</td>
                    <td>{item.INN}</td>
                    <td>{item.facilityes.length}</td>
                    <td>{item.user.oid != 0 ? "Да" : "Нет" }</td>
                </tr>
            )
        })
    };

    render() {
        let rows = this.getRowsTable();
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
                                <label htmlFor="lastName">Название</label>
                                <input className="form-control" id="title" type="search"
                                       placeholder="Введите название" aria-label="Search"/>
                                <label htmlFor="role">ИНН</label>
                                <input className="form-control" id="inn" type="number"
                                       placeholder="Введите ИНН" aria-label="Search"/>
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
                                <button id="btnNewStreet" className="btn btn-outline-secondary" onClick={null} data-toggle="modal" data-target="#myModal">
                                    <i className="fas fa-plus fa-lg"/> Создание контрагента
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div>
                    :
                    rows.length ?
                        <table className="table table-sm table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th className="oidTHead" scope="col">oid</th>
                                <th scope="col">Название</th>
                                <th scope="col">инн</th>
                                <th scope="col">Кол-во объектов</th>
                                <th scope="col">Прикреплен</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                        :
                        <table className="table table-sm table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th className="oidTHead" scope="col">oid</th>
                                <th scope="col">Название</th>
                                <th scope="col">инн</th>
                                <th scope="col">Кол-во объектов</th>
                                <th scope="col">Прикреплен</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr key="0">
                                <td colSpan="5" className="emptyText">Нет данных!</td>
                            </tr>
                            </tbody>
                        </table>
                }
            </Fragment>
        )
    }
}

export default Contractor;