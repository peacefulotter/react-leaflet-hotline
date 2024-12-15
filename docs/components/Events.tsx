import { useMemo } from 'react'
import { data, options } from '../assets/constants'
import MapWrapper from './map/MapWrapper'
import { Hotline } from 'react-leaflet-hotline'
import { HotlineEventHandlers } from 'react-leaflet-hotline/dist/types/types'

export default function Events() {
  const eventHandlers: HotlineEventHandlers = useMemo(
    () => ({
      click: ({ line }) => console.log('clicked on line:', line),
      mouseover: ({ polyline }) => polyline.setStyle({ opacity: 0.5 }),
      mouseout: ({ polyline }) => polyline.setStyle({ opacity: 0 }),
    }),
    [],
  )

  return (
    <MapWrapper>
      <Hotline
        data={data}
        getLat={({ point }) => point.lat}
        getLng={({ point }) => point.lng}
        getVal={({ point }) => point.value}
        options={{ ...options, tolerance: 10 }}
        eventHandlers={eventHandlers}
      />
    </MapWrapper>
  )
}
