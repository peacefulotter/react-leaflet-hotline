
import { Hotline } from 'react-leaflet-hotline';

import MapWrapper from "./map/MapWrapper";
import { datas, options } from '../assets/constants';

type T = {
    lat: number; lng: number; value: number;
}

export default function MultiPolyline() {
    return (
        <MapWrapper>  
            <Hotline 
                data={datas} 
                getLat={(t: any) => t.lat} 
                getLng={(t: any) => t.lng} 
                getVal={(t: any) => t.value}
                options={{ ...options, min: 0, max: 5, tolerance: 10 }}  />
        </MapWrapper>
    )
}