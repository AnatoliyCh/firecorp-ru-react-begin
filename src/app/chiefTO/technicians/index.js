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
                                <option>Пидор</option>
                                )}
                            </select>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

export default Technicians
