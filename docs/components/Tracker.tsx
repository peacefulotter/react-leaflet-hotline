import { ChangeEventHandler, useState } from 'react'
import { data, options } from '../assets/constants'
import MapWrapper from './map/MapWrapper'
import { Hotline } from 'react-leaflet-hotline'

export default function Demo() {
  const [max, setMax] = useState(options.max)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setMax(parseInt(e.target.value, 10))

  return (
    <>
      <MapWrapper>
        <Hotline
          data={data}
          getLat={({ point }) => point.lat}
          getLng={({ point }) => point.lng}
          getVal={({ point }) => point.value}
          options={{ ...options, max, tolerance: 10 }}
        />
      </MapWrapper>
      <div className="m-auto mt-5 w-min py-3 px-5 rounded-full bg-slate-700 flex items-center gap-5">
        Max:
        <input type="range" min={options.min + 1} max="10" onChange={onChange} />
        {max}
      </div>
    </>
  )
}
