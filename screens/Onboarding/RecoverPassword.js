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
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
      otp: '',
      submitting: false,
      received: false,
      confirmPassword: '',
      password: '',
      confirmPassError: false,
    };
  }
  componentDidMount() {
    console.warn(this.props.navigation.getParam('UserId', -1));
  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
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
            <View style={{marginVertical: 10}}>
              {/* <Text>Enter New Password</Text> */}
              <Item>
                <Input
                  style={Styles.inputStyle}
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={(text) => {
                    this.setState({password: text});
                  }}
                />
              </Item>
            </View>
          </Form>
          <Form style={Styles.formStyle}>
            <View style={{marginVertical: 10}}>
              {/* <Text>Confirm Password</Text> */}
              <Item error={this.state.confirmPassError}>
                <Input
                  style={Styles.inputStyle}
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={(text) => {
                    this.setState({confirmPassword: text});
                  }}
                />
              </Item>
            </View>
          </Form>

          <Button
            onPress={() => {
              if (this.state.password != '') {
                if (this.state.password === this.state.confirmPassword) {
                  !this.state.submitting
                    ? this.updatePassword(
                        this.props.navigation.getParam('UserId', -1),
                        this.state.password,
                      )
                    : null;
                } else {
                  this.setState({confirmPassError: true});
                  Toast.show({text: 'Password does not match'});
                }
              } else {
                Toast.show({text: 'Password cannot be blank'});
              }
            }}
            info
            style={{
              width: '80%',
              marginVertical: 20,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            {this.state.submitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{textAlign: 'center'}}>Update Password</Text>
            )}
          </Button>
        </View>
      </ScrollView>
    );
  }
  updatePassword(userid, password) {
    var self = this;
    self.setState({submitting: true});
    axios
      .post(
        BaseURL.concat(
          'api/ShoeCleaning/UpdateForgotPassowrd?UserId=' +
            userid +
            '&Password=' +
            password,
        ),
        {},
        {
          headers: Header,
        },
      )
      .then((res) => {
        if (res.data.success) {
          Toast.show({text: 'Password updated successfully'}, 3000);
          self.props.navigation.popToTop();
          console.warn(res.data);
        }
      })
      .catch(function (error) {
        console.warn(error);
        Toast.show({text: 'Something went wrong'}, 3000);
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
    width: '90%',
    alignSelf: 'center',
  },
  inputStyle: {marginVertical: 10, marginVertical: 10},
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

export default ForgotPassword;
