import React, {Component, Fragment} from 'react'

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';

$('#addLocation').modal('toggle');
$('#editLocation').modal('toggle');

var keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
};

class Calendar extends Component {
    constructor(props) {
        super(props);

        const groups = [
            {id: 1, title: 'group 1'},
            {id: 2, title: 'group 2'}
        ];

        const items = [
            {id: 1, group: 1, title: 'item 1', start: moment(), end: moment().add(1, 'hour')},
            {id: 2, group: 2, title: 'item 2', start: moment().add(-0.5, 'hour'), end: moment().add(0.5, 'hour')},
            {id: 3, group: 1, title: 'item 3', start: moment().add(2, 'hour'), end: moment().add(3, 'hour')}
        ];
        const defaultTimeStart = moment()
            .startOf("day")
            .toDate();
        const defaultTimeEnd = moment()
            .startOf("day")
            .add(1, "day")
            .toDate();

        this.state = {
            groups,
            items,
            defaultTimeStart,
            defaultTimeEnd
        };
    }

    handleItemMove = (itemId, dragTime, newGroupOrder) => {
        const {items, groups} = this.state;

        const group = groups[newGroupOrder];

        this.setState({
            items: items.map(item =>
                item.id === itemId
                    ? Object.assign({}, item, {
                        start: dragTime,
                        end: dragTime + (item.end - item.start),
                        group: group.id
                    })
                    : item
            )
        });

        console.log("Moved", itemId, dragTime, newGroupOrder);
    };

    handleItemResize = (itemId, time, edge) => {
        const {items} = this.state;

        this.setState({
            items: items.map(item =>
                item.id === itemId
                    ? Object.assign({}, item, {
                        start: edge === "left" ? time : item.start,
                        end: edge === "left" ? item.end : time
                    })
                    : item
            )
        });

        console.log("Resized", itemId, time, edge);
    };

    render() {

        const {groups, items, defaultTimeStart, defaultTimeEnd} = this.state;

        return (
            <Fragment>
                <div className="row mt-3 mb-3 float-right">
                    <button className="btn btn-outline-danger mr-3" data-toggle="modal"
                            data-target="#addMaintenance">Добавить заявку
                    </button>
                </div>

                <Timeline
                    groups={groups}
                    items={items}
                    keys={keys}
                    fullUpdate
                    itemTouchSendsClick={false}
                    stackItems
                    itemHeightRatio={0.75}
                    canMove={true}
                    canResize={"both"}
                    defaultTimeStart={defaultTimeStart}
                    defaultTimeEnd={defaultTimeEnd}
                    onItemMove={this.handleItemMove}
                    onItemResize={this.handleItemResize}
                    minZoom={60 * 60 * 1000 * 24}
                    maxZoom={30.43 * 86400 * 1000}
                />

                {/*Модальное окно добавления заявки*/}
                <div id="addMaintenance" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Создание заявки</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body pt-4 pb-4">
                                <label htmlFor="addLocation">Название</label>
                                <input className="form-control" id="addLocation" type="search"
                                       placeholder="Введите название объекта" aria-label="Search"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Calendar