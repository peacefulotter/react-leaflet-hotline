import dynamic from 'next/dynamic'

export default dynamic(() => import('../Demo'), {
  ssr: false,
})
