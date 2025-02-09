import { GeoJSON, GeoJsonProperties, Point } from 'geojson'

export const createGeoJsonOfPoint = (
  coordinate: number[],
  properties?: GeoJsonProperties,
): GeoJSON<Point> => {
  return {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: coordinate },
    properties: properties || {},
  }
}
