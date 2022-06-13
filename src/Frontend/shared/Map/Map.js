
import React from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
const markers = [
  {
      id:1,
      latitude: 25.0391667,
      longitude: 121.525,
      shelter:'marker 1'

  },
  {
      id: 2,
      latitude: 24.0391667,
      longitude: 110.525,
      shelter: 'marker 2'

  },
  {
      id: 3,
      latitude: 20.0391667,
      longitude: 100.525,
      shelter: 'marker 3'

  }
]
const containerStyle = {
  width: '400px',
  height: '400px'
}

const center = {
  lat: 12.3014731,
  lng: 76.6918883
}

function Map(props) {
  console.log(props.markers)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA8CLgpJsBX2VRXuwIOCkvER9dEUPq45c8"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount} 
      >
        {props.markers?.map(marker => {
            //const onClick = props.onClick.bind(this, marker)
            return (
                <Marker
                    key={marker.id} 
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                >
                    <InfoWindow>
                        <div>
                            {marker.shelter}
                        </div>
                    </InfoWindow>
                </Marker>
            )
        })}


        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map