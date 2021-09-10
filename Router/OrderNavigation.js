import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Laundry from '../Screens/Dashboard/Laundry';
import ServiceSelection from '../Screens/Order/ServiceSelectionTest';

// import Signup from '../Screens/Onboarding/Signup';
// import Dashboard from '../Screens/Dashboard';

import Dashboard from './navigatorFooter';

const AppNavigator = createStackNavigator(
  {
    Laundry,
    ServiceSelection,
  },
  {
    initialRouteName: 'Laundry',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(AppNavigator);
