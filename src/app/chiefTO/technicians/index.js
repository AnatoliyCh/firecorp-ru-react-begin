import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import $ from "jquery";
import Select from 'react-select';
import differenceBy from 'lodash/differenceBy'
import {get_list_locations} from "../locations/ducks";
import {
    get_list_technicians,
    get_search_list_technicians,
    reverse_list_technicians,
    edit_technician
} from './ducks'

$('#editTechnician').modal('toggle');

class Technicians extends Component {
    state = {
        idEditElement: "",
        posEditElement: "",
        locations: [], // текущие локации конкретного техника
        cur_locations: [] // предыдущие локации
    };

    componentDidMount() {
        this.props.get_list_technicians();
        this.props.get_list_locations();
    }

    /*Функция для поиска техников (фильтрование списков техников)*/
    search_technicians = event => {
        const value = event.target.value.toLowerCase();

        const filterList = this.props.list_technicians.filter(technician => {
            const FIO = `${technician.lastName} ${technician.firstName} ${technician.middleName}`;
            return FIO.toLowerCase().includes(value);
        });
        if (!this.props.sortUp_technicians) {
            filterList.reverse();
        }
        this.props.get_search_list_technicians(filterList);
    };
    handleSelectEditTechnician = (id, pos, locations) => {
        this.setState({
            locations: locations,
            cur_locations: locations,
            idEditElement: id,
            posEditElement: pos
        });
    };
    handleSubmitEditTechnician = event => {
        event.preventDefault();
        let technicians = this.props.list_technicians;

        let allLocations = this.state.cur_locations.map(loc => {
            return {id: loc.id, name: loc.value}
        });
        let addedLocations = this.state.locations.map(loc => {
            return {id: loc.id, name: loc.value}
        });
        let deletedLocation = differenceBy(allLocations, addedLocations, 'id');
        addedLocations = differenceBy(addedLocations, allLocations, 'id');

        deletedLocation.map(location => {
            let ind = technicians[this.state.posEditElement].zones.findIndex(x => x.oid === location.id);
            return technicians[this.state.posEditElement].zones.splice(ind, 1);
        });

        addedLocations.map(location => {
            return technicians[this.state.posEditElement].zones = [...technicians[this.state.posEditElement].zones, {
                oid: location.id,
                ref: {name: location.name}
            }];
        });

        this.props.edit_technician(this.state.posEditElement, technicians[this.state.posEditElement]);
    };
    handleChangeLocationTechnicians = (locations) => {
        this.setState({locations: locations});
    };
    getLocationsOptions = (list) => {
        return list.map(location => {
            return {
                id: location.oid,
                value: location.name,
                label: location.name
            };
        });
    };

    render() {
        const list_technicians = Object.values(this.props.search_list_technicians);
        const arrow = this.props.sortUp_technicians ? <i className="fas fa-angle-down"> </i> :
            <i className="fas fa-angle-up"> </i>;

        /*Опции для выбора локаций*/
        const options = this.getLocationsOptions(this.props.list_locations);
        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по сотрудникам"
                               aria-label="Search" onChange={this.search_technicians}/>
                    </form>

                    <div className="btn-group col-sm-4 col-xl-2 mt-3">
                        <div className="form-group">
                            <select className="form-control" id="addProfessor">
                                <option className="dropdown-item" hidden value=''>Статус</option>
                                <option className="dropdown-item">Уволен</option>
                                <option className="dropdown-item">В отпуске</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <table className="table mt-3 text-center">
                    <thead className="thead-light">
                    <tr className="d-flex">
                        <th className="col-1"/>
                        <th className="col-5 sort-button" onClick={this.props.reverse_list_technicians}>ФИО {arrow}</th>
                        <th className="col-2">Телефон</th>
                        <th className="col-2">Локации</th>
                        <th className="col-1">Статус</th>
                        <th className="col-1"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list_technicians.map((technician, i) => {
                        let locationsOptions = this.getLocationsOptions(technician.zones === undefined ? [] : technician.zones.map(location => location.ref));
                        const locations = technician.zones.map(location => (location.ref || {}).name);
                        technician = (technician.user || {}).ref;
                        const phone = ((technician.account || {}).loginPhone || {}).value;
                        return (
                            <tr key={i.toString()} className="d-flex">
                                <td className="col-1">
                                    <img src={require("../../../static/EmptyUser.jpg")} className="ml-2 mr-2 round-img"
                                         width="30" height="30" alt=""/>
                                </td>
                                <td className="col-5">{technician.lastName} {technician.firstName} {technician.middleName}</td>
                                <td className="col-2">{phone}</td>
                                <td className="col-2">
                                    {locations.map(location => `${location}\n`)}
                                </td>
                                <td className="col-1">Статус</td>
                                <td className="col-1">
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#editTechnician"
                                            onClick={() => this.handleSelectEditTechnician(technician.oid, i, locationsOptions)}>
                                        <i className="fas fa-pencil-alt"> </i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*Модальное окно редактирования техника*/}
                <div id="editTechnician" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="editTechnician" onSubmit={this.handleSubmitEditTechnician}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Редактирование техника</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <p>Локации</p>
                                    <Select
                                        value={this.state.locations}
                                        onChange={this.handleChangeLocationTechnicians}
                                        options={options}
                                        isMulti={true}
                                        placeholder={"Выберите локации"}
                                        className={"multiselect"}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-danger">Изменить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({listTechnicians, listLocations}) => ({
    list_technicians: listTechnicians.list_technicians,
    search_list_technicians: listTechnicians.search_list_technicians,
    sortUp_technicians: listTechnicians.sortUp_technicians, /*Для отображения стрелки сортировки вверх/вниз */
    list_locations: listLocations.list_locations,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_technicians,
            get_search_list_technicians,
            reverse_list_technicians,
            get_list_locations,
            edit_technician
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Technicians)