import { useMemo, useRef, useState } from 'react';
import { Map, Overlay, View } from 'ol';
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


const TasksMap = ({ onSelect, selectedTask }: { onSelect: (task: Task | null) => void, selectedTask: Task | null }) => {
    const [tasks] = useAtom(tasksAtom)
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [hoveredFeature, setHoveredFeature] = useState<FeatureLike | null>(null)

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

    const overlay = new Overlay({ element: tooltipRef.current! });

    myMap.addOverlay(overlay);

    myMap.on('pointermove', function (evt) {
        overlay.setPosition(evt.coordinate);
        const feature = myMap.getFeaturesAtPixel(evt.pixel)[0]

        if (feature) {
            setHoveredFeature(feature);
            tooltipRef.current!.style.visibility = 'visible';
        } else {
            tooltipRef.current!.style.visibility = 'hidden';
        }

    });

    myMap.addInteraction(new Select())
    tasksFeatures.forEach((feature, index) => {
        feature.on('change', () => {
            onSelect(tasks[index] === selectedTask ? null : tasks[index])
        })
    })

    return (

        <Box position="relative" height="100%" width="100%" margin='auto'>
            <MapLayout map={myMap} />
            <Chip id="info" variant="filled" ref={tooltipRef}
                label={hoveredFeature ? hoveredFeature.get('name') : ""}
                sx={{ backgroundColor: "#f8f8f8", padding: "2px" }}
            />
        </Box>

    );
};

export default TasksMap;
