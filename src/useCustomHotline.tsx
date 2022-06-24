

import { useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import L from 'leaflet'

import { HotlineOptions, NewableHotPolyline, NewableRenderer } from './types';
import Renderer from './renderers/Renderer';
import HotPolyline from './core/HotPolyline';

function useCustomHotline<T, U>( 
    RendererClass: NewableRenderer<U>, 
    HotPolylineClass: NewableHotPolyline<T, U>, 
)
{
    return ( 
        data: T[] | T[][],
        getLat: (t: T) => number, getLng: (t: T) => number, getVal: (t: T) => number,
        options?: HotlineOptions, params?: any     
    )
    : [Renderer<U>, HotPolyline<T, U>] => 
    {
        if ( !L.Browser.canvas ) 
            throw new Error('no Browser canvas')

        const map = useMapEvents({})

        const [renderer, setRenderer] = useState<Renderer<U>>()
        const [polyline, setPolyline] = useState<HotPolyline<T, U>>()

        useEffect( () => {
            if ( renderer === undefined ) return;
            renderer.setOptions(options)
        }, [options])
        
        useEffect( () => {
            const _renderer = new RendererClass(options, params)
            const _polyline = new HotPolylineClass( _renderer, data, getLat, getLng, getVal )

            _polyline.addTo(map)

            setRenderer(_renderer)
            setPolyline(_polyline)

            return () => { 
                _polyline.remove()
                map.removeLayer(_polyline);
            }
        }, [data])
        
        
        return [renderer, polyline]
    }
}

export default useCustomHotline;