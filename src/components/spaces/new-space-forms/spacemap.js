import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
mapboxgl.accessToken = process.env.MAPBOX_TOKEN

const bounds = [[-0.483702, 51.334679], [0.190262, 51.655070]]

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
})

class Map2 extends React.Component {
  constructor() {
    super()

    this.state = {
      center: {
        lat: 51.507351,
        lng: -0.127758
      }
    }
    this.marker = []
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.map()
  }
  componentDidUpdate() {
    this.marker.remove()
    this.marker = new mapboxgl.Marker()
      .setLngLat(this.state.center)
      .addTo(this.map)
  }

  handleClick(e){
    this.map.flyTo({
      center: [e.lngLat.lng, e.lngLat.lat],
      zoom: 16
    })
    const {lng, lat} = e.lngLat
    this.setMarkers({lng, lat})
    this.setState({...this.state, center: [lng, lat]}, this.props.geometryChange(this.state.center))
  }

  setMarkers({lng, lat}){
    this.marker.remove()
    this.marker = new mapboxgl.Marker()
      .setLngLat({ lng, lat})
      .addTo(this.map)
    return this.marker
  }

  map(){
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.state.center,
      zoom: 10,
      maxBounds: bounds
    })
      .addControl(geocoder)
    this.marker = new mapboxgl.Marker()
      .setLngLat(this.state.center)
      .addTo(this.map)
    this.map.on('click', this.handleClick)
    geocoder.on('result', e => {
      this.setState({...this.state, center: e.result.geometry.coordinates}, () => {
        this.props.geometryChange(this.state.center)
      })
    })
  }

  render(){
    return(
      <div className="map2" ref={el => this.mapDiv = el} />
    )
  }
}

export default Map2
