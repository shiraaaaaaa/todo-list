import { Feature } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { StyleLike } from 'ol/style/Style'

export const createVectorLayer = (features: Feature[], style?: StyleLike) => {
  return new VectorLayer({ source: new VectorSource({ features }), style })
}
