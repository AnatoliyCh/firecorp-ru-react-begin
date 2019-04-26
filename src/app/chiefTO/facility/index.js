import React, {Component, Fragment} from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';
import {
    get_list_facility,
    get_search_list_facility,
    reverse_list_facility
} from './ducks'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

$('#myModalFacility').modal('toggle');

class Facility extends Component {
    componentDidMount() {
        this.props.get_list_facility();
    }
    /*Функция для поиска объектов (фильтрование списков объектов)*/
    search_facility = event => {
        const value = event.target.value.toLowerCase();

        const filterList = this.props.list_facility.filter(facility => {
            return facility.name.toLowerCase().includes(value);
        });
        this.props.get_search_list_facility(filterList);
    };
    render() {
        const list_facility = Object.values(this.props.search_list_facility);

        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по объектам"
                               aria-label="Search" onChange={this.search_facility}/>
                    </form>
                    <div className="col-sm-4 col-xl-2 mt-3">
                        <button className="btn btn-outline-danger col-12" data-toggle="modal"
                                data-target="#myModalFacility">Добавить объект
                        </button>
                    </div>
                </div>
                <table className="table mt-3">
                    <thead className="thead-light">
                    <tr className="d-flex">

                        <th className="col-1">id</th>
                        <th className="col-1 sort-button" onClick={this.props.reverse_list_facility}>Название</th>
                        <th className="col-2">Контрагент</th>
                        <th className="col-2">Адрес объекта</th>
                        <th className="col-1">Локация</th>
                        <th className="col-1">Кол-во работ</th>
                        <th className="col-2">Техник</th>
                        <th className="col-2">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_facility.map((facility, i) => {
                        const street = (facility.address || {}).street;
                        const home = (facility.address || {}).home;
                        const office = (facility.address || {}).office === "" ? "" :`оф. ${(facility.address || {}).office}`;

                        return (
                            <tr key={facility.identifier + i.toString()} className="d-flex">
                                <td className="col-1">{facility.identifier}</td>
                                <td className="col-1">{facility.name}</td>
                                <td className="col-2">*Контрагент*</td>
                                <td className="col-2">{street} {home} {office}</td>
                                <td className="col-1">Статус</td>
                                <td className="col-1">Телефон</td>
                                <td className="col-2">Локация</td>
                                <td className="col-2">Статус</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*Модальное окно добавления локации*/}
                <div id="myModalFacility" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Создание объекта</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="addLocation">Название</label>
                                <input className="form-control" id="addLocation" type="search"
                                       placeholder="Введите название объекта" aria-label="Search"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({listFacility}) => ({
    list_facility: listFacility.list_facility,
    search_list_facility: listFacility.search_list_facility
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_facility,
            get_search_list_facility,
            reverse_list_facility
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Facility)