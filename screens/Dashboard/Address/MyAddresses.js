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
import {actionAddress} from '../../../Actions/index';
class MyAddresses extends Component {
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
    this.getUserAddress(this.props.MainReducer.user.UserId);
  }
  render() {
    return (
      <ScrollView
        ref="scrollview"
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            //   justifyContent: 'space-evenly',
          }}>
          <View style={{flex: 0.1, padding: 20}}>
            {/* <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '80%', textAlign: 'left', fontSize: 26},
              ]}
              numberOfLines={2}>
              My Addresses
            </Text> */}
          </View>
          <View style={{flex: 0.1, padding: 5}}>
            <Text
              style={[
                {
                  width: '100%',
                  textAlign: 'center',
                  color: 'gray',
                  fontSize: 14,
                },
              ]}
              numberOfLines={2}>
              {this.props.MainReducer.addresses != null
                ? this.props.MainReducer.addresses.length == 0
                  ? 'Add a pick up and delivery address'
                  : 'Tap address to set as default'
                : 'Add a pick up and delivery address'}
            </Text>
          </View>
          <View style={{flex: 0.4, flexGrow: 0.5}}>
            <Location
              editable={true}
              data={this.props.MainReducer.addresses}
              onLocationSelect={(location) => {
                this.props.actionAddress('pickupAddress', location);
              }}
              onLocationOpen={(location) => {
                this.props.navigation.navigate('AddressDetail', {location});
              }}
              resetScroll={() => {
                setTimeout(
                  () =>
                    this.refs.scrollview.scrollTo({x: 0, y: 0, animated: true}),
                  100,
                );
              }}
            />
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('AddAddress');
              }}>
              <Text style={{color: 'white'}}>New Address</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
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
      actionAddress,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(MyAddresses);
