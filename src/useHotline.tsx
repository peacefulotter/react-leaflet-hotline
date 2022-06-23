

import { useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'

import { HotlineOptions, LatLngData, LatLngValue } from './hotline';
import LatLngRenderer from './renderers/LatLngRenderer';
import { HotPolyline } from './core/HotPolyline';

const useHotline = ( data: LatLngValue[], options?: HotlineOptions ) => {
    
    if ( !L.Browser.canvas ) 
        throw new Error('no Browser canvas')

    const map = useMapEvents({})
    const [renderer, setRenderer] = useState<LatLngRenderer>()

    useEffect( () => {
        if ( renderer === undefined ) return;
        renderer.setOptions(options)
    }, [options])
    
    useEffect( () => {
        const renderer = new LatLngRenderer(options)
        const polyline = new HotPolyline<LatLngExpression, LatLngData>( renderer, data )

        polyline.addTo(map)
        setRenderer(renderer)

        return () => { 
            polyline.remove()
            map.removeLayer(polyline);
        }
    }, [data])
     
    
    return renderer
    
}

export default useHotline;