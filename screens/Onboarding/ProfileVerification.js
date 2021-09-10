import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import axios from 'axios';
import {Form, Toast, Button} from 'native-base';
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSignup} from '../../Actions/index';
import {TouchableOpacity} from 'react-native';

class ProfileVerfication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      otp: '',
      submitting: false,
      received: false,
      UserId: '',
      verifying: false,
      seconds: 60,
      enableResend: false,
    };
  }
  componentDidMount() {
    if (
      this.props.MainReducer.user != '' &&
      this.props.MainReducer.user != undefined &&
      this.props.MainReducer.user != null
    ) {
      console.warn(this.props.MainReducer.user);
      this.sendOTP(this.props.MainReducer.user.Email);
    } else {
      console.warn('cant send otp');
      //   Toast.show({text: 'Something went wrong', duration: 3000});
      Toast.show({
        text: 'Something went wrong',
        duration: 5000,
      });
    }
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
    console.warn(this.state.otp);
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
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 14,
                color: 'gray',
              }}>
              {strings.emailverfication}
            </Text>

            {/* {!this.state.received ? (
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
            )} */}

            <CodePin
              keyboardType="numeric"
              code={'' + this.state.otp} // code.length is used if you not pass number prop
              success={() => {
                this.setState({received: false});
              }} // If user fill '2018', success is called
              text="Email Verfication" // My title
              error="Invalid OTP" // If user fail (fill '2017' for instance)
              autoFocusFirst={false} // disabling auto-focus
              containerStyle={{marginVertical: 20}}
              // containerPinStyle={{backgroundColor: 'white'}}
              number={4}
              pinStyle={{height: 50}}
              autoFocusFirst
            />

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
                    this.sendOTP(this.props.MainReducer.user.Email);
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

            <Button
              onPress={() => {
                !this.state.submitting
                  ? this.verifyEmail(this.props.MainReducer.user.UserId)
                  : null;
              }}
              info
              style={{width: '100%', justifyContent: 'center'}}>
              {this.state.verifying ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{textAlign: 'center', color: 'white'}}>
                  {this.state.received ? 'Verify' : 'Verify'}
                </Text>
              )}
            </Button>

            <Form
              style={{
                alignItems: 'center',
                width: '100%',
                marginTop: 20,
              }}>
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ContactSupport');
                }}
                style={{marginTop: 10}}>
                <Text style={{}}>{strings.cantAccess}</Text>
              </TouchableOpacity> */}
            </Form>
            {/* <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Text style={{textAlign: 'center'}}>{strings.rememberPass}</Text>
            </TouchableOpacity> */}
          </Form>
        </View>
      </ScrollView>
    );
  }
  sendOTP(email) {
    var self = this;
    var ForVerifyProfile = true;

    self.setState({submitting: true, enableResend: false, seconds: 60});
    axios
      .post(
        BaseURL.concat(
          'api/ShoeCleaning/GenerateOtp?email=' +
            email +
            '&ForVerifyProfile=true',
        ),

        {
          headers: Header,
        },
      )
      .then((res) => {
        console.warn(res);
        if (res.data.success) {
          self.setState({
            otp: res.data.data[0].OTP,
            UserId: res.data.data[0].UserId,
            received: true,
          });
          Toast.show({
            text: 'OTP has been sent to your email address',
            duration: 5000,
          });
        } else {
          Toast.show({text: res.data.message, duration: 5000});
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
  verifyEmail(userid) {
    var self = this;
    self.setState({verifying: true});
    axios
      .post(
        BaseURL.concat(
          'api/ShoeCleaning/UpdateProfileStatus?UserId=' +
            userid +
            '&ProfileStatus=' +
            true,
        ),

        {
          headers: Header,
        },
      )
      .then((res) => {
        if (res.data.success) {
          self.props.actionSignup('user', res.data.data[0]);
          self.saveUser(res.data.data[0]);

          Toast.show({
            text: 'Profile verification completed successfully',
            duration: 6000,
          });
        } else {
          //   Toast.show({text: res.data.message}, 3000);
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({verifying: false}));
  }
  saveUser(data) {
    var self = this;
    global.storage.save({
      key: 'loginState', // Note: Do not use underscore("_") in key!
      data,
      // if not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null,
    });
    //
    global.storage
      .load({
        key: 'loginState',
      })
      .then((ret) => {
        // found data goes to then()
        self.props.actionSignup('user', ret);
        self.props.navigation.goBack();
        // self.props.actionSignup('profileStatus', ret.ProfileStatus);
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        //  console.warn(err.messagce);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
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
const mapStateToProps = (state) => {
  const {MainReducer} = state;
  return {MainReducer};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionSignup,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProfileVerfication);
