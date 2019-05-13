import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Auth } from '../api';
import { LoginScreen } from '../components';
import AdminNavigator from './AdminNavigator';
import UserNavigator from './UserNavigator';
import DarkAdminNavigator from './DarkAdminNavigator';
import DarkUserNavigator from './DarkUserNavigator';

class Navigator extends Component {
  render() {
    const { isAdmin, darkTheme } = this.props;

    const SwitchNavigator = createSwitchNavigator({
      Auth: { screen: Auth },
      Login: { screen: LoginScreen },
      Drawer: { screen: isAdmin ? darkTheme ? DarkAdminNavigator : AdminNavigator : darkTheme ? DarkUserNavigator : UserNavigator }
    });

    const Container = createAppContainer(SwitchNavigator);
    
    return (
      <Container />
    )
  }
}

mapStateToProps = (state) => ({
  isAdmin: state.isAdmin,
  darkTheme: state.darkTheme
})

export default connect(mapStateToProps, null)(Navigator);