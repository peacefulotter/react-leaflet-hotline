
const React = require('react')

import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

const MapWrapper = window.MapWrapper = ( { style, ...props } ) => { 

	const { children } = props;

	return (
        <div style={{position: 'relative', width: '800px', height: '600px'}}> 
            <MapContainer 
                center={[55.761, 12.518]} 
                zoom={16}
                style={{width: '100%', height: '100%'}} 
            >
                <TileLayer
                    maxNativeZoom={18}
                    maxZoom={18}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { children }
            </MapContainer>
        </div>
  	)
}

export default MapWrapper;