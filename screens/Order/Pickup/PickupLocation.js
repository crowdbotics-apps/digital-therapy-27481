import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from 'react-native';
import MainStyle from '../../../Styles/ButtonStyle';
// import Button from '../../src/component/Button';
import Counter from '../../../Component/Counter';
import Location from '../../../Component/Location';
// import {Checkbox} from 'react-native-paper';
import axios from 'axios';
import Checkbox from '@react-native-community/checkbox';
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
import Theme from '../../../Styles/Theme';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../../Connection/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionOrder, actionAddress} from '../../../Actions/index';
class PickupLocation extends Component {
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
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.forceUpdate();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  getUserAddress(userid) {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat('api/ShoeCleaning/GetUserAddresses?UserId=' + userid),
      headers: Header,
    })
      .then((res) => {
        console.warn(res);
        if (res.data.success) {
          self.props.actionAddress('address', res.data.data);
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-evenly',
        }}>
        <View style={{flex: 0.1, padding: 20}}>
          <Text
            style={[
              {
                width: '80%',
                fontWeight: 'bold',
                textAlign: 'left',
                fontSize: 26,
              },
            ]}>
            Where should we pickup your shoes?
          </Text>
        </View>
        <View
          style={{
            flex: 0.4,

            flexGrow: 0.6,
          }}>
          <View
            style={{
              borderColor: '#dcdcdc',
              borderWidth: 1,
              borderRadius: 5,
              marginVertical: 5,
              width: '85%',
              alignSelf: 'center',
              flex: 0.9,
              padding: 2,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                marginVertical: 5,
              }}>
              Addresses
            </Text>
            <Location
              navigation={this.props.navigation}
              data={this.props.MainReducer.addresses}
              onLocationSelect={(location) => {
                this.props.actionOrder('pickupAddress', location);
              }}
              selectedAddress={this.props.MainReducer.pickupAddress}
              orderForm={true}
            />
          </View>
          <Button
            style={{
              backgroundColor: Theme.THEME_COLOR,
              width: '80%',
              flex: 0.1,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate('AddAddress', {
                orderForm: true,
                isPickup: true,
              });
            }}>
            <Text style={{color: 'white'}}>New Address</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
            flex: 0.1,
            marginLeft: 10,
            // padding: 10,
          }}>
          {/* <TouchableHighlight
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              flex: 0.1,
              backgroundColor: 'red',
              padding: 10,
            }}
            onPress={() => {
              this.props.actionOrder(
                'returnToSame',
                !this.props.MainReducer.returnToSame,
              );
              // this.setState({sameAddress: !this.state.sameAddress});
            }}> */}
          <Checkbox
            value={this.props.MainReducer.returnToSame}
            // status={
            //   this.props.MainReducer.returnToSame ? 'checked' : 'unchecked'
            // }
            hideBox={true}
            onChange={() => {
              this.props.actionOrder(
                'returnToSame',
                !this.props.MainReducer.returnToSame,
              );
            }}
            style={{
              color: Theme.THEME_COLOR,
              width: 25,
              height: 25,
              marginRight: 10,
            }}
            tintColors={{true: Theme.THEME_COLOR, false: 'gray'}}
          />
          {/* <View
              style={{
                width: 20,
                height: 20,
                borderColor: '#dcdcdc',
                borderRadius: 10,
                borderWidth: 1,
                marginRight: 10,
                backgroundColor: this.props.MainReducer.returnToSame
                  ? Theme.THEME_COLOR
                  : 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="MaterialIcons"
                name="done"
                style={{color: 'white', fontSize: 10}}
              />
            </View> */}
          <Label>Return to the same address</Label>
          {/* </TouchableHighlight> */}
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          {this.props.MainReducer.pickupAddress != '' ? (
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 0,
                height: 70,
              }}
              onPress={() => {
                this.props.navigation.navigate('DropoffTime');
              }}>
              <Text style={{color: 'white'}}>Next</Text>
            </Button>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  ImageContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  logoStyle: {width: 100, height: 100},
  formStyle: {
    justifyContent: 'space-evenly',
    flex: 0.1,
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
const mapStateToProps = (state) => {
  const {MainReducer} = state;
  return {MainReducer};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionOrder,
      actionAddress,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(PickupLocation);
