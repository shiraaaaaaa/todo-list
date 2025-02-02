import { useMemo } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Box } from '@mui/material';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import { defaults } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat, toLonLat } from 'ol/proj';
import MapLayout from './MapLayout';
import { useFormikContext } from 'formik';
import { Task } from '../types/task';

const MapPointInput = () => {
    const { values, setFieldValue } = useFormikContext<Task>();

    const displayedFeature = new Feature(new Point(fromLonLat(values.coordinates)));

    const myMap = useMemo(() => new Map({
        controls: defaults({
            zoom: false, rotate: false, attribution: false
        }),
        layers: [
            new TileLayer({
                source: new StadiaMaps({
                    layer: 'outdoors',
                }),
            }),
            new VectorLayer({
                source: new VectorSource({
                    features: [displayedFeature],
                })
            })
        ],
        view: new View({
            center: fromLonLat(values.coordinates),
            zoom: 10,
        }),
    }), [])


    myMap.on('click', (event) => {
        setFieldValue('coordinates', toLonLat(event.coordinate));
        displayedFeature.setGeometry(new Point(event.coordinate));
    });

    return (
        <>
            <Box height={300} width={400}>
                <MapLayout map={myMap} />
            </Box>
        </>
    );
};

export default MapPointInput;