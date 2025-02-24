import { useMemo } from 'react'

import { Map, View } from 'ol'
import Layer from 'ol/layer/Layer'
import { defaults } from 'ol/control'
import { Coordinate } from 'ol/coordinate'

export type MapOptions = {
  view?: Partial<{
    center: Coordinate
    zoom: number
  }>
  layers: Layer[]
}

const useMap = (options: MapOptions) => {
  const map = useMemo(
    () =>
      new Map({
        controls: defaults({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
        layers: options.layers,
        view: new View({
          center: options.view?.center || [0, 0],
          zoom: options.view?.zoom ?? 10,
          projection: 'EPSG:4326',
        }),
      }),
    [options],
  )

  return map
}

export default useMap
