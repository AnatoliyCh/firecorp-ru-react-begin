import React, {Component, Fragment} from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    add_location,
    get_list_locations,
    get_search_list_locations,
    reverse_list_locations
} from './ducks'
import {getFIO} from "../../commonComponents/Const";

$('#addLocation').modal('toggle');
$('#editLocation').modal('toggle');

class Locations extends Component {
    state = {
        name: ""
    };

    componentDidMount() {
        this.props.get_list_locations();
    }

    /*Функция для поиска локаций (фильтрование списков локаций)*/
    search_locations = event => {
        const value = event.target.value.toLowerCase();

        const filterList = this.props.list_locations.filter(location => {
            return location.name.toLowerCase().includes(value);
        });
        if (!this.props.sortUp_locations) {
            filterList.reverse();
        }
        this.props.get_search_list_locations(filterList);
    };

    clearDialog = () => {
        $('#addLocationName').val('');
    };

    handleSubmitAddLocation = event => {
        event.preventDefault();
        const data = JSON.stringify({name: this.state.name});
        this.props.add_location(data);
        this.clearDialog();
    };
    handleChangeNameLocation = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    };

    render() {
        const list_locations = Object.values(this.props.search_list_locations);
        const arrow = this.props.sortUp_locations ? <i className="fas fa-angle-down"> </i> :
            <i className="fas fa-angle-up"> </i>;
        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по локациям"
                               aria-label="Search" onChange={this.search_locations}/>
                    </form>
                    <div className="col-sm-4 col-xl-2 mt-3">
                        <button className="btn btn-outline-danger col-12" data-toggle="modal"
                                data-target="#addLocation">Добавить локацию
                        </button>
                    </div>
                </div>
                <table className="table mt-3 text-center">
                    <thead className="thead-light">
                    <tr className="d-flex">
                        <th className="col sort-button"
                            onClick={this.props.reverse_list_locations}>Название {arrow}</th>
                        <th className="col">Кол-во объектов</th>
                        <th className="col">Техники</th>
                        <th className="col-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_locations.map((location, i) => {
                        let technicians = location.technicians.map(technician => getFIO((technician.user || {}).ref));
                        return (
                            <tr key={i.toString()} className="d-flex">
                                <td className="col">{location.name}</td>
                                <td className="col">Кол-во объектов</td>
                                <td className="col">{technicians.map(technician => technician)}</td>
                                <td className="col-1">
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#editLocation"><i className="fas fa-pencil-alt"> </i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*Модальное окно добавления локации*/}

                <div id="addLocation" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="addLocation" onSubmit={this.handleSubmitAddLocation}>
                                <div className="modal-header">
                                    <h4 className="modal-title">Создание локации</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body pt-4 pb-4">
                                    <label htmlFor="addLocationName">Название</label>
                                    <input className="form-control" id="addLocationName" type="text"
                                           placeholder="Введите название локации"
                                           onChange={this.handleChangeNameLocation} required/>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-danger">Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/*Модальное окно редактирования локации*/}
                <div id="editLocation" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Редактирование локации</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="addLocation">Название</label>
                                <input className="form-control" id="addLocation" type="search"
                                       placeholder="Введите название локации" aria-label="Search"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger">Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({listLocations}) => ({
    list_locations: listLocations.list_locations,
    search_list_locations: listLocations.search_list_locations,
    sortUp_locations: listLocations.sortUp_locations /*Для отображения стрелки сортировки вверх/вниз */
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            add_location,
            get_list_locations,
            get_search_list_locations,
            reverse_list_locations
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations)