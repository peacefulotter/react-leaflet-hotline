import dynamic from "next/dynamic";

import { data, options } from '../assets/constants';

const MapWrapper = dynamic(() => import("./map/MapWrapper"), {
	ssr: false
});
import { Hotline } from 'react-leaflet-hotline';

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
