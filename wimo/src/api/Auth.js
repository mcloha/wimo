import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, StyleSheet, ProgressBarAndroid } from 'react-native';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID } from 'react-native-dotenv';
import { connect } from 'react-redux';
import { checkIfAdmin, toggleTheme } from '../actions/actions';

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

class Auth extends Component {
  componentWillMount() {
    const { navigate } = this.props.navigation;
    const { checkIfAdmin } = this.props;

    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        checkIfAdmin(user.uid);
        navigate('Main', user);
      } else {
        navigate('Login');
      }
    });
  }

  componentWillUnmount() {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('closing session');
    });

    unsubscribe();
  }

  styles = () => {
    const { darkTheme } = this.props;
    
    return {
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: darkTheme ? '#242f3e' : '#269bd8'
      }
    }
  }

  render() {
    const { darkTheme } = this.props;
    const { container } = this.styles();

    return (
      <View style={container}>
        <ProgressBarAndroid color={darkTheme ? '#f3d19c' : '#fff'}/>
      </View>
    )
  }
}

mapStateToProps = (state) => ({
  isAdmin: state.isAdmin,
  darkTheme: state.darkTheme
})

const mapDispatchToProps = (dispatch) => ({
  checkIfAdmin: (uid) => dispatch(checkIfAdmin(uid)),
  toggleTheme: () => dispatch(toggleTheme)
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
