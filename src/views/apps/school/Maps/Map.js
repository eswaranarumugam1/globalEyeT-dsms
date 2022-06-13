import ReactDOM from "react-dom"
import React, { useEffect, useState } from "react"
import {
      GoogleMap,
      Marker,
      InfoWindow,
      LoadScript,
      withGoogleMap
    } from "@react-google-maps/api"  

    // const [latitude, setLatitude] = useState('')
    // const [longitude, setLongitude] = useState('')
    const center = {  lat: 12.3014731,
        lng: 76.6918883 }

    const containerStyle = {
      width: "100%",
      height: "300px"
    }
    
    const Map = props => {
        const [currentPosition, setCurrentPosition] = useState({center}) 
        const showPosition = data => {
            console.log("position")
            const currentPosition = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
              }
              setCurrentPosition(currentPosition)
          }
        
          const showError = err => {
            console.log("err")
            console.log(err.message)
          } 

        useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError) 
            } 
            console.log(props)  
        }, []) 
            const onMarkerDragEnd = (e) => {
                const lat = e.latLng.lat()
                const lng = e.latLng.lng() 
                setCurrentPosition({ lat, lng})
                props.getLatLongCallback(lat, lng) 
              }
              console.log(currentPosition)
              return (
                <LoadScript googleMapsApiKey="AIzaSyA8CLgpJsBX2VRXuwIOCkvER9dEUPq45c8"> 
                  <GoogleMap google={props.google} mapContainerStyle={containerStyle} zoom={10}
                      center={currentPosition}> { currentPosition.lat ? <Marker position={currentPosition} onDragEnd={(e) => onMarkerDragEnd(e)} draggable={true}  /> : null }
                  </GoogleMap>
                </LoadScript> 
             )
        } 
      
export default React.memo(Map)