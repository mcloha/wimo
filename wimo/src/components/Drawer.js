import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Main from './Main';
import History from './Orders';
import Profile from './Profile';
import About from './About';
import WimoMenu from './WimoMenu';

const DrawerNavigator = createDrawerNavigator({
    Main: { screen: Main },
    History: { screen: History },
    Profile: { screen: Profile },
    About: { screen: About }
  }, {
    contentComponent: WimoMenu
});

class Drawer extends Component {
  render() {
    return (
      <View>
        <DrawerNavigator />
      </View>
    )
  }
}

export default Drawer;
