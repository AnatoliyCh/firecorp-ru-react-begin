import React, {Component, Fragment} from 'react'
import {bindActionCreators} from "redux";
import {withPolling} from "../../commonComponents/withPolling";
import {get_list_facility_coordinates} from './ducks'
import {connect} from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";

class Maps extends Component {

    render() {
        const mapData = {
            center: [55.011480, 82.931819],
            zoom: 12,
        };
        let coordinates = this.props.list_facility_coordinates ? this.props.list_facility_coordinates : {};
        coordinates = coordinates.map(coord => {
            return [coord[2], coord[1]]
        });

        return (
            <Fragment>
                <YMaps>
                    <Map defaultState={mapData} width={"100%"} height={600}>
                        {coordinates.map((coordinate, i) => <Placemark key={i.toString()} geometry={coordinate} />)}
                    </Map>
                </YMaps>
            </Fragment>
        );
    }
}

const mapStateToProps = ({listFacilityCoordinates}) => ({
    list_facility_coordinates: listFacilityCoordinates.list_facility_coordinates
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            get_list_facility_coordinates
        },
        dispatch
    );

export default withPolling(get_list_facility_coordinates)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Maps));
