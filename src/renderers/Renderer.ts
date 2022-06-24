
import L, { Map } from 'leaflet'

import { defaultOptions, defaultPalette } from '../constants';
import { Color, HotlineOptions, Palette, RGB } from "../types";


/**
 * Core renderer.
 * @constructor
 * @param {HTMLElement | string} canvas - &lt;canvas> element or its id
 * to initialize the instance on.
 */
abstract class Renderer<T> extends L.Renderer {

    _canvas: HTMLCanvasElement | undefined;
    _ctx: CanvasRenderingContext2D | undefined;
    _width: number | undefined;
    _height: number | undefined;

    _options: Required<HotlineOptions>
    _data: T[];
    _palette: Uint8ClampedArray;

    _lastCode: any;
    projectedData: T[]

    constructor(options?: HotlineOptions, params?: any)
    {
        super()
        this._data = [];
        this.projectedData = []
        this._palette = new Uint8ClampedArray(256 * 4)
        this.setOptions(options);
    }

    setOptions(options?: HotlineOptions)
    {
        this._options = Object.assign(defaultOptions, options);
        this.palette(options?.palette || defaultPalette);
    }

    setCanvas(canvas: HTMLCanvasElement)
    {
        this._canvas = typeof canvas === 'string'
            ? document.getElementById(canvas) as any
            : canvas;
    
        this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this._width = canvas.width;
        this._height = canvas.height;
    }

    /**
     * Sets the width of the canvas. Used when clearing the canvas.
     * @param {number} width - Width of the canvas.
     */
    width(width: number) {
        this._width = width;
        return this;
    }

    /**
     * Sets the height of the canvas. Used when clearing the canvas.
     * @param {number} height - Height of the canvas.
     */
    height(height: number) {
        this._height = height;
        return this;
    }

    /**
     * Sets the palette gradient.
     * @param {Object.<number, string>} palette  - Gradient definition.
     * e.g. { 0.0: 'white', 1.0: 'black' }
     */
    palette(palette: Palette) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        palette.forEach( (c: Color) => {
            gradient.addColorStop(c.t, `rgb(${c.r}, ${c.g}, ${c.b})`);
        })

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._palette = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    }


    /**
     * Sets the data that gets drawn on the canvas.
     * @param {(T|T[])} data - A single path or an array of paths.
     */
    data(data: T[]) {
        this._data = data;
        return this;
    }

    /**
     * Adds a path to the list of paths.
     * @param {T} path
     */
    add(path: T) {
        this._data.push(path);
        return this;
    }

    /**
     * Draws the currently set paths.
     */
    draw() {
        const ctx = this._ctx;

        if ( ctx === undefined ) return;

        ctx.globalCompositeOperation = 'source-over';
        ctx.lineCap = 'round';

        this._drawOutline();
        this._drawHotline();

        return this;
    }

    /**
     * Gets the RGB values of a given z value of the current palette.
     * @param {number} value - Value to get the color for, should be between min and max.
     * @returns {RGB} The RGB values as an array [r, g, b]
     */
    getRGBForValue(value: number): RGB 
    {
        const { min, max } = this._options;
        const valueRelative = Math.min(Math.max((value - min) / (max - min), 0), 0.999);
        const paletteIndex = Math.floor(valueRelative * 256) * 4;

        return [
            this._palette[paletteIndex],
            this._palette[paletteIndex + 1],
            this._palette[paletteIndex + 2]
        ];
    }

    /**
     * Draws the outline of the graphs.
     * @private
     */
    _drawOutline() 
    {
        const { outlineWidth, outlineColor } = this._options;

        if ( this._ctx === undefined || !outlineWidth ) return;

        for (let i = 0, dataLength = this._data.length; i < dataLength; i++) 
        {
            const path = this._data[i] as any; // ==== fixme

            for (let j = 1, pathLength = path.length; j < pathLength; j++) 
            {
                const pointStart = path[j - 1] as any;
                const pointEnd = path[j] as any;
                
                const ctx = this._ctx;
                ctx.lineWidth = outlineWidth;
                ctx.strokeStyle = outlineColor;
                ctx.beginPath();
                ctx.moveTo(pointStart.x, pointStart.y);
                ctx.lineTo(pointEnd.x, pointEnd.y);
                ctx.stroke();
            }
        }
    }

    _addColorGradient(gradient: CanvasGradient, rgb: RGB, dist: number) 
    {
        gradient.addColorStop(dist, `rgb(${rgb.join(',')})`);
    }

    onProjected() { return 0 };

    abstract projectLatLngs(_map: Map, latlngs: any[], result: any, projectedBounds: any): void;

    /**
     * Draws the color encoded hotline of the graphs.
     * @private
     */
    abstract _drawHotline(): void;
}

export default Renderer;