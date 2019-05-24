import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import '../styles.css';
import '../../../commonComponents/styles.css';
import * as allConst from "../../../commonComponents/Const";
import {setArrImplements} from "../../Reducer";
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';
import TableImplements from "./TableImplements";

class Implements extends Component {
    state = {
        isLoading: false,//загрузка
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPICities();
    };

    getAPICities = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_IMPLEMENTS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.props.setArrImplementsFunc(this.sortData(data));
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

    render() {
        return (
            <Fragment>
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