
### Create your own Palette

```jsx harmony
import { useState, useEffect } from 'react';
import { Hotline } from 'react-leaflet-hotline';
import { defaultPalette } from 'react-leaflet-hotline/constants';

const foo = (i) => (Math.sin(i) + 1.1) / 2.5

const Demo = () => {
    const [palette, setPalette] = useState(defaultPalette)

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

    useEffect( () => {
        let i = 0;
        const interval = setInterval( () => {
            i += 0.1
            const t = foo(i)
            setPalette( prev => [prev[0], { ...prev[1], r: (1 - t) * 255, b: t * 255, t },prev[2]])
        }, [50])
        return () => clearInterval(interval)
    }, [])

    return (
        <MapWrapper>
            <Hotline 
                data={data} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{min: 1, max: 8, palette}} />
        </MapWrapper>
    )
}

<Demo />
```