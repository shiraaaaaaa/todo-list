import { useMemo, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Box, Chip } from '@mui/material';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import { defaults } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature, { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import MapLayout from './MapLayout';
import { tasksAtom } from '../atoms/tasksAtom';
import { useAtom } from 'jotai';
import Select from 'ol/interaction/Select';
import { Task } from '../types/task';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Pixel } from 'ol/pixel';

const TasksMap = ({ onSelect, selectedTask }: { onSelect: (task: Task | null) => void, selectedTask: Task | null }) => {
    const [tasks] = useAtom(tasksAtom)

    const tasksFeatures = tasks.map(task => new Feature({ geometry: new Point(fromLonLat(task.coordinates)), name: task.description }))

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
                    features: tasksFeatures,
                }),
                style: new Style({
                    image: new Icon({
                        anchor: [0.5, 0.5],
                        opacity: 1,
                        scale: 0.05,
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'src/assets/mapFeaturePoint.png'
                    })
                })
            })
        ],
        view: new View({
            center: fromLonLat(tasks[tasks.length - 1].coordinates),
            zoom: 10,
        }),
    }), [])

    myMap.addInteraction(new Select())
    tasksFeatures.forEach((feature, index) => {
        feature.on('change', () => {
            onSelect(tasks[index] === selectedTask ? null : tasks[index])
        })
    })

    const [hoveredFeatured, setHoveredFeature] = useState<FeatureLike | null>(null)
    const [currentPixel, setCurrentPixel] = useState<Pixel | null>(null)

    const displayFeatureInfo = function (pixel: Pixel) {
        const feature = myMap.getFeaturesAtPixel(pixel)[0];
        setHoveredFeature(feature ?? null);
        setCurrentPixel(pixel);
    };

    myMap.on('pointermove', function (evt) {
        displayFeatureInfo(evt.pixel);
    });


    return (
        <>
            <Box position="relative" height="100%" width="100%" margin='auto'>
                <MapLayout map={myMap} />
                <Chip id="info" variant="filled"
                    label={hoveredFeatured ? hoveredFeatured.get("name") : ""}
                    style={{
                        position: "absolute",
                        backgroundColor: "#f8f8f8",
                        visibility: hoveredFeatured ? 'visible' : 'hidden',
                        ...currentPixel && { left: currentPixel[0], top: currentPixel[1] },
                    }}
                />
            </Box>
        </>
    );
};

export default TasksMap;
