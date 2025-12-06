import * as rlayers from 'rlayers';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

const monument = 'https://cdn.jsdelivr.net/npm/rlayers/examples/./svg/eiffel.svg';
const TourEiffel = fromLonLat([2.294, 48.858]);
const TourEiffelPoint = new Point(TourEiffel);

const MonumentLayer = () => (
    <rlayers.RLayerVector>
        <rlayers.RStyle.RStyle>
            <rlayers.RStyle.RIcon src={monument} />
        </rlayers.RStyle.RStyle>
        <rlayers.RFeature geometry={TourEiffelPoint} />
    </rlayers.RLayerVector>
);

export default MonumentLayer;