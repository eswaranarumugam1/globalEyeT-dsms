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
const center = {
  lat: 12.3014731,
  lng: 76.6918883
}

const containerStyle = {
  width: "100%",
  height: "300px"
}
const Editmap = (props) => {
  const { latitude, longitude } = props
  const [currentPosition, setCurrentPosition] = useState({
    lat: Number(latitude), lng: Number(longitude)
  })

  const showPosition = data => {
    console.log("position")
    //setLatitude(12345)
    //  console.log(latitude)
    //   console.log(data1)
    //   console.log(props)

    const currentPosition = {
      // lat: latitude,
      // lng: longitude
      lat: data.coords.latitude,
      lng: data.coords.longitude
    }
    setCurrentPosition({
      lat: Number(latitude), lng: Number(longitude)
    })
    // setCurrentPosition(currentPosition)
  }


  const showError = err => {
    console.log("err")
    console.log(err.message)
  }
  useEffect(() => {

    // setCurrentPosition({lat:latitude, lng:longitude})
    // console.log("lucky")
    // //console.log(props.passLatLng)

    // const lat = latitude
    // const long = longitude

    // setCurrentPosition({lat, long})
    // if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
    // } 
    // console.log(currentPosition)

  }, [latitude, longitude])

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setCurrentPosition({ lat, lng })
    props.getLatLongCallback(lat, lng)
  }

  console.log(currentPosition)

  return (
    <LoadScript googleMapsApiKey="AIzaSyA8CLgpJsBX2VRXuwIOCkvER9dEUPq45c8">
      <GoogleMap
        // google={props.google} 
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={4}
      >
        {currentPosition.lat ? <Marker position={currentPosition} label={''} onDragEnd={(e) => onMarkerDragEnd(e)} draggable={true} /> : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Editmap)