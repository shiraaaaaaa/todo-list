import { useEffect, useMemo } from 'react'

import { Box, Chip } from '@mui/material'

import getDuckIcon from '../../helpers/map/styles/duckIcon'
import { getTaskGeoJson } from '../../helpers/tasks/taskGeoJSON'
import { createFeature } from '../../helpers/map/geometry/feature'
import { createTileLayer } from '../../helpers/map/layers/tileLayer'
import { createVectorLayer, updateVectorLayer } from '../../helpers/map/layers/vectorLayer'

import useMap from '../../hooks/map/useMap'
import { MapOptions } from '../../hooks/map/useMap'
import useMapHover from '../../hooks/map/useMapHover'
import useMapSelect from '../../hooks/map/useMapSelect'

import { Task } from '../../types/task'

import MapLayout from '../MapLayout'

const TasksMap = ({ tasks, onSelect }: { tasks: Task[]; onSelect: (taskId: string) => void }) => {
  const vectorLayer = useMemo(
    () =>
      createVectorLayer({
        style: (feature) => getDuckIcon({ color: feature.get('isDone') ? 'green' : 'yellow' }),
      }),
    [],
  )

  useEffect(() => {
    updateVectorLayer(vectorLayer, {
      features: tasks.map((task) => createFeature(getTaskGeoJson(task))),
    })
  }, [tasks])

  const mapOptions: MapOptions = useMemo(
    () => ({
      view: { center: tasks[0]?.coordinates || [0, 0] },
      layers: [createTileLayer(), vectorLayer],
    }),
    [vectorLayer],
  )

  const tasksMap = useMap(mapOptions)

  useMapSelect(tasksMap, (id) => onSelect(id as string))
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
