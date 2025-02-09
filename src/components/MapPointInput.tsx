import { useMemo } from 'react'
import { Box, TextField } from '@mui/material'
import MapLayout from './MapLayout'
import { useFormikContext } from 'formik'
import { Task } from '../types/task'
import useMap from '../hooks/useMap'
import { createTileLayer } from '../helpers/map/layers/tileLayer'
import { createVectorLayer } from '../helpers/map/layers/vectorLayer'
import { createFeature, updateFeatureGeometry } from '../helpers/map/geometry/Feature'
import { createGeoJsonOfPoint } from '../helpers/geoJSON'

const MapPointInput = () => {
  const { values, setFieldValue } = useFormikContext<Task>()
  const displayedFeature = createFeature(createGeoJsonOfPoint(values.coordinates))

  const mapOptions = useMemo(
    () => ({
      view: { center: values.coordinates, zoom: 10 },
      layers: [
        createTileLayer({ type: 'stadia', layer: 'outdoors' }),
        createVectorLayer([displayedFeature]),
      ],
    }),
    [],
  )

  const map = useMap(mapOptions)

  map.on('click', (event) => {
    setCoordinates(event.coordinate)
  })

  const setCoordinates = (lonLat: number[]) => {
    setFieldValue('coordinates', lonLat)
    updateFeatureGeometry(displayedFeature, createGeoJsonOfPoint(lonLat))
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" flexDirection="row">
        <TextField
          type="number"
          onChange={(e) => setCoordinates([Number(e.target.value), values.coordinates[1]])}
          label="Longitude"
          value={values.coordinates[0]}
        />
        <TextField
          type="number"
          onChange={(e) => setCoordinates([values.coordinates[0], Number(e.target.value)])}
          label="Latitude"
          value={values.coordinates[1]}
        />
      </Box>
      <Box height={300} width={400}>
        <MapLayout map={map} />
      </Box>
    </Box>
  )
}

export default MapPointInput
