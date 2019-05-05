import React, {Component} from 'react';
import * as allConst from '../../commonComponents/Const';
import $ from "jquery";

let user = {
    typeId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    account: {
        login: '',
        password: '',
        loginPhone: {
            value: ''
        }
    }
};

class AddEditDialogBox extends Component {
    setRole = (event) => {
        user.typeId = event.currentTarget.value;
    };
    clickButton = () => {
        user.lastName = $('#addLastName').val();
        user.firstName = $('#addFirstName').val();
        user.middleName = $('#addMiddleName').val();
        user.account.login = $('#addLogin').val();
        user.account.password = $('#addPassword').val();
        user.account.loginPhone.value = $('#addLoginPhone').val();
        if (user.typeId === '') user.typeId = 2;
        console.log(user);
        this.addUser();
    };
    addUser = () => {
        fetch(`${allConst.IP_HOST}` + '/api/user/add', {
            method: 'POST',
            headers: {'SessionToken': `${allConst.USER_DATA.sessionToken}`},
            body: JSON.stringify(user)
        }).then(function (response) {
            return response.json();
        }).then(data => {
            $('#addLastName').val('');
            $('#addFirstName').val('');
            $('#addMiddleName').val('');
            $('#addLogin').val('');
            $('#addPassword').val('');
            $('#addLoginPhone').val('');
        }).catch((error) => {
            console.log(error.message);
        });
    };
    editUser = () => {

    };

    render() {
        let itemsSetRoles = [];
        allConst.ROLES.forEach(function (itemMap, i) {
            itemsSetRoles.push(<option value={i} key={i}>{itemMap}</option>);
        });
        return (
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Создание / Редактирование</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body pt-4 pb-4">

                            <label htmlFor="lastName">Фамилия</label>
                            <input className="form-control" id="addLastName" type="search"
                                   placeholder="Введите фамилию" aria-label="Search"/>

                            <label htmlFor="firstName">Имя</label>
                            <input className="form-control" id="addFirstName" type="search"
                                   placeholder="Введите имя" aria-label="Search"/>

                            <label htmlFor="middleName">Отчетсво</label>
                            <input className="form-control" id="addMiddleName" type="search"
                                   placeholder="Введите отчество" aria-label="Search"/>

                            <label htmlFor="login">Логин</label>
                            <input className="form-control" id="addLogin" type="search"
                                   placeholder="Введите логин" aria-label="Search"/>

                            <label htmlFor="password">Пароль</label>
                            <input className="form-control" id="addPassword" type="search"
                                   placeholder="Введите пароль" aria-label="Search"/>

                            <label htmlFor="loginPhone">Телефон</label>
                            <input className="form-control" id="addLoginPhone" type="search"
                                   placeholder="Введите телефон" aria-label="Search"/>

                            <label htmlFor="role">Роль</label>
                            <select className="form-control" onClick={this.setRole}>
                                {itemsSetRoles}
                            </select>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-dismiss="modal"
                                    onClick={this.clickButton}>Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddEditDialogBox;