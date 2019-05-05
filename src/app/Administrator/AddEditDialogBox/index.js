import React, {Component, Fragment} from 'react';
import * as allConst from '../../commonComponents/Const';
import Users from "../Users";

class AddEditDialogBox extends Component {
    render() {
        return (
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Создание локации</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body pt-4 pb-4">
                            <label htmlFor="addLocation">Название</label>
                            <input className="form-control" id="addLocation" type="search"
                                   placeholder="Введите название локации" aria-label="Search"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddEditDialogBox;