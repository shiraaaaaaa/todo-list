import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import StadiaMaps from 'ol/source/StadiaMaps'

type TileLayerOptions =
  | {
      type: 'stadia'
      layer: string
    }
  | { type: 'osm' }

export const createTileLayer = (options?: TileLayerOptions) => {
  let source = new OSM()
  if (options?.type === 'stadia') {
    source = new StadiaMaps({ layer: options.layer })
  }

  return new TileLayer({ source })
}
