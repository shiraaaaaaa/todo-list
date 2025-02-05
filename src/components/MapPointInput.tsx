import { useMemo } from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { Box, TextField } from '@mui/material'
import StadiaMaps from 'ol/source/StadiaMaps.js'
import { defaults } from 'ol/control'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import { fromLonLat, toLonLat } from 'ol/proj'
import MapLayout from './MapLayout'
import { useFormikContext } from 'formik'
import { Task } from '../types/task'
import { Coordinate } from 'ol/coordinate'

const MapPointInput = () => {
  const { values, setFieldValue } = useFormikContext<Task>()

  const displayedFeature = new Feature(new Point(fromLonLat(values.coordinates)))

  const myMap = useMemo(
    () =>
      new Map({
        controls: defaults({
          zoom: false,
          rotate: false,
          attribution: false,
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
            }),
          }),
        ],
        view: new View({
          center: fromLonLat(values.coordinates),
          zoom: 10,
        }),
      }),
    [],
  )

  myMap.on('click', (event) => {
    setCoordinates(toLonLat(event.coordinate))
  })

  const setCoordinates = (lonLat: Coordinate) => {
    setFieldValue('coordinates', lonLat)
    displayedFeature.setGeometry(new Point(fromLonLat(lonLat)))
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
        <MapLayout map={myMap} />
      </Box>
    </Box>
  )
}

export default MapPointInput
