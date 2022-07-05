
The palette can be dynamically updated, here is a demo of a palette changing every 50ms. 

```jsx harmony
import { useState, useEffect } from 'react';
import { Hotline } from 'react-leaflet-hotline';
import { defaultPalette } from 'react-leaflet-hotline/constants';

const Demo = () => {
    const [palette, setPalette] = useState(defaultPalette)

    useEffect( () => {
        let i = 0;
        const interval = setInterval( () => {
            const t = (Math.sin(i++ / 10) + 1.1) / 2.5
            setPalette( prev => [prev[0], { ...prev[1], r: (1 - t) * 255, b: t * 255, t },prev[2]])
        }, 50 )
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