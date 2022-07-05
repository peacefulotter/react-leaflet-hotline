
const React = require('react')

import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

const MapWrapper = window.MapWrapper = ( { style, ...props } ) => { 

	const { children } = props;

	return (
        <div style={{position: 'relative', height: '500px'}}> 
            <MapContainer 
                center={[55.761, 12.518]} 
                zoom={16}
                style={{width: '100%', height: '100%'}}
                preferCanvas={true} 
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

const datas = window.datas = [ data, [
    { lat: 55.7593927, lng: 12.5140125, value: 6 },
    { lat: 55.7593480, lng: 12.5129510, value: 4 },
    { lat: 55.7587234, lng: 12.5108659, value: 2 },
] ]

const options = window.options = {
    min: 1, 
    max: 8, 
}

const palette_1 = window.palette_1 = [
    { r: 50,  g: 50,  b: 200, t: 0   },
    { r: 50,  g: 200, b: 50,  t: 0.5 },
    { r: 200, g: 50,  b: 50,  t: 1   }
]

const palette_2 = window.palette_2 = [
    { r: 200, g: 50,  b: 50,  t: 0   },
    { r: 50,  g: 200, b: 50,  t: 0.5 },
    { r: 50,  g: 50,  b: 200, t: 1   }
]

export default { MapWrapper, data, datas, options, palette_1, palette_2 };