import { HotlineOptions, Palette } from 'react-leaflet-hotline'

export const data = [
  { lat: 55.7620299, lng: 12.5197298, value: 1 },
  { lat: 55.7615605, lng: 12.5194112, value: 2 },
  { lat: 55.7612883, lng: 12.5192078, value: 3 },
  { lat: 55.7604757, lng: 12.5184575, value: 4 },
  { lat: 55.7598755, lng: 12.5177353, value: 8 },
  { lat: 55.7593927, lng: 12.5170125, value: 6 },
  { lat: 55.759348, lng: 12.516951, value: 4 },
  { lat: 55.7587234, lng: 12.5158659, value: 2 },
]

export const datas: { lat: number; lng: number; value: number }[][] = [
  [
    { lat: 55.7612883, lng: 12.5192078, value: 0 },
    { lat: 55.7598755, lng: 12.5177353, value: 4 },
    { lat: 55.7593927, lng: 12.5170125, value: 5 },
    { lat: 55.7587234, lng: 12.5158659, value: 2 },
    { lat: 55.758321, lng: 12.5149273, value: 0 },
  ],
  [
    { lat: 55.7573451, lng: 12.5117588, value: 0 },
    { lat: 55.7571885, lng: 12.5109398, value: 1 },
    { lat: 55.7570511, lng: 12.5099903, value: 2 },
    { lat: 55.7569649, lng: 12.5092035, value: 3 },
    { lat: 55.7569006, lng: 12.5084274, value: 4 },
  ],
]

export const palette_0: Palette = [
  { r: 0, g: 160, b: 0, t: 0 },
  { r: 255, g: 255, b: 0, t: 0.5 },
  { r: 255, g: 0, b: 0, t: 1 },
]

export const palette_1: Palette = [
  { r: 50, g: 50, b: 200, t: 0 },
  { r: 50, g: 200, b: 50, t: 0.5 },
  { r: 200, g: 50, b: 50, t: 1 },
]

export const palette_2: Palette = [
  { r: 0, g: 0, b: 0, t: 0 },
  { r: 6, g: 81, b: 98, t: 0.5 },
  { r: 107, g: 255, b: 107, t: 1 },
]

export const palette_3: Palette = [
  { r: 34, g: 211, b: 238, t: 0 },
  { r: 14, g: 165, b: 233, t: 0.5 },
  { r: 30, g: 58, b: 138, t: 1 },
]

export const options: HotlineOptions = {
  min: 1,
  max: 8,
  outlineWidth: 0,
  outlineColor: 'black',
  weight: 7,
  palette: palette_0,
  tolerance: 3,
}
