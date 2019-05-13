import React, { Component } from 'react';
import { ProgressBarAndroid, Alert, BackHandler, View } from 'react-native';
import * as firebase from 'firebase';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { updateLocation } from '../actions/actions';

const { Marker } = MapView;

class AdminMap extends Component {
  state = {
    loading: false,
    errorMessage: null
  }

  componentWillMount() {
    this.setState({
      loading: true
    });
    this.watchLocation();
  }

  componentDidUpdate() {
    const { location, selectedOrder, isAdmin } = this.props;

    const { currentUser } = firebase.auth();
    let { uid } = currentUser;

    if(location) {
      firebase.database().ref(`users/${uid}/coords`).set(location);
      if(selectedOrder && isAdmin) {
        firebase.database().ref(`orders/${selectedOrder.oid}/coords`).set(location);
      }
    }
  }

  componentWillUnmount() {
    this.unwatchLocation();
  }

  watchLocation = () => {
    const { updateLocation, location } = this.props;
    
    const success = position => {
      const { coords } = position;

      updateLocation(coords);
      this.setState({
        loading: false
      });
    };

    const error = err => {
      Alert.alert(
        err.message,
        'Turn on GPS and then press "OK"',
        [
          { text: 'OK', onPress: () => {
              setTimeout(() => {
                this.componentWillMount();
              }, 3000);
            }
          },
          {
            text: 'Cancel',
            onPress: () => BackHandler.exitApp(),
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
    };

    const options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 };

    this.watchId = navigator.geolocation.watchPosition(success, error, options);

    const { currentUser } = firebase.auth();
    let { uid } = currentUser;
    
    if (location) {
      firebase.database().ref(`users/${uid}/coords`).set(location);
    }
    
  }

  unwatchLocation = () => {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const { location, selectedOrder, darkTheme } = this.props;

    if(this.state.loading) {
      return (
        <ProgressBarAndroid color={darkTheme ? '#f3d19c' : '#fff'}/>
      )
    }

    const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ];

    return (
        <MapView
            style={{ flex: 1 }}
            customMapStyle={mapStyle}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}>
        { selectedOrder ? <View><Marker title="Your location" image={require('../../assets/shaliah.png')} coordinate={location}/><Marker title="Destination" image={require('../../assets/home.png')} coordinate={selectedOrder.dest}/></View> : <Marker title="Your location" image={require('../../assets/shaliah.png')} coordinate={location}/> }
        </MapView>
    )
  }
}

const mapStateToProps = state => ({
  selectedOrder: state.selectedOrder,
  location: state.location,
  isAdmin: state.isAdmin,
  darkTheme: state.darkTheme
});

const mapDispatchToProps = dispatch => ({
  updateLocation: location => dispatch(updateLocation(location)),
  getOrders: () => dispatch(getOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMap);