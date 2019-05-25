import React, {Component, Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';
import {
    get_list_facility,
    get_search_list_facility,
    reverse_list_facility,
    add_facility,
    edit_facility
} from './ducks'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getFIO} from "../../commonComponents/Const";
import {withPolling} from "../../commonComponents/withPolling";

class Facility extends Component {
    state = {
        id: "",
        name: "",
        contractor: "",
        location: "",
        address: "",
        technician: "",
        popupState: "",
        idEditElement: null,
        posEditElement: null
    };

    componentDidMount() {
        this.props.get_list_facility();
    }

    /*Функция для поиска объектов (фильтрование списков объектов)*/
    search_facility = event => {
        const value = event.target.value.toLowerCase();

        const filterList = this.props.list_facility.filter(facility => {
            return facility.name.toLowerCase().includes(value);
        });
        if (!this.props.sortUp_facility) {
            filterList.reverse();
        }
        this.props.get_search_list_facility(filterList);
    };

    handleSubmitAddFacility = event => {
        event.preventDefault();
        const data = JSON.stringify({identifier: this.state.id, name: this.state.name});
        this.props.add_facility(data);
        this.clearDialog();
    };
    handleSubmitEditFacility = event => {
        event.preventDefault();
        const data = JSON.stringify({identifier: this.state.id, name: this.state.name, oid: this.state.idEditElement});
        this.props.edit_facility(data, this.state.posEditElement, this.state.idEditElement);
        this.clearDialog();
    };
    handleChangeIdFacility = event => {
        event.preventDefault();
        this.setState({id: event.target.value});
    };
    handleChangeNameFacility = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    };
    handleSelectContractorFacility = event => {
        event.preventDefault();
        this.setState({contractor: event.target.value});
    };
    handleSelectLocationFacility = event => {
        event.preventDefault();
        this.setState({location: event.target.value});
    };
    handleChangeAddressFacility = event => {
        event.preventDefault();
        this.setState({address: event.target.value});
    };

    clearDialog = () => {
        $('#interactFacilityId').val('');
        $('#interactFacilityName').val('');
        $('#interactFacilityContractor').val('');
        $('#interactFacilityLocation').val('');
        $('#interactFacilityAddress').val('');
    };

    render() {
        const list_facility = Object.values(this.props.search_list_facility);
        const arrow = this.props.sortUp_facility ? <i className="fas fa-angle-down"> </i> :
            <i className="fas fa-angle-up"> </i>;

        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по объектам"
                               aria-label="Search" onChange={this.search_facility}/>
                    </form>
                    <div className="col-sm-4 col-xl-2 mt-3">
                        <button className="btn btn-outline-danger col-12" data-toggle="modal"
                                data-target="#interactFacility"
                                onClick={() => this.setState({popupState: "add"})}>Добавить объект
                        </button>
                    </div>
                </div>
                <table className="table mt-3">
                    <thead className="thead-light">
                    <tr className="d-flex">

                        <th className="col-1">id</th>
                        <th className="col-1 sort-button"
                            onClick={this.props.reverse_list_facility}>Название {arrow}</th>
                        <th className="col-2">Контрагент</th>
                        <th className="col-2">Адрес объекта</th>
                        <th className="col-1">Локация</th>
                        <th className="col-1">Кол-во работ</th>
                        <th className="col-2">Техник</th>
                        <th className="col-1">Статус</th>
                        <th className="col-1"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list_facility.map((facility, i) => {
                        const street = (facility.address || {}).street;
                        const home = (facility.address || {}).home;
                        const office = (facility.address || {}).office === "" ? "" : `оф. ${(facility.address || {}).office}`;
                        const technician = getFIO((((facility.technecian || {}).ref || {}).user || {}).ref);
                        const location = ((((facility.technecian || {}).ref || {}).zone || {}).ref || {}).name;
                        const contractorName = ((facility.contractor || {}).ref || {}).name;
                        const contractorINN = ((facility.contractor || {}).ref || {}).INN;
                        return (
                            <tr key={i.toString()} className="d-flex">
                                <td className="col-1">{facility.identifier}</td>
                                <td className="col-1">{facility.name}</td>
                                <td className="col-2">{contractorName} {<br/>} {`ИНН: ${contractorINN}`}</td>
                                <td className="col-2">{street} {home} {office}</td>
                                <td className="col-1">{location}</td>
                                <td className="col-1">Кол-во работ</td>
                                <td className="col-2">{technician}</td>
                                <td className="col-1">Статус</td>
                                <td className="col-1">
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#interactFacility"
                                            onClick={() => this.setState({
                                                popupState: "edit",
                                                idEditElement: facility.oid,
                                                posEditElement: i,
                                                id: facility.identifier,
                                                name: facility.name,
                                                contractor: contractorName,
                                                address: `${street} ${home} ${office}`,
                                                location: location,
                                            })}><i
                                        className="fas fa-pencil-alt"> </i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*Модальное окно добавления/редактирования объекта*/}

                <div id="interactFacility" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="interactFacility"
                                  onSubmit={this.state.popupState === "add" ? this.handleSubmitAddFacility : this.handleSubmitEditFacility}>
                                <div className="modal-header">
                                    <h4 className="modal-title">{this.state.popupState === "add" ? 'Создание' : 'Редактирование'} объекта</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <label htmlFor="interactFacilityId">Идентификатор</label>
                                    <input className="form-control" id="interactFacilityId" type="text"
                                           placeholder="Введите идентификатор объекта"
                                           onChange={this.handleChangeIdFacility} required value={this.state.id}/>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <label htmlFor="interactFacilityName">Название</label>
                                    <input className="form-control" id="interactFacilityName" type="text"
                                           placeholder="Введите название объекта"
                                           onChange={this.handleChangeNameFacility} required value={this.state.name}/>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <label htmlFor="interactContractorName">Контрагент</label>
                                    <input className="form-control" id="interactContractorName" type="text"
                                           placeholder="Выберите контрагента"
                                           onChange={this.handleSelectContractorFacility}
                                           value={this.state.contractor}/>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <label htmlFor="interactFacilityLocation">Локация</label>
                                    <input className="form-control" id="interactFacilityLocation" type="text"
                                           placeholder="Выберите локацию"
                                           onChange={this.handleSelectLocationFacility}
                                           value={this.state.location}/>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <label htmlFor="interactFacilityAddress">Адрес</label>
                                    <input className="form-control" id="interactFacilityAddress" type="text"
                                           placeholder="Введите адрес"
                                           onChange={this.handleChangeAddressFacility}
                                           value={this.state.address}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-danger">
                                        {this.state.popupState === "add" ? 'Добавить' : 'Изменить'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({listFacility}) => ({
    list_facility: listFacility.list_facility,
    search_list_facility: listFacility.search_list_facility,
    sortUp_facility: listFacility.sortUp_facility
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_facility,
            get_search_list_facility,
            reverse_list_facility,
            add_facility,
            edit_facility
        },
        dispatch
    );

export default withPolling(get_list_facility)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Facility));