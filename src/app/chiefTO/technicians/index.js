import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    get_list_technicians,
    get_search_list_technicians,
    reverse_list_technicians
} from './ducks'
import $ from "jquery";

$('#editTechnician').modal('toggle');

class Technicians extends Component {
    componentDidMount() {
        this.props.get_list_technicians();
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

    render() {
        const list_technicians = Object.values(this.props.search_list_technicians);
        const arrow = this.props.sortUp_technicians ? <i className="fas fa-angle-down"> </i> :
            <i className="fas fa-angle-up"> </i>;
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
                        <th className="col-1"> </th>
                        <th className="col-5 sort-button" onClick={this.props.reverse_list_technicians}>ФИО {arrow}</th>
                        <th className="col-2">Телефон</th>
                        <th className="col-2">Локация</th>
                        <th className="col-1">Статус</th>
                        <th className="col-1"> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_technicians.map((technician, i) => {
                        const phone = ((technician.account || {}).loginPhone || {}).value;
                        return (
                            <tr key={technician.oid + i.toString()} className="d-flex">
                                <td className="col-1">
                                    <img src={require("../../../static/EmptyUser.jpg")} className="ml-2 mr-2 round-img"
                                         width="30" height="30" alt=""/>
                                </td>
                                <td className="col-5">{technician.lastName} {technician.firstName} {technician.middleName}</td>
                                <td className="col-2">{phone}</td>
                                <td className="col-2">Локация</td>
                                <td className="col-1">Статус</td>
                                <td className="col-1">
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#editTechnician"><i className="fas fa-pencil-alt"> </i>
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
                            <div className="modal-header">
                                <h4 className="modal-title">Редактирование техника</h4>
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

const mapStateToProps = ({listTechnicians}) => ({
    list_technicians: listTechnicians.list_technicians,
    search_list_technicians: listTechnicians.search_list_technicians,
    sortUp_technicians: listTechnicians.sortUp_technicians /*Для отображения стрелки сортировки вверх/вниз */
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_technicians,
            get_search_list_technicians,
            reverse_list_technicians
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Technicians)