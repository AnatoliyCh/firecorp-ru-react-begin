import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrComponentType} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableComponentTypes from "./TableComponentTypes";

class ComponentType extends Component {
    state = {
        isLoading: false,//загрузка
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPICities();
    };

    getAPICities = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_COMPONENTTYPE_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.props.setArrComponentTypeFunc(this.sortData(data));
            this.setState({isLoading: false});
            console.log(data);
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

    render() {
        return (
            <Fragment>
                {this.state.isLoading ? <div className="divSpinner"><SpinnerDanger/></div> : <TableComponentTypes/>}
            </Fragment>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        arrComponentType: store.administratorReducer.arrComponentType,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrComponentTypeFunc: arr => dispatch(setArrComponentType(arr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentType)