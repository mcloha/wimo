import { createDrawerNavigator } from 'react-navigation';
import { Main, Orders, About,  WimoMenu } from '../components';

const DarkUserNavigator = createDrawerNavigator({
    Main: { screen: Main },
    Orders: { screen: Orders },
    About: { screen: About }
}, {
    contentComponent: WimoMenu,
    contentOptions: {
        activeTintColor: '#746855',
        inactiveTintColor: '#f3d19c'
      }
});

export default DarkUserNavigator;