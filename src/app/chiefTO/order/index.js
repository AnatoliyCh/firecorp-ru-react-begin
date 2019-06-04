import React, {Component, Fragment} from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    get_list_order,
    get_search_list_order
} from './ducks'

class Order extends Component {
    state = {};

    componentDidMount() {
        this.props.get_list_order();
    }

    /*Функция для поиска регламентных работ (фильтрование списков регламентных работ)*/
    search_order = event => {
        const value = event.target.value.toLowerCase();
        let list = this.props.list_order.map(a => ({...a}));
        const filterList = list.filter(order => {
            order.jobs = order.jobs.filter(job => {
                return job.ref.name.toLowerCase().includes(value);
            });
            return order;
        });
        this.props.get_search_list_order(filterList);
    };

    render() {
        const list_order = Object.values(this.props.search_list_order);

        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по регламентным работам"
                               aria-label="Search" onChange={this.search_order}/>
                    </form>
                    <div className="col-sm-4 col-xl-2 mt-3">
                        <button className="btn btn-outline-danger col-12" data-toggle="modal"
                                data-target="#interactOrder">Добавить
                            работу
                        </button>
                    </div>
                </div>
                <table className="table mt-3 text-center">
                    <thead className="thead-light">
                    <tr className="d-flex">
                        <th className="col">Название</th>
                        <th className="col">Описание</th>
                        <th className="col">Периодичность</th>
                        <th className="col">Длительность</th>
                        <th className="col-1"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list_order.map((order, i) => {
                        return order.jobs.map((job, j) => {
                            job = job.ref;
                            return (
                                <tr key={i.toString() + j.toString()} className="d-flex">
                                    <td className="col">{job.name}</td>
                                    <td className="col">{job.description}</td>
                                    <td className="col">{job.serviceInterval}</td>
                                    <td className="col">{job.duration}</td>
                                    <td className="col-1">
                                        <button className="font-awesome-button" data-toggle="modal"
                                                data-target="#interactLocation">
                                            <i className="fas fa-pencil-alt"/>
                                        </button>
                                        <button type="button" className="btn delete_button">
                                            <i className="fas fa-trash-alt"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        });
                    })}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = ({listOrder}) => ({
    list_order: listOrder.list_order,
    search_list_order: listOrder.search_list_order
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_order,
            get_search_list_order
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)