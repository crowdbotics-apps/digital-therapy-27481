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
} from 'react-native';
import MainStyle from '../../../Styles/ButtonStyle';
// import Button from '../../src/component/Button';
import Counter from '../../../Component/Counter';
import Location from '../../../Component/Location';

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
  Text,
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
import {
  actionSelectedServices,
  actionAddress,
  actionOrder,
} from '../../../Actions/index';
class DropoffLocation extends Component {
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
    this.props.actionAddress('address', '');
    this.getUserAddress(this.props.MainReducer.user.UserId);
    console.warn(this.props.MainReducer.dropoffAddress);
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
              MainStyle.textStyleBlackBold,
              {width: '80%', textAlign: 'left', fontSize: 26},
            ]}
            numberOfLines={2}>
            Where should we return your shoes?
          </Text>
        </View>
        <View style={{flex: 0.4, flexGrow: 0.7}}>
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
              data={this.props.MainReducer.addresses}
              onLocationSelect={(location) => {
                this.props.actionOrder('dropoffAddress', location);
              }}
              selectedAddress={this.props.MainReducer.dropoffAddress}
              orderForm={true}
              navigation={this.props.navigation}
            />
          </View>
          <Button
            style={{
              backgroundColor: Theme.THEME_COLOR,
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              flex: 0.1,
            }}
            onPress={() => {
              this.props.navigation.navigate('AddAddress', {
                orderForm: true,
              });
            }}>
            <Text style={{color: 'white'}}>New Address</Text>
          </Button>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          {this.props.MainReducer.dropoffAddress != '' ? (
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                height: 70,
              }}
              onPress={() => {
                this.props.navigation.navigate('OrderConfirmation');
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
      actionSelectedServices,
      actionOrder,
      actionAddress,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(DropoffLocation);
