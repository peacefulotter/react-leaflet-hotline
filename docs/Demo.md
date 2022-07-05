
```jsx harmony
import { Hotline } from 'react-leaflet-hotline';

const Demo = () => {
    return (
        <MapWrapper>
            <Hotline 
                data={data} 
                getLat={t => t.lat} 
                getLng={t => t.lng} 
                getVal={t => t.value}
                options={options} />
        </MapWrapper>
    )
}

<Demo />
```