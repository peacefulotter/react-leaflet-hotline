
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { data, options, palette_0, palette_1, palette_2, palette_3 } from '../assets/constants';
import MapWrapper from "./map/MapWrapper";
import { Hotline, HotlineOptions, Palette } from 'react-leaflet-hotline';
import { HexColorPicker, RgbColor, RgbColorPicker } from "react-colorful";


function rgbToString<T extends RgbColor>(rgb: T) {
	return `rgb(${rgb.r},${rgb.g},${rgb.b})`
} 

const PalettePicker = ( { i, options, setOptions }: { 
	i: number, 
	options: HotlineOptions, 
	setOptions: Dispatch<SetStateAction<HotlineOptions>> 
} ) => {
	const handlePaletteChange = (color) => {
		const palette = [...options.palette]
		Object.assign( palette[i], color )
		setOptions(prev => ({...prev, palette}) );
	} 

	return <RgbColorPicker color={options.palette[i]} onChange={handlePaletteChange}/>
}

function useComponentVisible(initialIsVisible: boolean) {
    const [isVisible, setIsVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isVisible, setIsVisible };
}

const ColorPicker = ( { name, color, children }: { name: string, color: string, children?: React.ReactNode; }  ) => {
	const { ref, isVisible, setIsVisible } = useComponentVisible(false);
	
	return (
		<div className="relative flex items-center w-full justify-between gap-5">
			<span className='whitespace-nowrap'>{name}</span>
			<div className='cursor-pointer rounded w-16 h-7' style={{background: color}} onClick={() => setIsVisible(p => !p)}></div>
			{ isVisible && 
				<div className='absolute top-0 left-full z-50 ml-5 mt-[-50%]' ref={ref}>
					{ children }
				</div>
			}
		</div>
	)
}

const PrefabricatedPalettePicker = ( { className, palette, setOptions }: { 
	className: string, 
	palette: Palette,
	setOptions: Dispatch<SetStateAction<HotlineOptions>> 
} ) => {
	// const rgbs = palette.map(rgbToString)
	// const gradient = `from-[${rgbs[0]}] via-[${rgbs[1]}] to-[${rgbs[2]}]`
	// console.log(gradient);

	const onClick = () => {
		setOptions(opts => ({...opts, palette}))
	}

	return (
		<div onClick={onClick} className={`cursor-pointer rounded w-12 h-full bg-gradient-to-b ${className}`}></div>
	)
}

export default function Playground() {

	const [_options, setOptions] = useState<HotlineOptions>({
		...options, weight: 10
	});

	const onChange = (key: keyof HotlineOptions) => (e) => 
		setOptions( prev => ({...prev, [key]: parseInt(e.target.value, 10)}) )

	const handleChangeComplete = (key: keyof HotlineOptions) => (color) =>
		setOptions(prev => ({...prev, [key]: color}) );

	return (
		<>
		<MapWrapper>
			<Hotline
				data={data} 
				getLat={t => t.lat} 
				getLng={t => t.lng} 
				getVal={t => t.value}
				options={_options} />
		</MapWrapper>
		<div className='flex flex-col bg-neutral-800 mt-5 rounded-xl px-10'>
			<div className='flex justify-between py-7 border-dashed border-neutral-700 border-b-2'>
				<div className='flex flex-col gap-3 w-min'>
					<div className="flex items-center justify-end gap-5">
						<span className="whitespace-nowrap">Min:</span> 
						<input type='range' min='0' max='9' value={_options.min} onChange={onChange('min')} />
						{_options.min}
					</div>
					<div className="flex items-center justify-end gap-5">
						<span className="whitespace-nowrap">Max:</span> 
						<input type='range' min={_options.min + 1} max='10' value={_options.max} onChange={onChange('max')} />
						{_options.max}
					</div>
					<div className="flex items-center justify-end gap-5">
						<span className="whitespace-nowrap">Weight:</span> 
						<input type='range' min='0' max='20' value={_options.weight} onChange={onChange('weight')} />
						{_options.weight}
					</div>
				</div>
				<div className='border-r-2 border-dashed border-neutral-700'></div>
				<div className='flex flex-col gap-3 w-min'>
					<div className="flex items-center justify-end gap-5">
						<span className="whitespace-nowrap">Outline width:</span> 
						<input type='range' min='0' max='50' value={_options.outlineWidth} onChange={onChange('outlineWidth')} />
						{_options.outlineWidth}
					</div>
					<ColorPicker name='Outline' color={_options.outlineColor}>
						<HexColorPicker color={_options.outlineColor} onChange={handleChangeComplete('outlineColor')}/>
					</ColorPicker>
				</div>
			</div>
			<div className='flex gap-5 py-7 border-b-2 border-dashed border-neutral-700'>
				<div className='flex flex-col gap-3'>
					<ColorPicker name='Palette 0' color={rgbToString(_options.palette[0])}>
						<PalettePicker i={0} options={_options} setOptions={setOptions} />
					</ColorPicker>
					<ColorPicker name='Palette 0.5' color={rgbToString(_options.palette[1])}>
						<PalettePicker i={1} options={_options} setOptions={setOptions} />
					</ColorPicker>
					<ColorPicker name='Palette 1' color={rgbToString(_options.palette[2])}>
						<PalettePicker i={2} options={_options} setOptions={setOptions} />
					</ColorPicker>
				</div>
				<div className='flex gap-3 ml-7'>
					<PrefabricatedPalettePicker 
						className='from-[rgb(0,160,0)] via-[rgb(255,255,0)] to-[rgb(255,0,0)]' 
						palette={palette_0}
						setOptions={setOptions} />
					<PrefabricatedPalettePicker 
						className='from-[rgb(50,50,200)] via-[rgb(50,200,50)] to-[rgb(200,50,50)]' 
						palette={palette_1}
						setOptions={setOptions} />
					<PrefabricatedPalettePicker 
						className='from-[rgb(0,0,0)] via-[rgb(6,81,98)] to-[rgb(107,255,107)]' 
						palette={palette_2}
						setOptions={setOptions} />
					<PrefabricatedPalettePicker 
						className='from-cyan-200 via-sky-500 to-blue-900' 
						palette={palette_3}
						setOptions={setOptions} />
				</div>
			</div>
			<div className='flex py-7'>
				eventHandlers [TODO]
			</div>
		</div>
		</>
	)
}
