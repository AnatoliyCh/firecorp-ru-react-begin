import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import $ from 'jquery';
import './styles.css';
import * as allConst from "../../commonComponents/Const";
import SpinnerDanger from '../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';

class Contractor extends Component {
    state = {
        isLoading: false,//загрузка
        contractor: [],//контрагент
        facilityes: [],//объекты
        city: [],
        street: [],
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIData();
    };

    getAPIData = async () => {
        try {
            const contractorL = await fetch(`${allConst.IP_HOST}${allConst.ALL_CONTRACTOR_PATH}`, {
                method: 'GET',
                headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            });
            const cityL = await fetch(`${allConst.IP_HOST}${allConst.PATH_CITY_ACTUAL}`, {
                method: 'GET',
                headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            });
            const streetL = await fetch(`${allConst.IP_HOST}${allConst.PATH_STREETS_ACTUAL}`, {
                method: 'GET',
                headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            });
            this.setState({contractor: await contractorL.json()});
            this.setState({city: await cityL.json()});
            this.setState({street: await streetL.json()});
        } catch (e) {
            console.log(e.message);
        }

        let tmmpId = -1;
        (this.state.contractor).forEach((itemMap, i) => {
            if (itemMap.user.oid === allConst.getCurrentUser().oid) tmmpId = i;
        });
        if (tmmpId !== -1) this.setState({contractor: this.state.contractor[tmmpId]});
        this.setState({facilityes: this.state.contractor.facilityes});
        console.log(this.state.contractor);
        console.log(this.state.facilityes);
        console.log(this.state.city);
        console.log(this.state.street);
        this.setState({isLoading: false});
    };

    render() {
        let map = [];
        if (this.state.facilityes !== [])
            map = this.state.facilityes.map(function(item, i) {
                return (
                    <tr key={i}>
                        <th>{item.name}</th>
                        <td className="oid" scope="row">{item.oid}</td>
                    </tr>
                )
            });
        return (
            <Fragment>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationServer01">Название</label>
                            <label className="form-control" id="name">{this.state.contractor.name}</label>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationServer02">ИНН</label>
                            <label className="form-control" id="inn">{this.state.contractor.INN}</label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer01">Нас. пункт</label>
                            <label className="form-control" id="name">Новосибирск</label>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer02">Улица</label>
                            <label className="form-control" id="inn">Новосибирск</label>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer02">Дом</label>
                            <label className="form-control" id="inn">136</label>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer02">Офис</label>
                            <label className="form-control" id="inn">311</label>
                        </div>
                    </div>
                    <table id="tbl" className="table table-sm table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th id="1" className="oidTHead tableHeader" scope="col">Название</th>
                            <th id="2" className="width_10 tableHeader" scope="col">Oid</th>
                        </tr>
                        </thead>
                        <tbody>
                        {map}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }
}

export default Contractor;