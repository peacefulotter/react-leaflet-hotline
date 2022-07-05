
### Move your mouse over and out / click on the hotline

```jsx harmony
import { useState } from 'react';
import { Hotline } from 'react-leaflet-hotline';

const Events = () => {
    
    const [toggle, setToggle] = useState(false)

    const palette_1 = [
        { r: 50,  g: 50,  b: 200, t: 0   },
        { r: 50,  g: 200, b: 50,  t: 0.5 },
        { r: 200, g: 50,  b: 50,  t: 1   }
    ]

    const palette_2 = [
        { r: 200, g: 50,  b: 50,  t: 0   },
        { r: 50,  g: 200, b: 50,  t: 0.5 },
        { r: 50,  g: 50,  b: 200, t: 1   }
    ]

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