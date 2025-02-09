import { useMemo } from 'react'
import { Box, Chip } from '@mui/material'
import MapLayout from './MapLayout'
import { tasksAtom } from '../atoms/tasksAtom'
import { useAtom } from 'jotai'
import useMapHover from '../hooks/useMapHover'
import useMap from '../hooks/useMap'
import getDuckIcon from '../helpers/map/styles/duckIcon'
import { MapOptions } from '../hooks/useMap'
import { createTileLayer } from '../helpers/map/layers/tileLayer'
import { createVectorLayer } from '../helpers/map/layers/vectorLayer'
import { GeoJSON } from 'geojson'
import { fromLonLat } from 'ol/proj'
import useMapSelect from '../hooks/useMapSelect'

const TasksMap = ({ onSelect }: { onSelect: (taskId: string) => void }) => {
  const [tasks] = useAtom(tasksAtom)

  const tasksFeatures: GeoJSON[] = tasks.map((task) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: fromLonLat(task.coordinates) },
    properties: {
      name: task.description,
      isDone: task.isDone,
      id: task.id,
    },
  }))
  const vectorLayer = createVectorLayer(tasksFeatures, (feature) =>
    getDuckIcon({ color: feature.get('isDone') ? 'green' : 'yellow' }),
  )

  const mapOptions: MapOptions = useMemo(
    () => ({
      view: { center: tasks[0]?.coordinates || [0, 0] },
      layers: [createTileLayer(), vectorLayer],
    }),
    [tasks],
  )

  const tasksMap = useMap(mapOptions)

  const onMapSelect = (id: string | number | null) => {
    onSelect(id as string)
  }

  useMapSelect(tasksMap, onMapSelect, vectorLayer)

  const [tooltipRef, hoveredFeature] = useMapHover(tasksMap)

  return (
    <Box position="relative" height="100%" width="100%" margin="auto">
      <Chip
        id="info"
        variant="filled"
        ref={tooltipRef}
        label={hoveredFeature ? hoveredFeature.get('name') : ''}
        sx={{ backgroundColor: '#f8f8f8' }}
      />
      <MapLayout map={tasksMap} />
    </Box>
  )
}

export default TasksMap
