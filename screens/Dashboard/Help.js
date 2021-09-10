import React, {useState, Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
// import Button from '../../src/component/Button';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Toast,
  Text,
  Icon,
} from 'native-base';
import Theme from '../../Styles/Theme';
import qs from 'qs';
import strings from '../../Localization';
import {NavigationActions, StackActions} from 'react-navigation';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../Connection/index';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      showActive: true,
    };
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <Form style={Styles.formStyle}>
          <Text
            style={[
              MainStyle.textStyleBlackBold,
              {width: '100%', textAlign: 'left'},
            ]}>
            How can we help you?{' '}
          </Text>

          <Form style={{justifyContent: 'space-evenly'}}>
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '100%',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => {
                Linking.openURL('https://www.immerneu.de/');
              }}>
              <Text style={{color: 'white'}}>PRICES</Text>
            </Button>
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '100%',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.setState({showActive: !this.state.showActive});
              }}>
              <Text style={{color: 'white'}}>FREQUENTLY ASKED QUESTIONS</Text>
            </Button>
          </Form>
          <Form>
            <Text style={[{width: '100%', textAlign: 'left'}]}>
              Any questions left? Text us online or give us a call!
            </Text>
          </Form>
          <Form>
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '100%',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => {
                Linking.openURL(`tel:+49 176 778 47 664`);
              }}>
              <Text style={{color: 'white'}}>GIVE US A CALL (9AM - 5PM)</Text>
            </Button>

            <Form
              style={{
                flexDirection: 'row',
                height: 100,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://www.facebook.com/Immer-Neu-697799047039625',
                  );
                }}
                style={{flex: 0.8, height: '90%'}}>
                <Image
                  source={require('../../assets/facebooklogo.png')}
                  style={{flex: 0.9, height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://www.instagram.com/immerneu_germany/',
                  );
                }}
                style={{flex: 0.8, height: '90%'}}>
                <Image
                  source={require('../../assets/instagram.png')}
                  style={{flex: 0.9, height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://l.facebook.com/l.php?u=https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D4917677847664%26fbclid%3DIwAR3dyaahwqLvApuv5PJtYWkaw1204GVnBg78NG83n5vBA_kPnkGqi_8I264&h=AT2wg7HukcUeWfRmggqxPrjlZJDgDcQVgoqRTvG0NTT6dKh1rXKf4RNr2THljJMW8qXO_NZHJZJKgFQMM0SoazboWeMZOi7OQEUd6mBngMc9SF3X8VvRuWDv0AmWJQGIliNQeLwFXn46fa5pYGs-ZIPxl7R-Zyex',
                  );
                }}
                style={{flex: 0.8, height: '90%'}}>
                <Image
                  source={require('../../assets/whatsapp.png')}
                  style={{flex: 0.9, height: '100%'}}
                  resizeMode="contain"
                />
              </TouchableOpacity> */}
            </Form>
          </Form>
        </Form>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  ImageContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  logoStyle: {width: 100, height: 100},
  formStyle: {
    justifyContent: 'space-evenly',
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  inputStyle: {marginVertical: 5},
  lineStyle: {
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    width: '100%',
  },
  socialButton: {
    justifyContent: 'center',
  },
});

export default Help;
