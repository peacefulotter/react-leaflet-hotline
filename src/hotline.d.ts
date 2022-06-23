
import { LatLng, LatLngExpression } from "leaflet";
import { HotPolyline } from "./core/HotPolyline";
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

export type HotlineClass<DataT> = new (options?: HotlineOptions) => Renderer<DataT>; 

// LatLngHotline
export interface LatLngValue extends LatLng { value: number }
export interface LatLngPoint { x: number, y: number, z: number, i: number }
export type LatLngData = LatLngPoint[]

export interface IHotline {
	data: LatLngValue[];
	options?: HotlineOptions;
}