import { useRef, useState } from 'react';
import { Map, Overlay } from 'ol';
import { FeatureLike } from 'ol/Feature';

const useMapHover = (map: Map) => {
    const [hoveredFeature, setHoveredFeature] = useState<FeatureLike | null>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    if (tooltipRef.current) {
        const overlay = new Overlay({ element: tooltipRef!.current, offset: [5, 5] });

        map.addOverlay(overlay);

        map.on('pointermove', function (evt) {
            overlay.setPosition(evt.coordinate);
            const feature = map.getFeaturesAtPixel(evt.pixel)[0]

            if (feature) {
                setHoveredFeature(feature);
                setTimeout(() => { tooltipRef!.current!.style.visibility = 'visible' }, 50)
            } else {
                tooltipRef!.current!.style.visibility = 'hidden';
            }
        });
    }

    return [tooltipRef, hoveredFeature] as const;
}

export default useMapHover;
