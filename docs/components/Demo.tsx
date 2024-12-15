import { data, options } from '../assets/constants'
import MapWrapper from './map/MapWrapper'
import { Hotline } from 'react-leaflet-hotline'

export default function Demo() {
  return (
    <MapWrapper>
      <Hotline
        data={data}
        getLat={({ point }) => point.lat}
        getLng={({ point }) => point.lng}
        getVal={({ point }) => point.value}
        options={{ ...options, tolerance: 10 }}
      />
    </MapWrapper>
  )
}
