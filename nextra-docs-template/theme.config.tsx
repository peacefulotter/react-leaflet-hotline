import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Description from './components/Description'

const config: DocsThemeConfig = {
  logo: (
    <>
      <span className='text-xl'><span className='text-sky-500 font-bold'>react-leaflet-hotline </span><span className='font-thin text-slate-300'>docs</span></span>
      <span className='mx-10'>•</span>
      <Description />
    </>
  ),
  project: {
    link: 'https://github.com/peacefulotter/react-leaflet-hotline/',
  },
  docsRepositoryBase: 'https://github.com/peacefulotter/react-leaflet-hotline/',
  footer: {
    text: 'react-leaflet-hotline docs',
  },
}

export default config
