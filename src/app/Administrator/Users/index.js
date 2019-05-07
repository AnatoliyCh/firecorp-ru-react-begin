import React, {Component, Fragment} from 'react';
import UsersList from './UsersList';
import {connect} from 'react-redux';
import {setArrayUserArrays} from '../Reducer';
import './styles.css';
import * as allConst from '../../commonComponents/Const';
import Loading from '../../commonComponents/Loading';

class Users extends Component {
    state = {
        isLoading: false,//загрузка
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIUsers();
    };

    getAPIUsers = () => {
        // eslint-disable-next-line
        fetch(`${allConst.IP_HOST}${allConst.ALL_USERS_PATH}`, {
            method: 'GET',
            headers: {'SessionToken': `${allConst.USER_DATA.sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.sortData(data);
        }).catch((error) => {
            console.log(error.message);
        });
    };
    sortData = (data) => {
        let usersLists = [];//итоговый массив групп пользователей
        allConst.ROLES.forEach(function (itemMap, i) {
            let usersNew = [];//отсортированные и обработанные пользователи
            data.forEach(function (itemData) {
                if (i === itemData.typeId) usersNew.push(itemData);//сортировка
            });
            usersLists.push({title: itemMap, data: usersNew});
        });
        this.props.setArrayUserArraysInStore(usersLists);
        this.setState({isLoading: false});
    };
    getListsToComponents = () => {
        let components = null;
        if (!!this.props.arrayUserArrays) {
            components = this.props.arrayUserArrays.map(function (item, i) {
                return <UsersList key={i} title={item.title} data={item.data}/>
            });
        }
        return components;
    };

    render() {
        return (
            <Fragment>
                {
                    this.state.isLoading ? <Loading/>
                        :
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-12">
                                    {this.getListsToComponents()}
                                </div>
                            </div>
                        </div>
                }
            </Fragment>
        )
    }
}
// приклеиваем данные из store
const mapStateToProps = store => {
    return store.administratorReducer;
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrayUserArraysInStore: array => dispatch(setArrayUserArrays(array)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)