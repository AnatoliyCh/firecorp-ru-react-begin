import React, {Component, Fragment} from 'react';
import '../../Administrator/catalog/styles.css';
import '../../commonComponents/styles.css';
import * as allConst from "../../commonComponents/Const";
import SpinnerDanger from '../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import $ from "jquery";

class Contractor extends Component {
    state = {
        isLoading: false,//загрузка

        arr: [],
        arrS: [],//при поиске

        arrUser: [], //список заказчиков
        arrContr: [], //список контрагентов (не заюзаных)

        //для модала
        currentUser: 0,
        currentContr: 0,

    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIContractor();
        this.getAPIUsers();



    };

    getAPIContractor = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_CONTRACTOR_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            data = this.sortData(data);
            this.setState({arr: data});
            this.setState({arrS: data});
            let fContr = [];
            data.forEach((iData, i) => { if (iData.user.oid === 0) fContr.push(iData); });
            this.setState({arrContr: fContr});
            this.setState({currentContr: this.state.arrContr[0].oid});
            this.setState({isLoading: false});
        }).catch((error) => {
            console.log(error.message);
        });
    };

    getAPIUsers = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_USERS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            let tmpUser = [];
            data.forEach((iData, i) => { if (iData.typeId === 9) tmpUser.push(iData); });
            this.setState({arrUser: tmpUser});
            this.setState({currentUser: this.state.arrUser[0].oid});
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

    contractorUser = () => {
        /*не пашет, что-то не так с id*/
        fetch(`${allConst.IP_HOST}${allConst.PATH_CONTRACTOR_ASIGN}`, {
            method: 'POST',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            body: JSON.stringify({id: this.state.currentUser, contractorid: this.state.currentContr,}),
        }).then(function (response) {
            return response.json();
        }).then(data => {
            window.location.reload();
        }).catch((error) => {
            console.log(error.message);
        });
    };

    setUser = (e) => {
        this.setState({currentUser: e.currentTarget.value});
    };
    setContr = (e) => {
        this.setState({currentContr: e.currentTarget.value});
    };

    render() {
        let rows = this.getRowsTable();

        let fContr = [];
        this.state.arrContr.forEach(function (itemMap, i) {
            fContr.push(<option value={itemMap.oid} key={i}>{itemMap.name}</option>);
        });

        let fUser = [];
        this.state.arrUser.forEach(function (itemMap, i) {
            fUser.push(<option value={itemMap.oid} key={i}>{itemMap.lastName} {itemMap.firstName} {itemMap.middleName}</option>);
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

                <div id="myModal1" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 id="headerModal"
                                    className="modal-title"> Создание ЛК </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="role"> Контрагент </label>
                                <select id="type" className="form-control" onClick={this.setContr}>
                                    {fContr}
                                </select>
                                <label htmlFor="role"> Заказчик </label>
                                <select id="type" className="form-control" onClick={this.setUser}>
                                    {fUser}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="btnModal" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.contractorUser}>Создать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8 col-xl-5 mt-3">
                            <input id="search" className="form-control" type="search" placeholder="Поиск по контрагентам"
                                   aria-label="Search" onChange={this.search}/>
                        </div>
                        <div className="btn-group col-sm-4 col-xl-5 mt-3">
                            <div className="form-group">
                                <button id="btnNewStreet" className="btn btn-outline-secondary" onClick={null} data-toggle="modal" data-target="#myModal">
                                    <i className="fas fa-plus fa-lg"/> Создание контрагента
                                </button>
                            </div>
                            <div className="form-group" style={{marginLeft: "10px"}}>
                                <button id="btnNewLK" className="btn btn-outline-secondary" onClick={null} data-toggle="modal" data-target="#myModal1">
                                    <i className="fas fa-plus fa-lg"/> Создание ЛК
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