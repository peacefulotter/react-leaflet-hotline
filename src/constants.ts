import { HotlineOptions, Palette } from "./hotline";



export const defaultPalette: Palette = [
    { r: 0,   g: 160, b: 0,  t: 0    },
    { r: 255, g: 255, b: 0,  t: 0.5  },
    { r: 255, g: 0,   b: 0,  t: 1    },
]

export const defaultOptions: Required<HotlineOptions> = {
    min: 0,
    max: 1,
    outlineWidth: 1,
    outlineColor: 'black',
    weight: 7,
    palette: defaultPalette,
    onclick: () => {}
}