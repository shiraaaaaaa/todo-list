import { useMemo } from 'react'
import { Box, Chip } from '@mui/material'
import MapLayout from './MapLayout'
import useMapHover from '../hooks/map/useMapHover'
import useMap from '../hooks/map/useMap'
import getDuckIcon from '../helpers/map/styles/duckIcon'
import { MapOptions } from '../hooks/map/useMap'
import { createTileLayer } from '../helpers/map/layers/tileLayer'
import { createVectorLayer } from '../helpers/map/layers/vectorLayer'
import useMapSelect from '../hooks/map/useMapSelect'
import { getTaskGeoJson } from '../helpers/tasks/taskGeoJSON'
import { createFeature } from '../helpers/map/geometry/feature'
import { Task } from '../types/task'

const TasksMap = ({ tasks, onSelect }: { tasks: Task[]; onSelect: (taskId: string) => void }) => {
  const vectorLayer = createVectorLayer(
    tasks.map((task) => createFeature(getTaskGeoJson(task))),
    (feature) => getDuckIcon({ color: feature.get('isDone') ? 'green' : 'yellow' }),
  )

  const mapOptions: MapOptions = useMemo(
    () => ({
      view: { center: tasks[0]?.coordinates || [0, 0] },
      layers: [createTileLayer(), vectorLayer],
    }),
    [tasks],
  )

  const tasksMap = useMap(mapOptions)

  useMapSelect(tasksMap, (id) => onSelect(id as string), vectorLayer)
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
