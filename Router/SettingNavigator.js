import {createStackNavigator, createAppContainer} from 'react-navigation';
import ProfileInfo from '../Screens/Dashboard/';

import MyAddresses from '../Screens/Dashboard/Address/MyAddresses';

import EditAddress from '../Screens/Dashboard/Address/EditAddress';
const AppNavigator = createStackNavigator(
  {
    Profile: {screen: Profile},
    MyAddresses,
    EditAddress,
  },

  {
    initialRouteName: 'Profile',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(AppNavigator);
