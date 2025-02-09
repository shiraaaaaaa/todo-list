import { fromLonLat } from "ol/proj";
import { Task } from "../../types/task";
import { GeoJSON } from "geojson";

export const getTaskGeoJson = (task: Task): GeoJSON => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: fromLonLat(task.coordinates) },
    properties: {
        name: task.description,
        isDone: task.isDone,
        id: task.id,
    },
})