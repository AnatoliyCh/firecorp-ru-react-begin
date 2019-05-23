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
        data.forEach(function (itemData, iData) {
            itemData.typeStr = typeStreet.get(itemData.type);
        });
        data.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase())  return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        console.log(data);
        this.setState({isLoading: false});
    };

    render() {
        return (
            <Fragment>
                {
                    this.state.isLoading ? <div className="catalogSpinner"><SpinnerDanger/></div>
                        :
                        <Fragment>
                            <table className="table table-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                                </tbody>
                            </table>
                        </Fragment>
                }
            </Fragment>
        )
    }
}

export default Street;