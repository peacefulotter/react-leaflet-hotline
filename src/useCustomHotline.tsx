

import { useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
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

    const map = useMapEvents({})

    const [renderer, setRenderer] = useState<Renderer<U>>(undefined)
    const [hotline, setHotline] = useState<HotPolyline<T, U>>(undefined)

    // separate useEffect to avoid recreating a new hotline when some options change
    useEffect( () => {
        if ( hotline === undefined ) return;
        hotline.setOptions(options)
    }, [options] )
    
    useEffect( () => {
        const _renderer = new RendererClass(options, params);
        const _hotline = new HotPolylineClass( _renderer, data, getLat, getLng, getVal );

        _hotline.addTo(map);

        setRenderer(_renderer);
        setHotline(_hotline);

        // transparent polyline on top of the hotline that handles the events
        const polylines = eventPolylines( map, data, getLat, getLng, options, eventHandlers )
        
        return () => { 
            polylines.forEach( polyline => polyline.remove() )
            _hotline.remove()
            map.removeLayer(_hotline);
        }
    }, [data])
    
    return { renderer, hotline }
}

export default useCustomHotline;