import ReactDOM from "react-dom"
    import React from "react"
    import {
      GoogleMap,
      Marker,
      InfoWindow,
      LoadScript
    } from "@react-google-maps/api"

    
    const { useState } = React
    const containerStyle = {
      width: "100%",
      height: "100%"
    }
    
    const center = {  lat: 23.956012, lng: 36.0460317 }
    
    function Map(props) {
      const [infoWindowID, setInfoWindowID] = useState("")
      let markers
    
      if (props.markers !== null) {
        markers = props.markers?.map((location, i) => {
          const marker = { lat: location.latitude, lng: location.longitude }
          const index = i + 1
          return (
            <Marker
              key={index}
              position={marker}
              label={''}
              onClick={() => {
                setInfoWindowID(index)
              }}
            >
              {infoWindowID === index && (
                <InfoWindow>
                  <span>{location.shelter}</span>
                </InfoWindow>
              )}
            </Marker>
          )
        })
      }
      return (
        <LoadScript googleMapsApiKey="AIzaSyA8CLgpJsBX2VRXuwIOCkvER9dEUPq45c8">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
            {markers}
          </GoogleMap>
        </LoadScript>
      )
    }
    
    export default React.memo(Map)