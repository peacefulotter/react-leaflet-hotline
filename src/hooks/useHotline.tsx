

import { HotlineProps, HotPoint } from '../types';
import LatLngRenderer from '../renderers/LatLngRenderer';
import HotPolyline from '../core/HotPolyline';
import useCustomHotline from './useCustomHotline';

/**
 * Hotline with default Renderer and Polyline
 * @param opts hotline options
 * @returns the renderer and hotline instance
 */
function useHotline<T>( opts: HotlineProps<T> )
{
    const hotline = useCustomHotline<T, HotPoint[]>( 
        LatLngRenderer, HotPolyline<T, HotPoint[]>, 
        opts 
    )

    return hotline;
}

export default useHotline;