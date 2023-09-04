import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

export default function MapWrapper( { ...props } ) { 

	const { center, children } = props;

	return (
        <div className='relative h-[500px] mt-5 z-0'> 
            <MapContainer 
                center={center ?? [55.7605, 12.518]} 
                zoom={16}
                style={{width: '100%', height: '100%'}}
                preferCanvas={true} 
            >
                <TileLayer
                    maxNativeZoom={18}
                    maxZoom={18}
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                { children }
            </MapContainer>
        </div>
  	)
}
