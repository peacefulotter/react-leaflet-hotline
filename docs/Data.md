
Data changing over dynamically doesn't leave an empty canvas behind
```jsx harmony
import { useState, useEffect, useMemo } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Demo = () => {

    const [g, s] = useState(data)

    useEffect( () => {
        const interval = setInterval( () => {
            s( p => [...p, { lat: Math.random() * 50, lng: Math.random() * 50, value: 0}])
        }, 5000 )
    }, [])

    const eventHandlers = useMemo( () => ({
        'mouseover': (e, i, p) => p.setStyle( { color: '#e6e', opacity: 0.5 } ),
        'mouseout': (e, i, p) => p.setStyle( {opacity: 0 } ),
        'mousedown': (e, i, p) => p.setStyle( {opacity: 1 } ),
        'mouseup': (e, i, p) => p.setStyle( {opacity: 0.5 } ),
    }), [])

    return (
        <MapWrapper>
            <Hotline 
                data={g} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{...options, tolerance: 10}}
                eventHandlers={eventHandlers} />
        </MapWrapper>
    )
}

<Demo />
```