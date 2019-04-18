import React, {Fragment} from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';

$('.modal').modal('toggle');

const Locations = () => (
    <Fragment>
        <div className="container-fluid">
            <div className="row">
                <form className="col-sm-8 col-xl-10 mt-3">
                    <input className="form-control" type="search" placeholder="Поиск" aria-label="Search"/>
                </form>
                <div className="col-sm-4 col-xl-2 mt-3">
                    <button className="btn btn-outline-danger col-12" data-toggle="modal"
                            data-target="#myModal">Добавить локацию
                    </button>
                </div>
            </div>
            <table className="table mt-3">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Кол-во объектов</th>
                    <th scope="col">Техники</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </div>

        {/*Модальное окно добавления локации*/}
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 className="modal-title">Создание локации</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body pt-4 pb-4">
                        <label htmlFor="addLocation">Название</label>
                        <input className="form-control" id="addLocation" type="search" placeholder="Введите название локации" aria-label="Search"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Locations