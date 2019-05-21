import React, {Component, Fragment} from 'react';
import * as allConst from "../../../commonComponents/Const";
import '../styles.css';
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerDefault';

let typeStreet = new Map([
    [16, "Улица"],
    [32, "Проспект"],
    [48, "Шоссе"],
]);

class Street extends Component {
    state = {
        isLoading: false,//загрузка
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIStreets();
    };

    getAPIStreets = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_STREETS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.sortData(data);
        }).catch((error) => {
            console.log(error.message);
        });
    };

    sortData = (data) => {
        let streets = [];//sort список улиц
        data.forEach(function (itemData, iData) {
            streets.push({ name: itemData.name, typeStr: typeStreet.get(itemData.type), typeInt: itemData.type })
        });
        console.log(data);
        streets.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase())  return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        console.log(streets);
        this.setState({isLoading: false});
    };

    render() {
        return (
            <Fragment>
                {
                    this.state.isLoading ? <div className="catalogSpinner"><SpinnerDanger/></div>
                        :
                        <Fragment>

                        </Fragment>
                }
            </Fragment>
        )
    }
}

export default Street;