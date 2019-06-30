import React, {Component, Fragment} from 'react';
import $ from 'jquery';
import './styles.css';
import * as allConst from "../../commonComponents/Const";
import SpinnerDanger from '../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';

class Contractor extends Component {
    state = {
        isLoading: false,//загрузка
        contractor: [],//контрагент
        address: [],//адресс
        facilityes: [],//объекты
        city: [],//нас. пункты
        street: [],//улицы
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
        this.setState({address: this.state.contractor.address});
        this.state.street.forEach((itemData, i) => {
            if (itemData.name === this.state.address.street) {
                let a = this.state.street;
                a[0] = itemData;
                a[i] = this.state.street[0];
                this.setState({street: a});
            }
        });

        this.state.city.forEach((itemData, i) => {
            if (itemData.name === this.state.address.city) {
                let a = this.state.city;
                a[0] = itemData;
                a[i] = this.state.city[0];
                this.setState({city: a});
            }
        });
        this.setState({isLoading: false});
    };

    setCity =  (e) => {
        let newAddress = this.state.address;
        newAddress.city = e.currentTarget.value;
        this.setState({address: newAddress});
};

    setStreet = (e) => {
        let newAddress = this.state.address;
        newAddress.street = e.currentTarget.value;
        this.setState({address: newAddress});
    };

    save = () => {
        let title = $('#title').val();
        let inn = $('#inn').val();
        let home = $('#home').val();
        let office = $('#office').val();
        let newContractor = this.state.contractor;
        if (title === "" || title === " ") return null;
        else {
            newContractor.name = title;
            newContractor.INN = inn;
            newContractor.address = this.state.address;
            newContractor.address.home = home;
            newContractor.address.office = office;
        }
        fetch(`${allConst.IP_HOST}${allConst.PATH_CONTRACTOR_UPDATE}`, {
            method: 'POST',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            body: JSON.stringify(newContractor),
        }).then(function (response) {
            return response.json();
        }).then(data => {
            window.location.reload();
        }).catch((error) => {
            console.log(error.message);
        });

    };

    render() {
        let map = [];
        if (this.state.facilityes !== [])
            map = this.state.facilityes.map(function (item, i) {
                return (
                    <tr key={i}>
                        <th>{item.name}</th>
                        <td className="oid" scope="row">{item.oid}</td>
                    </tr>
                )
            });

        let currentCity = [];
        this.state.city.forEach(function (itemMap, i) {
            currentCity.push(<option value={itemMap.name} key={i}>{itemMap.name}</option>);
        });
        let currentStreet = [];
        this.state.street.forEach(function (itemMap, i) {
            currentStreet.push(<option value={itemMap.name} key={i}>{itemMap.name}</option>);
        });
        return (
            <Fragment>
                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> :
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="validationServer01">Название</label>
                                <input className="form-control" id="title" type="search"
                                       placeholder="Введите название" aria-label="Search"
                                       defaultValue={this.state.contractor.name}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="validationServer02">ИНН</label>
                                <input className="form-control" id="inn" type="search"
                                       placeholder="Введите название" aria-label="Search"
                                       defaultValue={this.state.contractor.INN}/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="validationServer01">Нас. пункт: {this.state.address.city}</label>
                                <select id="currentCity" className="form-control" onClick={this.setCity}>
                                    {currentCity}
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="validationServer02">Улица: {this.state.address.street}</label>
                                <select id="currentStreet" className="form-control" onClick={this.setStreet}>
                                    {currentStreet}
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="validationServer02">Дом</label>
                                <input className="form-control" id="home" type="search"
                                       placeholder="Введите дом" aria-label="Search"
                                       defaultValue={this.state.address.home}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="validationServer02">Офис</label>
                                <input className="form-control" id="office" type="search"
                                       placeholder="Введите офис" aria-label="Search"
                                       defaultValue={this.state.address.office}/>
                            </div>
                        </div>
                        <div className="row justify-content">
                            <div className="col-md-3 mb-3">
                                <button type="button" id="save" className="btn btn-outline-danger" data-dismiss="modal"
                                        onClick={this.save}>Сохранить
                                </button>
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
                }
            </Fragment>
        )
    }
}

export default Contractor;