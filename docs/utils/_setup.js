
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

const datas = window.datas = [ 
    [ 
        { lat:  55.7620299 , lng:  12.5197298 } , 
        { lat:  55.7615605 , lng:  12.5194112 } , 
        { lat:  55.7612883 , lng:  12.5192078 } , 
        { lat:  55.7604757 , lng:  12.5184575 } , 
        { lat:  55.7598755 , lng:  12.5177353 } , 
        { lat:  55.7593927 , lng:  12.5170125 } , 
        { lat:  55.759348 , lng:  12.516951 } , 
        { lat:  55.7587234 , lng:  12.5158659 } , 
        { lat:  55.7584996 , lng:  12.5153929 } , 
        { lat:  55.758321 , lng:  12.5149273 } , 
    ],
    [ 
        { lat:  55.758321 , lng:  12.5149273 } , 
        { lat:  55.7581976 , lng:  12.5146287 } , 
        { lat:  55.7580203 , lng:  12.5141716 } , 
        { lat:  55.7578186 , lng:  12.5135902 } , 
        { lat:  55.7576422 , lng:  12.512996 } , 
        { lat:  55.7575094 , lng:  12.5124947 } , 
        { lat:  55.7573451 , lng:  12.5117588 } , 
    ],
    [ 
        { lat:  55.7573451 , lng:  12.5117588 } , 
        { lat:  55.7571885 , lng:  12.5109398 } , 
        { lat:  55.7570511 , lng:  12.5099903 } , 
        { lat:  55.7569649 , lng:  12.5092035 } , 
        { lat:  55.7569006 , lng:  12.5084274 } , 
        { lat:  55.7568135 , lng:  12.5072102 } , 
        { lat:  55.7564468 , lng:  12.5017979 } , 
        { lat:  55.7562551 , lng:  12.5000782 } , 
        { lat:  55.7560973 , lng:  12.4989658 } , 
        { lat:  55.7558649 , lng:  12.4975944 } , 
        { lat:  55.7555562 , lng:  12.4961369 } , 
        { lat:  55.7551958 , lng:  12.4947253 } , 
        { lat:  55.7547585 , lng:  12.4932952 } , 
        { lat:  55.7534076 , lng:  12.4893949 } , 
        { lat:  55.7527315 , lng:  12.4874263 } , 
        { lat:  55.7523845 , lng:  12.486281 } , 
        { lat:  55.7521354 , lng:  12.4853538 } , 
        { lat:  55.7518816 , lng:  12.4843637 } , 
        { lat:  55.7516148 , lng:  12.483166 } , 
    ]
]

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