import L from 'leaflet'
import Renderer from "../renderers/Renderer";

/**
 * From: https://github.com/iosphere/Leaflet.hotline/blob/49e6f45dc98e1432e6a8f849ba4c2b9dd0356c8b/src/leaflet.hotline.js#L327
 */
const clipSegment = (hotline: Renderer<any>, a: any, b: any, bounds: any, useLastCode: any, round: any) => {
    
    let codeA = useLastCode ? hotline._lastCode : (L.LineUtil as any)._getBitCode(a, bounds);
    let codeB = (L.LineUtil as any)._getBitCode(b, bounds);
    let codeOut: any;
    let p: any;
    let newCode: any;

    // save 2nd code to avoid calculating it on the next segment
    hotline._lastCode = codeB;

    /* tslint:disable:no-bitwise */
    while (true) {
        // if a,b is inside the clip window (trivial accept)
        if ( !(codeA | codeB) ) {
            return [a, b];
        // if a,b is outside the clip window (trivial reject)
        } else if (codeA & codeB) {
            return undefined;
        // other cases
        } else {
            codeOut = codeA || codeB;
            p = (L.LineUtil as any)._getEdgeIntersection(a, b, codeOut, bounds, round);
            newCode = (L.LineUtil as any)._getBitCode(p, bounds);

            if (codeOut === codeA) {
                p.z = a.z;
                p.i = a.i
                a = p;
                codeA = newCode;
            } else {
                p.z = b.z;
                p.i = b.i
                b = p;
                codeB = newCode;
            }
        }
    }
    /* tslint:enable:no-bitwise */
}

export default clipSegment;