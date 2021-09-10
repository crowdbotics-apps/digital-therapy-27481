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

class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', loading: false};
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
          <Text style={{textAlign: 'center'}}>{strings.otpText}</Text>

          <Form>
            <Text style={{marginLeft: 15, color: 'gray', fontSize: 12}}>
              {strings.phonefull}
            </Text>
            <Item>
              <Input
                style={Styles.inputStyle}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                defaultValue="+49"
              />
            </Item>

            <Button
              info
              style={{
                width: '100%',
                marginVertical: 20,
                justifyContent: 'center',
              }}>
              <Text style={{textAlign: 'center'}}>{strings.otpButton}</Text>
            </Button>
          </Form>
          <Form
            style={{
              alignItems: 'center',
              width: '100%',
              marginTop: 0,
            }}>
            <TouchableOpacity style={{marginTop: 0}}>
              <Text style={{}}>{strings.dataRates}</Text>
            </TouchableOpacity>
          </Form>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{marginTop: 0}}>
            <Text style={{textAlign: 'center'}}>{strings.backLogin}</Text>
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

export default OtpScreen;
