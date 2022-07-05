
### Move your mouse over and out / click on the hotline

```jsx harmony
import { useState } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Events = () => {
    
    const [toggle, setToggle] = useState(false)

    return (
        <MapWrapper>
            <Hotline 
                data={data} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{min: 1, max: 8, tolerance: 10, palette: toggle ? palette_2 : palette_1}} 
                eventHandlers={{
                    click: (e) => setToggle(prev => !prev),
                    mouseover: (e) => setToggle(prev => !prev),
                    mouseout: (e) => setToggle(prev => !prev)
                }} />
        </MapWrapper>
    )
}

<Events />
```

## Using the useHotline hook
```jsx harmony
import { useState } from 'react';
import { useHotline } from 'react-leaflet-hotline';

const HookEventHotline = () => {
    const [toggle, setToggle] = useState(false)

    const update = () => setToggle(prev => !prev)

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
        eventHandlers: {
            click: update, 
            mouseover: update,
            mouseout: update
        } 
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
import { useState } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Events = () => {
    
    const [toggle, setToggle] = useState(false)

    return (
        <MapWrapper>
            <Hotline 
                data={datas} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={{min: 1, max: 8, tolerance: 10, palette: toggle ? palette_2 : palette_1}} 
                eventHandlers={{
                    click: (e, i, p) => alert('clicked on line: ' + i),
                    mouseover: (e, i, p) => p.setStyle({opacity: 0.5}),
                    mouseout: (e, i, p) => p.setStyle({opacity: 0})
                }} />
        </MapWrapper>
    )
}

<Events />
```