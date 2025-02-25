import { useRef, useEffect } from 'react'

import { Box } from '@mui/material'

import Map from 'ol/Map'

const MapLayout = ({ map }: { map: Map }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapContainerRef.current) {
      map.setTarget(mapContainerRef.current)
    }

    return () => map.setTarget(undefined)
  }, [map])

  return (
    <Box position="relative" height="100%" width="100%">
      <Box width="100%" ref={mapContainerRef} position="absolute" top={0} bottom={0} />
    </Box>
  )
}

export default MapLayout
