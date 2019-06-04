import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrCities} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableCities from "./TableCities";

let typeCity = new Map([
    [1, "Город"],
    [2, "Посёлок"],
]);

class City extends Component {
    state = {
        isLoading: false,//загрузка
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPICities();
    };

    getAPICities = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_CITY_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.props.setArrCitiesFunc(this.sortData(data));
            this.setState({isLoading: false});
        }).catch((error) => {
            console.log(error.message);
        });
    };

    sortData = (data) => {
        data.forEach((itemData) => itemData.typeStr = typeCity.get(itemData.type));
        data.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        return data;
    };

    render() {
        return (
            <Fragment>
                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableCities/>}
            </Fragment>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        arrCities: store.administratorReducer.arrCities,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrCitiesFunc: arr => dispatch(setArrCities(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)