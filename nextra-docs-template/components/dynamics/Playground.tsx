import dynamic from 'next/dynamic';

export default dynamic(() => import('../Playground'), {
    ssr: false
});