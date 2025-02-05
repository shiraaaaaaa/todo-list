import { useMemo } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Box, Chip } from '@mui/material';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import { defaults } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import MapLayout from './MapLayout';
import { tasksAtom } from '../atoms/tasksAtom';
import { useAtom } from 'jotai';
import Select from 'ol/interaction/Select';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import useMapHover from '../hooks/useMapHover';

const TasksMap = ({ onSelect }: { onSelect: (taskId: string) => void }) => {
    const [tasks] = useAtom(tasksAtom)

    const tasksFeatures = useMemo(() => tasks.map(task => new Feature({
        geometry: new Point(fromLonLat(task.coordinates)),
        name: task.description,
        isDone: task.isDone
    })), [tasks])

    const tasksMap = useMemo(() => new Map({
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

                style: (feature) => new Style({
                    image: new Icon({
                        anchor: [0.5, 0.5],
                        opacity: 1,
                        scale: 0.05,
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://cdn-icons-png.flaticon.com/512/1521/1521260.png',
                        color: feature.get('isDone') ? 'green' : 'yellow'
                    })
                })
            })
        ],
        view: new View({
            center: fromLonLat(tasks[tasks.length - 1].coordinates),
            zoom: 10,
        }),
    }), [tasksFeatures])


    tasksFeatures.forEach((feature, index) => {
        feature.on('change', () => {
            onSelect(tasks[index].id)
        })
    })

    tasksMap.addInteraction(new Select())

    const [tooltipRef, hoveredFeature] = useMapHover(tasksMap)

    return (
        <>
            <Box position="relative" height="100%" width="100%" margin='auto'>
                <Chip id="info" variant="filled" ref={tooltipRef}
                    label={hoveredFeature ? hoveredFeature.get('name') : ""}
                    sx={{ backgroundColor: "#f8f8f8" }}
                />
                <MapLayout map={tasksMap} />
            </Box>
        </>

    );
};

export default TasksMap;
