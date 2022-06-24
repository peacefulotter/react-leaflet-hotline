

import { useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import L from 'leaflet'

import { HotlineOptions, NewableHotPolyline, NewableRenderer } from './types';
import Renderer from './renderers/Renderer';

function useCustomHotline<T, U>( 
    RendererClass: NewableRenderer<U>, 
    HotPolylineClass: NewableHotPolyline<T, U>, 
)
{
    return ( 
        data: T[],
        getLat: (t: T) => number, getLng: (t: T) => number, getVal: (t: T) => number,
        options?: HotlineOptions     
    ) => {
        if ( !L.Browser.canvas ) 
            throw new Error('no Browser canvas')

        const map = useMapEvents({})
        const [renderer, setRenderer] = useState<Renderer<U>>()

        useEffect( () => {
            if ( renderer === undefined ) return;
            renderer.setOptions(options)
        }, [options])
        
        useEffect( () => {
            const _renderer = new RendererClass(options)
            const polyline = new HotPolylineClass( _renderer, data, getLat, getLng, getVal )

            polyline.addTo(map)
            setRenderer(_renderer)

            return () => { 
                polyline.remove()
                map.removeLayer(polyline);
            }
        }, [data])
        
        
        return renderer
    }
}

export default useCustomHotline;