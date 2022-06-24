
import HotPolyline from "./core/HotPolyline";
import Renderer from "./renderers/Renderer";


export type RGB = [number, number, number]
export interface Color { r: number; g: number; b: number, t: number }
export type Palette = Color[]

export interface HotlineOptions {
	min?: number;
	max?: number;
	weight?: number;
	outlineWidth?: number;
	outlineColor?: string;
	palette?: Palette;
	onclick?: (e: any) => void;
}

export type NewableRenderer<T> = new ( options?: HotlineOptions, ...params: any[] ) => Renderer<T>; 
export type NewableHotPolyline<T, U> = new (
	renderer: Renderer<U>, data: T[] | T[][], getLat: (t: T) => number, getLng: (t: T) => number, getVal: (t: T) => number
) => HotPolyline<T, U>

// LatLngHotline
// export interface LatLngValue extends LatLng { value: number }
export interface HotPoint { x: number, y: number, z: number, i: number }
export type HotData = HotPoint[]

export interface IHotline<T> {
	data: T[];
	getLat: (t: T) => number;
	getLng: (t: T) => number;
	getVal: (t: T) => number;
	options?: HotlineOptions;
}