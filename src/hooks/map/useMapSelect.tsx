import { useEffect } from 'react'
import { Map } from 'ol'
import Select from 'ol/interaction/Select'

const useMapSelect = (map: Map, onSelect: (id: string | number | null) => void) => {
  useEffect(() => {
    const select = new Select()
    select.on('select', (event) => {
      onSelect(event.selected[0]?.get('id') || null)
    })
    map.addInteraction(select)
  }, [map])
}

export default useMapSelect
