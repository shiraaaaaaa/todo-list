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
import useMapSelect from '../hooks/useMapSelect'
import { getTaskGeoJson } from '../helpers/tasks/taskGeoJson'

const TasksMap = ({ onSelect }: { onSelect: (taskId: string) => void }) => {
  const [tasks] = useAtom(tasksAtom)

  const vectorLayer = createVectorLayer(tasks.map(getTaskGeoJson),
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
