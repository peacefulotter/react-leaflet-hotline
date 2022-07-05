
The palette can be dynamically updated, here is a demo of a palette changing every 50ms. 

```jsx harmony
import { useState, useEffect } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Demo = () => {

    const c1 = { r: 70,  g: 70, b: 255, t: 0 }
    const c2 = { r: 255, g: 70, b: 70,  t: 1 } 

    const [palette, setPalette] = useState( [ c1, c2 ] )

    useEffect( () => {
        let i = 0;
        const interval = setInterval( () => {
            const t = (Math.sin(i++ / 10) + 1.1) / 2
            setPalette( [ c1, {...c2, t } ] )
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