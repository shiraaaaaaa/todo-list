import { useRef, useEffect } from 'react';
import Map from 'ol/Map';
import { Box } from '@mui/material';

const MapLayout = ({ map }: { map: Map }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);


    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            map.setTarget(mapContainerRef.current);
            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.setTarget(undefined);
                mapInstanceRef.current = null;
            }
        };
    }, [map]);

    return (
        <Box position="relative" height="100%" width="100%" >
            <Box
                width="100%"
                ref={mapContainerRef}
                position="absolute"
                top={0}
                bottom={0}
            />
        </Box>
    );
};

export default MapLayout;