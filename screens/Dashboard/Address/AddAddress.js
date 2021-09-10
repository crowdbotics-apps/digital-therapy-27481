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
} from 'react-native';
import MainStyle from '../../../Styles/ButtonStyle';
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
class PickupTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      sameAddress: true,
      address: '',
      street: '',
      postcode: '',
      city: '',
      co: '',
      comments: '',
      name: '',
      submitting: false,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <Form
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon type="MaterialIcons" name="clear" />
            </TouchableOpacity>
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: 80,
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                height: 50,
              }}
              onPress={() => {
                var address = {
                  UserAddressId: 1,
                  UserId: this.props.MainReducer.user.UserId,
                  Name: this.state.name,
                  Address: this.state.address,
                  Street: this.state.street,
                  PostCode: this.state.postcode,
                  CO: this.state.co,
                  City: this.state.city,
                  Comments: this.state.comments,
                };
                if (
                  this.state.street != '' &&
                  this.state.postcode != '' &&
                  this.state.city != '' &&
                  this.state.name != '' &&
                  !this.state.submitting
                ) {
                  this.addUserAddress(address);
                } else {
                  Toast.show({
                    text: 'Input all mandatory fields',
                    buttonText: 'Okay',
                    duration: 3000,
                  });
                }
              }}>
              {this.state.submitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Label style={{color: 'white'}}>SAVE</Label>
              )}
            </Button>
          </Form>
          <Form style={Styles.formStyle}>
            <Input
              placeholderTextColor="#dcdcdc"
              placeholder="Name*"
              style={Styles.inputStyle}
              onChangeText={(text) => {
                this.setState({name: text});
              }}
            />
          </Form>
          <Form style={Styles.formStyle}>
            <Input
              placeholderTextColor="#dcdcdc"
              placeholder="Street, House No*"
              style={Styles.inputStyle}
              onChangeText={(text) => {
                this.setState({street: text});
              }}
            />
          </Form>
          <Form style={Styles.formStyle}>
            <Input
              placeholderTextColor="#dcdcdc"
              placeholder="Address Line 2"
              style={Styles.inputStyle}
              onChangeText={(text) => {
                this.setState({address: text});
              }}
            />
          </Form>
          <Form
            style={[
              Styles.formStyle,
              {justifyContent: 'space-evenly', padding: 0},
            ]}>
            <Input
              placeholder="Postcode*"
              placeholderTextColor="#dcdcdc"
              value={this.state.postcode}
              style={[Styles.inputStyle, {flex: 0.45}]}
              onChangeText={(text) => {
                this.setState({postcode: text});
              }}
            />
            <Input
              placeholderTextColor="#dcdcdc"
              placeholder="City*"
              style={[Styles.inputStyle, {flex: 0.45, color: 'black'}]}
              onChangeText={(text) => {
                this.setState({city: text});
              }}
            />
          </Form>
          <Form style={Styles.formStyle}>
            <Input
              placeholderTextColor="#dcdcdc"
              style
              placeholder="C/O"
              style={Styles.inputStyle}
              onChangeText={(text) => {
                this.setState({co: text});
              }}
            />
          </Form>
          <Form style={Styles.formStyle}>
            <Input
              placeholder="Comments"
              multiline
              placeholderTextColor="#dcdcdc"
              style={[
                Styles.inputStyle,
                {height: 100, textAlignVertical: 'top'},
              ]}
              onChangeText={(text) => {
                this.setState({comments: text});
              }}
            />
          </Form>
        </View>
      </ScrollView>
    );
  }
  addUserAddress(data) {
    var orderForm = this.props.navigation.getParam('orderForm', false);
    var isPickup = this.props.navigation.getParam('isPickup', false);

    var self = this;
    self.setState({submitting: true});
    axios
      .post(BaseURL.concat('api/ShoeCleaning/AddUserNewAddress'), data, {
        headers: Header,
      })
      .then((res) => {
        console.warn(res.data.data);
        var addressList = res.data.data;
        console.error(addressList.length);
        if (res.data.success) {
          self.props.actionAddress('address', addressList);
          if (orderForm) {
            if (isPickup) {
              addressList.length > 1
                ? self.props.actionAddress('pickupAddress', addressList[1])
                : self.props.actionAddress('pickupAddress', addressList[0]);
            } else {
              addressList.length > 1
                ? self.props.actionAddress('dropoffAddress', addressList[1])
                : self.props.actionAddress('dropoffAddress', addressList[0]);
            }
          } else {
            res.data.data.forEach((address) => {
              if (address.Selected) {
                self.props.actionAddress('pickupAddress', address);
                self.props.actionAddress('dropoffAddress', address);
                return;
              }
            });
          }
        }
        self.props.navigation.goBack();
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    width: '100%',
  },
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
export default connect(mapStateToProps, mapDispatchToProps)(PickupTime);
