import React, {Component, Fragment} from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';

$('#addLocation').modal('toggle');
$('#editLocation').modal('toggle');

class Calender extends Component {


    state = {
        week: []
    };

    getMonday(d) {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    initialWeek() {
        //return ([this.getMonday(new Date()).getDate() )
    }
    render() {
        return (
            <Fragment>
                <div className="row">

                </div>
                <table className="table mt-3 text-center">
                    <thead className="thead-light">
                    <tr className="d-flex">
                        <th className="col">{/*this.state.week.getDate()*/}</th>
                        <th className="col">Пн</th>
                        <th className="col">Вт</th>
                        <th className="col-1">Ср</th>
                        <th className="col">Чт</th>
                        <th className="col">Пт</th>
                        <th className="col">Сб</th>
                        <th className="col-1">Вс</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default Calender