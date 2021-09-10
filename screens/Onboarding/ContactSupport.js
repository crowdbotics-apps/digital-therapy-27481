import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
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

class ContactSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', loading: false, otp: ''};
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={Styles.ImageContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={Styles.logoStyle}
            resizeMode="contain"
          />
        </View>
        <Form style={Styles.formStyle}>
          <Text style={{textAlign: 'center'}}>{strings.supportText}</Text>

          <Form style={{alignSelf: 'center'}}>
            <Text style={MainStyle.textStyleBlackBold}>
              {strings.supportNumber}
            </Text>

            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {fontSize: 14, fontWeight: '100'},
              ]}>
              {strings.supportTiming}
            </Text>
          </Form>
          <Form
            style={{
              alignItems: 'center',
              width: '100%',
              marginTop: 0,
            }}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {fontSize: 14, fontWeight: 'bold'},
              ]}>
              {strings.supportInst}
            </Text>
          </Form>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{marginTop: 0}}>
            <Text style={{textAlign: 'center', color: 'gray'}}>
              {strings.backLogin}
            </Text>
          </TouchableOpacity>
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
    flex: 0.5,
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

export default ContactSupport;
