
import dynamic from 'next/dynamic';

export default dynamic(() => import('../MultiPolyline'), {
    ssr: false
});