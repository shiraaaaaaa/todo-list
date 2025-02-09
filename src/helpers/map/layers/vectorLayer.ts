import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSONClass from 'ol/format/GeoJSON.js'
import { StyleLike } from 'ol/style/Style'
import { GeoJSON } from 'geojson'

export const createVectorLayer = (featuresOptions: GeoJSON[], style: StyleLike) => {
  const features = featuresOptions.map((opt) => {
    return new GeoJSONClass().readFeature(opt)
  })

  return new VectorLayer({ source: new VectorSource({ features }), style })
}
