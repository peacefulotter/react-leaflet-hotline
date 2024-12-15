import { Hotline } from 'react-leaflet-hotline'

import MapWrapper from './map/MapWrapper'
import { datas, options } from '../assets/constants'
import { useMemo } from 'react'
import { HotlineEventHandlers } from 'react-leaflet-hotline/dist/types/types'

export default function MultiPolyline() {
  const eventHandlers: HotlineEventHandlers = useMemo(
    () => ({
      click: ({ line }) => console.log('clicked on line:', line),
      mouseover: ({ polyline }) => polyline.setStyle({ opacity: 0.5 }),
      mouseout: ({ polyline }) => polyline.setStyle({ opacity: 0 }),
    }),
    [],
  )

  return (
    <MapWrapper center={[55.759, 12.514]}>
      <Hotline
        data={datas}
        getLat={({ point }) => point.lat}
        getLng={({ point }) => point.lng}
        getVal={({ point }) => point.value}
        options={{ ...options, min: 0, max: 5, tolerance: 20 }}
        eventHandlers={eventHandlers}
      />
    </MapWrapper>
  )
}
