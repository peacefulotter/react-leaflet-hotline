
import { useMemo } from 'react';
import { data, options } from '../assets/constants';
import MapWrapper from "./map/MapWrapper";
import { Hotline } from 'react-leaflet-hotline';
import { HotlineEventHandlers } from 'react-leaflet-hotline/dist/types/types';

export default function Events() {

	const eventHandlers: HotlineEventHandlers = useMemo( () => ({
        click: (e, i, p) => console.log('clicked on line: ' + i),
		mouseover: (e, i, p) => p.setStyle({opacity: 0.5}),
        mouseout: (e, i, p) => p.setStyle({opacity: 0})
    }), [])

	return (
		<MapWrapper>
			<Hotline
				data={data} 
				getLat={t => t.lat} 
				getLng={t => t.lng} 
				getVal={t => t.value}
				options={{...options, tolerance: 10}}
				eventHandlers={eventHandlers} />
		</MapWrapper>
	)
}
