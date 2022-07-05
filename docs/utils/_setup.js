
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

const data = window.data = [
    { lat: 55.7620299, lng: 12.5197298, value: 1 },
    { lat: 55.7615605, lng: 12.5194112, value: 2 },
    { lat: 55.7612883, lng: 12.5192078, value: 3 },
    { lat: 55.7604757, lng: 12.5184575, value: 4 },
    { lat: 55.7598755, lng: 12.5177353, value: 8 },
    { lat: 55.7593927, lng: 12.5170125, value: 6 },
    { lat: 55.7593480, lng: 12.5169510, value: 4 },
    { lat: 55.7587234, lng: 12.5158659, value: 2 },
]

export default { MapWrapper, data };