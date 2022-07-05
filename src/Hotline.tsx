

import { ReactElement } from 'react';

import { HotlineProps } from './types';
import useHotline from './useHotline';

function Hotline<T>( { data, getLat, getLng, getVal, options, eventHandlers }: HotlineProps<T> ): ReactElement<any, any>
{
    useHotline<T>( { data, getLat, getLng, getVal, options, eventHandlers } )
    return null;
}

export default Hotline;