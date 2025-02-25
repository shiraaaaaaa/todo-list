import { GeoJSON } from 'geojson'
import { Feature } from 'ol'
import OlGeoJSON from 'ol/format/GeoJSON.js'

export const createFeature = (geoJson: GeoJSON) => {
  return new OlGeoJSON().readFeature(geoJson)
}

export const updateFeatureGeometry = (feature: Feature, geoJson: GeoJSON) => {
  feature.setGeometry(new OlGeoJSON().readFeature(geoJson).getGeometry())
}
