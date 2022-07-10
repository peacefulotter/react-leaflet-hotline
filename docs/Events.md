
### Move your mouse over and out / click on the hotline

```jsx harmony
import { useState, useMemo } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Events = () => {
    
    const [toggle, setToggle] = useState(false)

    const eventHandlers = useMemo( () => ({
        click: () => setToggle(prev => !prev),
        mouseover: () => setToggle(prev => !prev),
        mouseout: () => setToggle(prev => !prev)
    }), [setToggle]) 

    return (
        <MapWrapper>
            <Hotline 
                data={data} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{min: 1, max: 8, tolerance: 10, palette: toggle ? palette_2 : palette_1}} 
                eventHandlers={eventHandlers} />
        </MapWrapper>
    )
}

<Events />
```

## Using the useHotline hook
```jsx harmony
import { useState, useMemo} from 'react';
import { useHotline } from 'react-leaflet-hotline';

const HookEventHotline = () => {
    const [toggle, setToggle] = useState(false)

    const eventHandlers = useMemo( () => ({
        click: () => setToggle(prev => !prev), 
        mouseover: () => setToggle(prev => !prev),
        mouseout: () => setToggle(prev => !prev)
    }), [setToggle] ) 

    useHotline( { 
        data, 
        getLat: t => t.lat, 
        getLng: t => t.lng, 
        getVal: t => t.value, 
        options: {
            ...options,
            tolerance: 10, 
            palette: toggle ? palette_2 : palette_1
        }, 
        eventHandlers
    } )

    return null;
}

const Events = () => {
    return (
        <MapWrapper>
            <HookEventHotline />
        </MapWrapper>
    )
}

<Events />
```

## MultiPolyline

```jsx harmony
import { useState, useMemo } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Events = () => {

    const eventHandlers = useMemo( () => ({
        click: (e, i, p) => alert('clicked on line: ' + i),
        mouseover: (e, i, p) => p.setStyle({opacity: 0.5}),
        mouseout: (e, i, p) => p.setStyle({opacity: 0})
    }), [])

    return (
        <MapWrapper>  
            <Hotline 
                data={datas} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{min: 0, max: 5, tolerance: 10 }} 
                eventHandlers={eventHandlers} />
        </MapWrapper>
    )
}

<Events />
```