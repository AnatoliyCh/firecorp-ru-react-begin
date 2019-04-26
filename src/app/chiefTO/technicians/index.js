import React, {Component, Fragment} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    get_list_technicians,
    get_search_list_technicians,
    reverse_list_technicians
} from './ducks'

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
        this.props.get_search_list_technicians(filterList);
        console.log(this.props);
    };

    render() {
        const list_technicians = Object.values(this.props.search_list_technicians);

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
                        <th className="col-1"></th>
                        <th className="col-5 sort-button" onClick={this.props.reverse_list_technicians}>ФИО</th>
                        <th className="col-2">Телефон</th>
                        <th className="col-2">Локация</th>
                        <th className="col-2">Статус</th>
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
                                <td className="col-2">Статус</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = ({listTechnicians}) => ({
    list_technicians: listTechnicians.list_technicians,
    search_list_technicians: listTechnicians.search_list_technicians
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