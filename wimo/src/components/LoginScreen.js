import React, { Component } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid, Alert, Image, ImageBackground  } from 'react-native';
import * as firebase from 'firebase';
import Expo from 'expo';
import { Button } from './';
import { ANDROID_CLIENT_ID } from 'react-native-dotenv';
import { connect } from 'react-redux'; 

class LoginScreen extends Component {
  state = {
    loading: false
  }
  logIn = async () => {
    this.setState({ loading: true });
    Expo.Google.logInAsync({ androidClientId: ANDROID_CLIENT_ID })
    .then(res => {
      const { type, idToken, accessToken } = res; 

      if (type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
  
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then(() => {
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
          Alert.alert('Login failed.', err);
        })
      }

    })
    .catch(err => {
      Alert.alert('Login failed.', err);
      this.setState({ loading: false });
    });
  }

  render() {
    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ProgressBarAndroid color="#000"/>
        </View >
      )
    }
    return (
        <View source={require('../../assets/background.jpg')} style={styles.container}>
          <Image style={styles.image} source={require('../../assets/wimoLogo.png')} />
          <Button text="Sign in with google" icon="account-box" color="#fff" onClick={this.logIn} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1f5fe'
    },
    image: {
      padding: 10,
      margin: 20
    }
});


export default connect(null , null)(LoginScreen);