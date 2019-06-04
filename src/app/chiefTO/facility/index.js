import React, {Component, Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {
    get_list_facility,
    get_search_list_facility,
    reverse_list_facility,
    add_facility,
    edit_facility,
    delete_facility,
    get_list_contractor,
    add_technician_to_facility
} from './ducks'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getFIO} from "../../commonComponents/Const";
import {withPolling} from "../../commonComponents/withPolling";
import Select from 'react-select';
import {get_list_locations} from "../locations/ducks";

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
        posEditElement: null,
    };

    componentDidMount() {
        this.props.get_list_facility();
        this.props.get_list_locations();
        this.props.get_list_contractor();
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
    handleSelectAddFacility = () => {
        this.setState({
            popupState: "add",
            id: "",
            name: "",
            contractor: "",
            location: "",
            address: "",
            technician: ""
        });
    };
    handleSelectEditFacility = (id, pos, identifier, name, contractor, address, location, technician) => {
        this.setState({
            popupState: "edit",
            idEditElement: id,
            posEditElement: pos,
            id: identifier,
            name: name,
            contractor: contractor,
            address: address,
            technician: technician,
            location: location,
        })
    };
    handleSubmitAddFacility = event => {
        event.preventDefault();
        let data = {identifier: this.state.id, name: this.state.name};
        data["zone"] = {oid: this.state.location.id, ref: {name: this.state.location.value}};
        data["contractor"] = {
            oid: this.state.contractor.id,
            ref: {name: this.state.contractor.value, INN: this.state.contractor.INN}
        };
        let idTechnician = this.state.technician.id;
        let nameTechnician = this.state.technician.value.split(" ");
        data["technecian"] = {oid: 0,
            ref: {
                user: {
                    ref: {
                        lastName: nameTechnician[0],
                        firstName: nameTechnician[1][0],
                        middleName: nameTechnician[1][2]
                    }
                }
            }
        };
        let pos = this.props.list_facility.length - 1;
        this.props.add_facility(JSON.stringify(data), pos, idTechnician);
    };
    handleSubmitEditFacility = event => {
        event.preventDefault();
        const data = this.props.list_facility[this.state.posEditElement];
        data.identifier = this.state.id;
        data.name = this.state.name;
        data["zone"] = {oid: this.state.location.id, ref: {name: this.state.location.value}};
        data["contractor"] = {
            oid: this.state.contractor.id,
            ref: {name: this.state.contractor.value, INN: this.state.contractor.INN}
        };
        let idTechnician = this.state.technician.id;
        let nameTechnician = this.state.technician.value.split(" ");
        data["technecian"] = {oid: 0,
            ref: {
                user: {
                    ref: {
                        lastName: nameTechnician[0],
                        firstName: nameTechnician[1][0],
                        middleName: nameTechnician[1][2]
                    }
                }
            }
        };

        /*Потребуется потом!*/
        //data[this.state.posEditElement].address = this.state.address;
        this.props.edit_facility(data, this.state.posEditElement,idTechnician);
    };
    handleSubmitDeleteFacility = (id, pos) => {
        this.props.delete_facility(id, pos);
    };
    handleChangeIdFacility = event => {
        event.preventDefault();
        this.setState({id: event.target.value});
    };
    handleChangeNameFacility = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    };
    handleChangeContractorFacility = (contractor) => {
        this.setState({contractor: contractor});
    };
    handleChangeTechnicianFacility = (technician) => {
        this.setState({technician: technician});
    };
    handleChangeLocationFacility = (location) => {
        this.setState({location: location});
    };
    handleChangeAddressFacility = event => {
        event.preventDefault();
        this.setState({address: event.target.value});
    };

    getLocationOption = (list) => {
        list = list.map(location => {
            return {
                id: location.oid,
                value: location.name,
                label: location.name,
                technicians: location.technicians
            };
        });

        list.unshift({id: 0, value: '', label: 'Выберите локацию', technicians: []});
        return list;
    };
    getContractorOption = (list) => {
        list = list.map(contractor => {
            return {
                id: contractor.oid,
                value: contractor.name,
                INN: contractor.INN,
                label: contractor.name
            };
        });
        list.unshift({id: 0, value: '', label: 'Выберите контрагент'});
        return list;
    };
    getTechnicianOption = (list) => {
        console.log(list, "before")
        if (list) {
            list = list.map(technician => {
                return {
                    id: technician.oid,
                    value: getFIO((technician.user || {}).ref),
                    label: getFIO((technician.user || {}).ref)
                };
            });
            list.unshift({id: 0, value: '', label: 'Выберите техника'});
            console.log(list, "list is exist")
        } else {
            list = [];
            console.log(list, "list is not exist")
        }
        return list;
    };

    render() {
        const list_facility = Object.values(this.props.search_list_facility);
        const arrow = this.props.sortUp_facility ? <i className="fas fa-angle-down"> </i> :
            <i className="fas fa-angle-up"> </i>;

        /*Опции для выбора*/
        const options = this.getLocationOption(this.props.list_locations);
        const contractorOptions = this.getContractorOption(this.props.list_contractor);
        const technicianOptions = this.getTechnicianOption(this.state.location.technicians);
        console.log(this.state.location.technicians, "state")
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
                                onClick={this.handleSelectAddFacility}>Добавить объект
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
                        /*Обосрись сколько доделывать*/
                        let locationOption = facility.zone.ref ? {
                            id: facility.zone.oid,
                            value: facility.zone.ref.name,
                            label: facility.zone.ref.name,
                            //technicians: this.props.list_locations

                                /*facility.technecian.oid !== 0 ? [{
                                oid: facility.technecian.oid,
                                user: {ref: facility.technecian.ref.user.ref}
                            }] : []*/
                        } : {id: 0, value: '', label: 'Введите локацию'};
                        let contractorOption = facility.contractor.ref ? {
                            id: facility.contractor.oid,
                            INN: facility.contractor.ref.INN,
                            value: facility.contractor.ref.name,
                            label: facility.contractor.ref.name
                        } : {id: 0, value: '', label: 'Введите контрагент'};
                        let technicianOption = facility.technecian.ref ? {
                            id: facility.technecian.oid,
                            value: getFIO(facility.technecian.ref.user.ref),
                            label: getFIO(facility.technecian.ref.user.ref),
                        } : {id: 0, value: '', label: 'Введите техника'};

                        const street = (facility.address || {}).street;
                        const home = (facility.address || {}).home;
                        const office = (facility.address || {}).office === "" ? "" : `оф. ${(facility.address || {}).office}`;
                        const technician = getFIO((((facility.technecian || {}).ref || {}).user || {}).ref);
                        const location = ((facility.zone || {}).ref || {}).name;
                        const contractorName = ((facility.contractor || {}).ref || {}).name;
                        const contractorINN = ((facility.contractor || {}).ref || {}).INN;
                        return (
                            <tr key={i.toString()} className="d-flex">
                                <td className="col-1">{facility.identifier}</td>
                                <td className="col-1">{facility.name}</td>
                                <td className="col-2">{contractorName} {
                                    <br/>} {contractorINN ? `ИНН: ${contractorINN}` : ""}</td>
                                <td className="col-2">{street} {home} {office}</td>
                                <td className="col-1">{location}</td>
                                <td className="col-1">Кол-во работ</td>
                                <td className="col-2">{technician}</td>
                                <td className="col-1">Статус</td>
                                <td className="col-1">
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#interactFacility"
                                            onClick={() => this.handleSelectEditFacility(facility.oid, i, facility.identifier, facility.name, contractorOption, `${street} ${home} ${office}`, locationOption, technicianOption)}>
                                        <i className="fas fa-pencil-alt"/>
                                    </button>
                                    <button type="button" className="btn delete_button"
                                            data-toggle="modal"
                                            data-target="#deleteLocation"
                                            onClick={() => this.handleSubmitDeleteFacility(facility.oid, i)}>
                                        <i className="fas fa-trash-alt"/>
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
                                    <p>Контрагент</p>
                                    <Select
                                        value={this.state.contractor}
                                        onChange={this.handleChangeContractorFacility}
                                        options={contractorOptions}
                                        placeholder={"Выберите контрагент"}
                                        className={"multiselect"}
                                    />
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <p>Локация</p>
                                    <Select
                                        value={this.state.location}
                                        onChange={this.handleChangeLocationFacility}
                                        options={options}
                                        placeholder={"Выберите локацию"}
                                        className={"multiselect"}
                                    />
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <p>Техник</p>
                                    <Select
                                        value={this.state.technician}
                                        onChange={this.handleChangeTechnicianFacility}
                                        options={technicianOptions}
                                        placeholder={"Выберите техника"}
                                        className={"multiselect"}
                                    />
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

const mapStateToProps = ({listFacility, listLocations}) => ({
    list_facility: listFacility.list_facility,
    search_list_facility: listFacility.search_list_facility,
    sortUp_facility: listFacility.sortUp_facility,
    list_contractor: listFacility.list_contractor,
    list_locations: listLocations.list_locations,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_facility,
            get_search_list_facility,
            reverse_list_facility,
            add_facility,
            edit_facility,
            delete_facility,
            get_list_locations,
            get_list_contractor,
            add_technician_to_facility
        },
        dispatch
    );

export default withPolling(get_list_facility)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Facility));