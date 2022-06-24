
```jsx harmony
import { Hotline } from 'react-leaflet-hotline';


const Demo = () => {
    const data = [
        { lat: 55.7620299, lng: 12.5197298, value: 1 },
        { lat: 55.7615605, lng: 12.5194112, value: 2 },
        { lat: 55.7612883, lng: 12.5192078, value: 3 },
        { lat: 55.7604757, lng: 12.5184575, value: 4 },
        { lat: 55.7598755, lng: 12.5177353, value: 8 },
        { lat: 55.7593927, lng: 12.5170125, value: 6 },
        { lat: 55.7593480, lng: 12.5169510, value: 4 },
        { lat: 55.7587234, lng: 12.5158659, value: 2 },
    ]
    return (
        <MapWrapper>
            <Hotline 
                data={data} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{min: 1, max: 8}} />
        </MapWrapper>
    )
}

<Demo />
```