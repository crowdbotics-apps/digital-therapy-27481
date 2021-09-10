import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {Image, View, Text} from 'react-native';
// import Laundry from '../Screens/Dashboard/Laundry';
import OrderHistory from '../Screens/Dashboard/OrderHistory';
import Notifications from '../Screens/Dashboard/Notifications';

import Help from '../Screens/Dashboard/Help';

import Profile from '../Screens/Dashboard/Profile';
import Laundry from '../Router/OrderNavigation';

import StyleMain from '../Styles/ButtonStyle';
import theme from '../Styles/Theme';
import {Icon} from 'react-native-elements';
const Navigation = createBottomTabNavigator(
  {
    Laundry: {
      screen: Laundry,
      navigationOptions: {
        title: 'Laundry',
        tabBarLabel: ({focused, tintColor}) => {
          if (focused) {
            return <Text style={StyleMain.tabTextStyle}>Laundry</Text>;
          }
          return (
            <Text style={[StyleMain.tabTextStyle, {color: '#a9a9a9'}]}>
              Laundry
            </Text>
          );
        },
        tabBarIcon: ({tintColor}) => (
          <Icon type={'material'} name={'store'} size={25} color={tintColor} />
        ),
        // <Image
        //   style={{ width: 25, height: 25, resizeMode: "contain" }}
        //   source={require("../assets/tag.png")}
        // />
      },
    },
    OrderHistory: {
      // screen: Settings,
      screen: OrderHistory,
      navigationOptions: {
        title: 'OrderHistory',
        tabBarLabel: ({focused, tintColor}) => {
          if (focused) {
            return <Text style={StyleMain.tabTextStyle}>Orders</Text>;
          }
          return (
            <Text style={[StyleMain.tabTextStyle, {color: '#a9a9a9'}]}>
              Orders
            </Text>
          );
        },
        tabBarIcon: ({tintColor}) => (
          <Icon
            type={'material'}
            name={'shopping-cart'}
            size={25}
            color={tintColor}
          />
          // <Image
          //   style={[
          //     { tintColor, width: 25, height: 25, resizeMode: "contain" }
          //   ]}
          //   source={require("../assets/bell.png")}
          // />
        ),
      },
    },
    Help: {
      screen: Help,
      navigationOptions: {
        title: 'Help',

        tabBarLabel: ({focused, tintColor}) => {
          if (focused) {
            return <Text style={StyleMain.tabTextStyle}>Help</Text>;
          }
          return (
            <Text style={[StyleMain.tabTextStyle, {color: '#a9a9a9'}]}>
              Help
            </Text>
          );
        },
        tabBarIcon: ({tintColor}) => (
          <Icon type={'material'} name={'info'} size={25} color={tintColor} />

          // <Image
          //   style={[
          //     { tintColor, width: 25, height: 25, resizeMode: "contain" }
          //   ]}
          //   source={require("../assets/settings_icon.png")}
          // />
        ),
        headerTitle: 'My Notifications',
      },
    },
    // Notifications: {
    //   screen: Notifications,
    //   navigationOptions: {
    //     title: 'Notifications',
    //     tabBarLabel: ({focused, tintColor}) => {
    //       if (focused) {
    //         return <Text style={StyleMain.tabTextStyle}>Notifications</Text>;
    //       }
    //       return (
    //         <Text style={[StyleMain.tabTextStyle, {color: '#a9a9a9'}]}>
    //           Notifications
    //         </Text>
    //       );
    //     },
    //     tabBarIcon: ({tintColor}) => (
    //       <Icon
    //         type={'material'}
    //         name={'notifications'}
    //         size={25}
    //         color={tintColor}
    //       />

    //       // <Image
    //       //   style={[
    //       //     { tintColor, width: 25, height: 25, resizeMode: "contain" }
    //       //   ]}
    //       //   source={require("../assets/settings_icon.png")}
    //       // />
    //     ),
    //   },
    // },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: ({focused, tintColor}) => {
          if (focused) {
            return <Text style={StyleMain.tabTextStyle}>Profile</Text>;
          }
          return (
            <Text style={[StyleMain.tabTextStyle, {color: '#a9a9a9'}]}>
              Profile
            </Text>
          );
        },
        tabBarIcon: ({tintColor}) => (
          <Icon type={'material'} name={'person'} size={25} color={tintColor} />
        ),
      },
    },
  },

  {
    initialRouteName: 'Laundry',
    headerMode: 'none',
    tabBarOptions: {
      showIcon: true,
      showLabel: true, // hide labels
      activeTintColor: theme.THEME_COLOR,

      activeBackgroundColor: 'white',
      inactiveTintColor: '#a9a9a9', // inactive icon color
      style: {
        backgroundColor: 'white', // TabBar background
      },
    },
  },
);

export default createAppContainer(Navigation);
