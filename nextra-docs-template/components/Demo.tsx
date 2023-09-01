import { Hotline } from 'react-leaflet-hotline';
import MapWrapper from './map/MapWrapper';

import { data, options } from '../assets/constants';

export default function Demo() {
	return (
		<MapWrapper>
			<Hotline 
				data={data} 
				getLat={t => t.lat} 
				getLng={t => t.lng} 
				getVal={t => t.value}
				options={{...options, tolerance: 10}} />
		</MapWrapper>
	)
}
