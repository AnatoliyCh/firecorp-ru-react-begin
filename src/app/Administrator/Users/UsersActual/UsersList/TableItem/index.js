import React, {Component} from 'react';
import {connect} from "react-redux";
import './styles.css';
import $ from "jquery";
import {setDialogMode} from "../../../../../commonComponents/Reducer";
import {setIndexUserToArray, setAPIUserInArchive} from "../../../../Reducer";
import * as allConst from "../../../../../commonComponents/Const";

class TableItem extends Component {
    btnEdit = () => {
        this.props.setDialogModeFunc(1);//редактирование
        this.props.setIndexUserToArrayFunc([this.props.indArr, this.props.indItem]);//указываем где находится данный пользователь
        $('#addLastName').val(this.props.data.lastName);
        $('#addFirstName').val(this.props.data.firstName);
        $('#addMiddleName').val(this.props.data.middleName);
        $('#addLogin').val(this.props.data.account.login);
        $('#addPassword').val(this.props.data.account.password);
        $('#addLoginPhone').val(this.props.data.account.loginPhone.value);
        $('#selectRole').val(this.props.data.typeId);
        $('#headerModal').html("Редактирование");
        $('#btn').html("Обновить");
    };
    btnArchive = () => {
        let tmpUser = this.props.data;
        tmpUser.valid = false;
        fetch(`${allConst.IP_HOST}${allConst.PATH_API_USER_UPDATE}`, {
            method: 'POST',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
            body: JSON.stringify(tmpUser),
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if (data === "") {
                this.props.setIndexUserToArrayFunc([this.props.indArr, this.props.indItem]);
                this.props.setUserInArrayFunc();
            }
        }).catch((error) => {
            console.log(error.message);
        });
    };

    render() {
        return (
            <tr>
                <td id="tdImage">
                    <img src={require('../../../../../../static/EmptyUser.jpg')} width="40" height="40" alt=""/>
                </td>
                <td id="tdName">{this.props.data.lastName} {this.props.data.firstName} {this.props.data.middleName}</td>
                <td id="tdLogin"> Логин: {this.props.data.account.login !== "" ? this.props.data.account.login : "--"}</td>
                <td id="tdPassword"> Пароль: {this.props.data.account.password !== "" ? this.props.data.account.password : "--"}</td>
                <td id="tdLoginPhone"> Телефон: {this.props.data.account.loginPhone.value !== "" ? this.props.data.account.loginPhone.value : "--"}</td>
                <td id="tdEdit" className="align-middle">
                    <button className="btn btn-outline-secondary"
                            data-toggle="modal" data-target="#myModal" onClick={this.btnEdit}>
                        <i className="fas fa-user-edit fa-lg"/>
                    </button>
                </td>
                <td id="tdArchive" className="align-middle">
                    <button className="btn btn-outline-secondary" onClick={this.btnArchive}>
                        <i className="far fa-file-archive fa-lg"/>
                    </button>
                </td>
            </tr>
        )
    }
};
// приклеиваем данные из store
const mapStateToProps = store => {
    return store.administratorReducer;
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setDialogModeFunc: mode => dispatch(setDialogMode(mode)),
        setUserInArrayFunc: () => dispatch(setAPIUserInArchive()),
        setIndexUserToArrayFunc: indUserArr => dispatch(setIndexUserToArray(indUserArr)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableItem)