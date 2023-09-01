import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

export default function MapWrapper( { ...props } ) { 

	const { children } = props;

	return (
        <div style={{position: 'relative', height: '500px'}}> 
            <MapContainer 
                center={[55.761, 12.518]} 
                zoom={17}
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
