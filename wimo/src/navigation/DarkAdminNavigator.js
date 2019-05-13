import { createDrawerNavigator } from 'react-navigation';
import { AdminMain, About, WimoMenu, Orders } from '../components';

const DarkAdminNavigator = createDrawerNavigator({
    Main: { screen: AdminMain },
    Orders: { screen: Orders },
    About: { screen: About }
}, {
    contentComponent: WimoMenu,
    contentOptions: {
      activeTintColor: '#746855',
      inactiveTintColor: '#f3d19c'
    }
});

export default DarkAdminNavigator;