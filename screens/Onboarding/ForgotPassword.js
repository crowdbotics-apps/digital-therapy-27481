import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
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
import CodePin from 'react-native-pin-code';
class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      otp: '',
      submitting: false,
      received: false,
      UserId: '',
      seconds: 60,
      enableResend: true,
    };
  }
  componentDidMount() {
    this.setTimer();
  }
  setTimer() {
    setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({seconds: this.state.seconds - 1});
      } else {
        this.setState({enableResend: true});
      }
    }, 1000);
  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-evenly',
          backgroundColor: 'white',
        }}>
        <View style={{flex: 1}}>
          <View style={Styles.ImageContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={Styles.logoStyle}
              resizeMode="contain"
            />
          </View>
          <Form style={Styles.formStyle}>
            {!this.state.received ? (
              <View>
                <Text>{strings.resetPassText}</Text>
                <Item>
                  <Input
                    style={Styles.inputStyle}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text) => {
                      this.setState({email: text});
                    }}
                    underlineColorAndroid={'gray'}
                    autoCapitalize="none"
                    value={this.state.email}
                  />
                </Item>
              </View>
            ) : (
              <View />
            )}
            {this.state.received ? (
              <CodePin
                keyboardType="numeric"
                code={'' + this.state.otp} // code.length is used if you not pass number prop
                success={() => {
                  this.setState({received: false});
                  this.props.navigation.navigate('RecoverPassword', {
                    UserId: this.state.UserId,
                  });
                }} // If user fill '2018', success is called
                text="Verify OTP" // My title
                error="Invalid OTP" // If user fail (fill '2017' for instance)
                autoFocusFirst={false} // disabling auto-focus
                containerStyle={{marginVertical: 20}}
                // containerPinStyle={{backgroundColor: 'white'}}
                number={4}
                pinStyle={{height: 40}}
                autoFocusFirst
              />
            ) : (
              <View />
            )}
            {this.state.received ? (
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginVertical: 20,
                }}>
                <Text>Didn't receive the OTP, </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.enableResend) {
                      this.sendOTP(this.state.email);
                    }
                  }}>
                  <Text
                    style={{color: this.state.enableResend ? 'blue' : 'black'}}>
                    {this.state.enableResend
                      ? `Re-send?`
                      : `Re-send in ${this.state.seconds} sec`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <Button
              onPress={() => {
                if (this.state.email != '') {
                  !this.state.submitting
                    ? this.sendOTP(this.state.email)
                    : null;
                } else {
                  Toast.show({text: 'Enter email to recover password'});
                }
              }}
              info
              style={{width: '100%', justifyContent: 'center'}}>
              {this.state.submitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{textAlign: 'center'}}>
                  {this.state.received ? 'Verify' : strings.otpButton}
                </Text>
              )}
            </Button>

            <Form
              style={{
                alignItems: 'center',
                width: '100%',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ContactSupport');
                }}
                style={{marginTop: 10}}>
                <Text style={{}}>{strings.cantAccess}</Text>
              </TouchableOpacity>
            </Form>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Text style={{textAlign: 'center'}}>{strings.rememberPass}</Text>
            </TouchableOpacity>
          </Form>
        </View>
      </ScrollView>
    );
  }
  sendOTP(email) {
    var self = this;
    self.setState({submitting: true, enableResend: false, seconds: 60});
    axios
      .post(
        BaseURL.concat('api/ShoeCleaning/GenerateOtp?email=' + email),
        {email} + '&ForVerifyProfile=false',
        {
          headers: Header,
        },
      )
      .then((res) => {
        if (res.data.success) {
          self.setState({
            otp: res.data.data[0].OTP,
            UserId: res.data.data[0].UserId,
            received: true,
          });
          console.warn(res.data.data[0].OTP);
        } else {
          Toast.show({text: res.data.message}, 3000);
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
}
const Styles = StyleSheet.create({
  ImageContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  logoStyle: {width: 100, height: 100},
  formStyle: {
    justifyContent: 'center',
    flex: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
  inputStyle: {marginVertical: 15},
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

export default RecoverPassword;
