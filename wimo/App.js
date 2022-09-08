import React, { Component } from 'react';
import { StatusBar, I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './src/navigation/Navigator';
import store from './src/store/';

console.disableYellowBox = true;

console.log(Navigator);

class App extends Component {
  componentWillMount() {
    StatusBar.setHidden(true);
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
  }
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}

export default App;

