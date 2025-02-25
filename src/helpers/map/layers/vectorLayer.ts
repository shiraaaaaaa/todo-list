import { Feature } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import { StyleLike } from 'ol/style/Style'
import VectorSource from 'ol/source/Vector'

export type LayerOptions = {
  features?: Feature[]
  style?: StyleLike
}

export const createVectorLayer = ({ features, style }: LayerOptions) => {
  return new VectorLayer({ source: new VectorSource({ features: features }), style })
}

export const updateVectorLayer = (layer: VectorLayer<Feature>, update: LayerOptions) => {
  if (!layer.getSource()) {
    layer.setSource(new VectorSource())
  }

  if (update.style) {
    layer.setStyle(update.style)
  }

  if (update.features) {
    layer.getSource()!.clear()
    layer.getSource()!.addFeatures(update.features)
  }
}
