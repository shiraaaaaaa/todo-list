import { useEffect } from 'react'
import { Map } from 'ol'
import Feature from 'ol/Feature'
import Select from 'ol/interaction/Select'
import VectorLayer from 'ol/layer/Vector'

const useMapSelect = (
  map: Map,
  onSelect: (id: string | number | null) => void,
  vectorLayer: VectorLayer<Feature>,
) => {
  useEffect(() => {
    const features = vectorLayer.getSource()?.getFeatures() || []
    features.forEach((feature) => {
      feature.on('change', () => {
        onSelect(feature.get('id') || null)
      })
    })

    map.addInteraction(new Select())
  })
}

export default useMapSelect
