import React, {Component, Fragment} from 'react'

class Technicians extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по сотрудникам"
                               aria-label="Search"/>
                    </form>

                    <div className="btn-group col-sm-4 col-xl-2 mt-3">
                        <div className="form-group">
                            <select className="form-control" id="addProfessor">
                                <option className="dropdown-item" disabled selected>Статус</option>
                                <option className="dropdown-item">Уволен</option>
                                <option>В отпуске</option>
                                )}
                            </select>
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
            </Fragment>
        )
    }
}

export default Technicians
