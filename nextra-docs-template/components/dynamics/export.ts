import dynamic from "next/dynamic";

export default function dynamicExport(path: string) {
    return dynamic(() => import(path), {
        ssr: false
    });
}