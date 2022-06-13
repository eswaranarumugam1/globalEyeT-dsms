import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import Validations from './createform'
import Breadcrumbs from '@components/breadcrumbs'

const SchoolCreate = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Validations />
        </Col>
      </Row>
    </Fragment>
  )
}
export default SchoolCreate

// import React, { Component } from 'react'
// import GoogleMapReact from 'google-map-react'

// const AnyReactComponent = ({ text }) => <div>{text}</div>

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 12.3174912,
//       lng: 76.6738432
//     },
//     zoom: 11
//   }

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyA8CLgpJsBX2VRXuwIOCkvER9dEUPq45c8' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="My Marker"
//           />
//         </GoogleMapReact>
//       </div>
//     )
//   }
// }

// export default SimpleMap