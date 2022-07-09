
Data changing over dynamically doesn't leave an empty canvas behind
```jsx harmony
import { useState, useEffect } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Demo = () => {

    const [g, s] = useState(data)

    useEffect( () => {
        const interval = setInterval( () => {
            s( p => [...p, { lat: Math.random() * 50, lng: Math.random() * 50, value: 0}])
        }, 5000 )
    }, [])

    return (
        <MapWrapper>
            <Hotline 
                data={g} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={options}
                eventHandlers={{
                    'click': () => console.log('click'),
                    'mouseover': () => console.log('mouseover')
                }} />
        </MapWrapper>
    )
}

<Demo />
```