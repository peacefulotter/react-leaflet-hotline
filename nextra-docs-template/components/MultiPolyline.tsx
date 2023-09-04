
import { Hotline } from 'react-leaflet-hotline';

import MapWrapper from "./map/MapWrapper";
import { datas, options } from '../assets/constants';
import { useMemo } from 'react';
import { HotlineEventHandlers } from 'react-leaflet-hotline/dist/types/types';

export default function MultiPolyline() {

    const eventHandlers: HotlineEventHandlers = useMemo( () => ({
        click: (e, i, p) => console.log('clicked on line: ' + i),
		mouseover: (e, i, p) => p.setStyle({opacity: 0.5}),
        mouseout: (e, i, p) => p.setStyle({opacity: 0})
    }), [])

    return (
        <MapWrapper center={[55.7590, 12.514]}>  
            <Hotline 
                data={datas} 
                getLat={(t: any) => t.lat} 
                getLng={(t: any) => t.lng} 
                getVal={(t: any) => t.value}
                options={{ ...options, min: 0, max: 5, tolerance: 20}}
                eventHandlers={eventHandlers}  />
        </MapWrapper>
    )
}