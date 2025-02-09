import { Map, View } from 'ol'
import { defaults } from 'ol/control'
import { fromLonLat } from 'ol/proj'
import { useMemo } from 'react'
import { Coordinate } from 'ol/coordinate'
import Layer from 'ol/layer/Layer'

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
          center: fromLonLat(options.view?.center || [0, 0]),
          zoom: options.view?.zoom ?? 10,
        }),
      }),
    [options],
  )

  return map
}

export default useMap
