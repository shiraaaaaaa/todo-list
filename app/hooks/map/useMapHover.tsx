import { useEffect, useRef, useState } from 'react'

import { Map, Overlay } from 'ol'
import { FeatureLike } from 'ol/Feature'

const useMapHover = (map: Map) => {
  const [hoveredFeature, setHoveredFeature] = useState<FeatureLike | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tooltipRef.current) {
      return
    }

    const overlay = new Overlay({
      element: tooltipRef!.current,
      offset: [5, 5],
    })

    map.addOverlay(overlay)

    map.on('pointermove', function (event) {
      overlay.setPosition(event.coordinate)
      const feature = map.getFeaturesAtPixel(event.pixel)[0]

      if (feature) {
        setHoveredFeature(feature)
        tooltipRef!.current!.style.visibility = 'visible'
      } else {
        tooltipRef!.current!.style.visibility = 'hidden'
      }
    })
  }, [tooltipRef, map])

  return [tooltipRef, hoveredFeature] as const
}

export default useMapHover
