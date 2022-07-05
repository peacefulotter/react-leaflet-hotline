

import { ReactElement } from 'react';
import { Polyline } from 'react-leaflet';
import { defaultOptions } from './constants';

import { IHotline } from './types';
import useHotline from './useHotline';

function Hotline<T>( { data, getLat, getLng, getVal, options, click }: IHotline<T> ): ReactElement<any, any>
{
    const [_, polyline] = useHotline<T>(data, getLat, getLng, getVal, options)

    return (
        <>
        { click && polyline && 
            <Polyline 
                positions={data.map(d => ({lat: getLat(d), lng: getLng(d)}))}
                color='transparent'
                weight={
                    (options.weight ? options.weight : defaultOptions.weight) + 
                    (options.tolerance ? options.tolerance : defaultOptions.tolerance)
                }
                eventHandlers={{click}} /> 
        }
        </>
    )
}

export default Hotline;