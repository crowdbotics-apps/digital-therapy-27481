import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
import axios from 'axios';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Button,
  Toast,
  Icon,
  Radio,
} from 'native-base';
import Theme from '../../Styles/Theme';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../Connection/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions, StackActions} from 'react-navigation';
import {actionSignup} from '../../Actions/index';
import {GoogleSignin} from '@react-native-community/google-signin';
import ProfileStatus from '../../Component/ProfileStatus';
import OneSignal from 'react-native-onesignal';
// import KlarnaPaymentView from 'react-native-klarna-inapp-sdk';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      sameAddress: true,
    };
  }
  componentDidMount() {
    this.getUserProfile();
  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <ProfileStatus navigation={this.props.navigation} />
          <Form
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 2,
              flex: 0.35,
            }}>
            <Form
              style={{
                flex: 0.6,
                height: '100%',
                justifyContent: 'space-evenly',
              }}>
              <Form style={{flex: 0.6}}>
                <Label style={Styles.labelStyle}>
                  {this.props.MainReducer.user.Name}
                </Label>
                <Label style={Styles.labelStyle}>
                  {this.props.MainReducer.user.PhoneNumber}
                </Label>
                {/* <TextInput
                editable={false}
                style={[
                  Styles.labelStyle,
                  {
                    textDecorationLine: 'none',
                    flex: 0.6,
                  },
                ]}
                selection={{start: 0}}
                numberOfLines={1}
                value={
                  this.props.MainReducer.user.Email +
                  'qwertyuioppasdfghjklzxcvbnm'
                }
              /> */}
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[Styles.labelStyle, {}]}>
                  {this.props.MainReducer.user.Email}
                </Text>
              </Form>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditAddress')}>
                <Label>Edit</Label>
              </TouchableOpacity>
            </Form>
            <Form
              style={{
                flex: 0.4,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="MaterialIcons"
                name="account-circle"
                style={{
                  width: '80%',
                  height: '80%',
                  fontSize: 100,
                  textAlign: 'center',
                  color: Theme.THEME_COLOR,
                }}
              />
            </Form>
          </Form>
          <Form style={{flex: 0.6}}>
            <Form style={Styles.formStyle}>
              <TouchableOpacity
                style={{
                  height: 70,
                  flex: 1,
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  marginHorizontal: 2,
                  borderColor: '#dcdcdc',
                  flexDirection: 'row',
                }}
                onPress={() => this.props.navigation.navigate('MyAddresses')}>
                <Form
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name="room"
                    style={Styles.iconStyle}
                  />
                  <Label>My Addresses</Label>
                </Form>
                <Form
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon type="MaterialIcons" name="keyboard-arrow-right" />
                </Form>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 70,
                  flex: 1,
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  marginHorizontal: 2,
                  borderColor: '#dcdcdc',
                  flexDirection: 'row',
                }}
                onPress={() => {}}>
                <Form
                  style={{
                    width: '90%',
                    justifyContent: 'center',
                  }}>
                  <Form
                    style={{
                      flexDirection: 'row',
                      width: '90%',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="MaterialIcons"
                      name="credit-card"
                      style={[Styles.iconStyle, {color: 'gray', marginTop: 4}]}
                    />
                    <Label style={{color: 'gray'}}>Payment Details</Label>
                  </Form>
                  <Label
                    style={{
                      fontSize: 10,
                      color: 'gray',
                      width: '80%',
                      alignSelf: 'center',
                    }}>
                    * At the moment only cash payments are accepted.Online
                    payments will be availabe soon!
                  </Label>
                </Form>

                <Form
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name="keyboard-arrow-right"
                    style={{color: 'gray'}}
                  />
                </Form>
              </TouchableOpacity>
              {/* <TouchableOpacity
              style={{
                height: 70,
                flex: 1,
                backgroundColor: 'white',
                borderWidth: 0.5,
                marginHorizontal: 2,
                borderColor: '#dcdcdc',
                flexDirection: 'row',
              }}
              onPress={() => {}}>
              <Form
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignItems: 'center',
                }}>
                <Icon
                  type="MaterialIcons"
                  name="feedback"
                  style={Styles.iconStyle}
                />
                <Label>Leave Feedback</Label>
              </Form>
              <Form
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon type="MaterialIcons" name="keyboard-arrow-right" />
              </Form>
            </TouchableOpacity>
             */}
              <TouchableOpacity
                style={{
                  height: 70,
                  flex: 1,
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  marginHorizontal: 2,
                  borderColor: '#dcdcdc',
                  flexDirection: 'row',
                }}
                onPress={() => {
                  this.reset();
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({routeName: 'LoginScreen'}),
                    ],
                  });

                  this.props.navigation.dispatch(resetAction);
                }}>
                <Form
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="MaterialIcons"
                    name="power-settings-new"
                    style={Styles.iconStyle}
                  />
                  <Label style={{}}>Logout</Label>
                </Form>
                <Form
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon type="MaterialIcons" name="keyboard-arrow-right" />
                </Form>
              </TouchableOpacity>
            </Form>
          </Form>
        </View>
      </ScrollView>
    );
  }
  reset() {
    this.props.actionSignup('selectedServices', []);
    this.props.actionSignup('pickupDate', '');
    this.props.actionSignup('pickupTime', '');
    this.props.actionSignup('pickupAddress', '');
    this.props.actionSignup('returnToSame', false);
    this.props.actionSignup('returnDate', '');
    this.props.actionSignup('returnTime', '');
    this.props.actionSignup('dropoffAddress', '');
    this.props.actionSignup('user', '');
    this.props.actionSignup('address', []);
    global.storage.remove({
      key: 'loginState',
    });
    GoogleSignin.signOut(() => {});
    OneSignal.deleteTag('userID', '' + this.props.MainReducer.user.UserId);
  }
  getUserProfile() {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat(
        'api/ShoeCleaning/GetUserProfile?UserId=' +
          this.props.MainReducer.user.UserId,
      ),
      headers: Header,
    })
      .then((res) => {
        if (res.status == 200) {
          self.props.actionSignup('user', res.data.data[0]);
        }
      })
      .catch(function (error) {
        // Toast.show({text: error.message}, 3000);
        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
}
const Styles = StyleSheet.create({
  ImageContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  logoStyle: {width: 100, height: 100},
  formStyle: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.8,
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    width: '100%',
  },
  iconStyle: {
    color: Theme.THEME_COLOR,
    textAlignVertical: 'center',
    marginHorizontal: 5,

    fontSize: 24,
  },
  labelStyle: {
    fontSize: 14,
    color: 'gray',
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
