import { createDrawerNavigator } from 'react-navigation';
import { AdminMain, About, WimoMenu, Orders } from '../components';

const AdminNavigator = createDrawerNavigator({
    Main: { screen: AdminMain },
    Orders: { screen: Orders },
    About: { screen: About }
}, {
    contentComponent: WimoMenu,
    contentOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#fff'
    }
});

export default AdminNavigator;
