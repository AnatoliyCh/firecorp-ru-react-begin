import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrImplements} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableImplements from "./TableImplements";
import $ from "jquery";

class Implements extends Component {
    state = {
        isLoading: false,//загрузка

        arrImplements: [],
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIImplements();
    };

    getAPIImplements = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_IMPLEMENTS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log(data);
            data = this.sortData(data);
            this.setState({arrImplements: data});
            this.props.setArrImplementsFunc(data);
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
        if (tmpStr === "" || tmpStr === " ") this.props.setArrImplementsFunc(this.state.arrImplements);
        else this.filtration();
    };

    filtration = () => {
        let filteredArr = [];
        let regExp = new RegExp($('#search').val());
        this.state.arrImplements.forEach((itemData, iData) =>{
            if (itemData.name.search(regExp) !== -1) filteredArr.push(itemData);
        });
        this.props.setArrImplementsFunc(filteredArr);
    };

    ////при нажатии кнопки id="btnModal"
    modalBtnClick = () => {
        let title = $('#title').val();
        let count = $('#count').val();
        let newObject = {};
        if (title === "" || title === " ") return null;
        else {
            newObject = {
                currentNubmer: count,
                name: title,
            };
            fetch(`${allConst.IP_HOST}${allConst.PATH_IMPLEMENTS_ADD}`, {
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

    render() {
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
                                <label htmlFor="lastName"> Название </label>
                                <input className="form-control" id="title" type="search"
                                       placeholder="Введите название" aria-label="Search"/>
                                <label htmlFor="role"> Тип </label>
                                <input className="form-control" id="count" type="number"
                                       placeholder="Введите количество" aria-label="Search"/>
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
                            <input id="search" className="form-control" type="search" placeholder="Поиск по инвентарю"
                                   aria-label="Search" onChange={this.search}/>
                        </div>
                        <div className="btn-group col-sm-4 col-xl-5 mt-3">
                            <div className="form-group">
                                <button id="btnNewStreet" className="btn btn-outline-secondary" onClick={null} data-toggle="modal" data-target="#myModal">
                                    <i className="fas fa-plus fa-lg"/> Создание марки
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableImplements/>}
            </Fragment>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        arrImplements: store.administratorReducer.arrImplements,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrImplementsFunc: arr => dispatch(setArrImplements(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Implements)