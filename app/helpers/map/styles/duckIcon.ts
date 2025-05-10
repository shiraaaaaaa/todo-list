import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'

const getDuckIcon = ({ color }: { color: string }) =>
  new Style({
    image: new Icon({
      scale: 0.05,
      src: 'https://cdn-icons-png.flaticon.com/512/1521/1521260.png',
      color: color,
    }),
  })

export default getDuckIcon
