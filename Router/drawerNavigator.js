import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';

import {DrawerItems, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Dashboard from '../Screens/Dashboard';
import Favorites from '../Screens/Favorites';
import AboutScreen from '../Screens/AboutScreen';
import Splash from '../Screens/Onboarding/FirstScreen';
import SideMenu from '../Menu/SideMenu';
import DrawerHeader from '../Menu/DrawerHeader';

import {Container, Header, Body, Icon, Content} from 'native-base';
import Theme from '../Styles/Theme';
import App_Review from '../Screens/App_Review';
const customNavigator = (props) => (
  <Container>
    <DrawerHeader />

    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);
const MenuIcon = ({navigate}) => (
  <Icon name="ios-menu" onPress={() => navigate('DrawerOpen')} />
);
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../assets/twitter.png')}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({navigation}) => ({
        title: 'Demo Screen 1',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
      }),
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: ({navigation}) => ({
        title: 'Demo Screen 1',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
      }),
    },
    AboutScreen: {
      screen: AboutScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Demo Screen 1',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
      }),
    },
    AppReview: {
      screen: App_Review,
      navigationOptions: ({navigation}) => ({
        title: 'Demo Screen 1',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
      }),
    },
    Splash: {screen: Splash},
  },
  {
    drawerWidth: 250,
    drawerPosition: 'left',
    contentOptions: {activeTintColor: Theme.THEME_COLOR},
    contentComponent: SideMenu,
  },
);

export default createAppContainer(DrawerNavigator);
