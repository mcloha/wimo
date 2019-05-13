import { createDrawerNavigator } from 'react-navigation';
import { Main, Orders, About,  WimoMenu } from '../components';

const UserNavigator = createDrawerNavigator({
    Main: { screen: Main },
    Orders: { screen: Orders },
    About: { screen: About }
}, {
    contentComponent: WimoMenu,
    contentOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#fff'
    }
});

export default UserNavigator;

