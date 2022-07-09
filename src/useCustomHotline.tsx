

import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

import { HotlineProps, NewableHotPolyline, NewableRenderer } from './types';
import Renderer from './renderers/Renderer';
import HotPolyline from './core/HotPolyline';
import eventPolylines from './eventPolylines';

function useCustomHotline<T, U>( 
    RendererClass: NewableRenderer<U>, 
    HotPolylineClass: NewableHotPolyline<T, U>, 
    { data, getLat, getLng, getVal, options, eventHandlers }: HotlineProps<T>,
    ...params: any[]
) 
{
    if ( !L.Browser.canvas ) 
        throw new Error('no Browser canvas')

    const map = useMap()

    const [renderer,  setRenderer]  = useState<Renderer<U>>(undefined)
    const [hotline,   setHotline]   = useState<HotPolyline<T, U>>(undefined)
    const [polylines, setPolylines] = useState<L.Polyline[]>([])

    // separate useEffect to avoid recreating a new hotline when some options change
    useEffect( () => {
        if ( hotline === undefined ) return;
        hotline.setOptions(options)
    }, [options] )
    
    useEffect( () => {
        const _renderer = new RendererClass(options, params);
        const _hotline = new HotPolylineClass( _renderer, data, getLat, getLng, getVal );

        _hotline.addTo(map);
        polylines.forEach( p => p.bringToFront() );

        setRenderer(_renderer);
        setHotline(_hotline);
        
        return () => { 
            _renderer.remove()
            _hotline.remove()
        }
    }, [map, data])

    // transparent polyline on top of the hotline that handles the events
    useEffect( () => {
        const _polylines = eventPolylines( map, data, getLat, getLng, options, eventHandlers )
        setPolylines(_polylines)
        return () => { 
            _polylines.forEach( polyline => polyline.remove() )
        }
    }, [map, data])
    
    return { renderer, hotline }
}

export default useCustomHotline;