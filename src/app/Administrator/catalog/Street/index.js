import React, {Component} from 'react';
import * as allConst from "../../../commonComponents/Const";

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
            console.log(data);
        }).catch((error) => {
            console.log(error.message);
        });
    };

    render() {
        return null;
    }
}
export default Street;