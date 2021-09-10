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
class AddressDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      address: '',
      street: '',
      postcode: '',
      city: '',
      co: '',
      comments: '',
      name: '',
      UserAddressId: '',
      UserId: '',
      deleting: false,
    };
  }
  componentDidMount() {
    var address = this.props.navigation.getParam('location', '');
    if (address != '') {
      this.setState({
        name: address.Name,
        street: address.Street,
        address: address.Address,
        postcode: address.PostCode,
        co: address.CO,
        city: address.City,
        comments: address.Comments,
        UserAddressId: address.UserAddressId,
        UserId: address.UserId,
      });
    }
    console.warn(address);
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
                  Name: this.state.name,
                  Address: this.state.address,
                  Street: this.state.street,
                  PostCode: this.state.postcode,
                  CO: this.state.co,
                  City: this.state.city,
                  Comments: this.state.comments,
                  UserAddressId: this.state.UserAddressId,
                  UserId: this.state.UserId,
                };
                if (
                  this.state.street != '' &&
                  this.state.postcode != '' &&
                  this.state.city != '' &&
                  this.state.name != ''
                ) {
                  this.updateUserAddress(address);
                } else {
                  Toast.show({
                    text: 'Input all mandatory fields',
                    buttonText: 'Okay',
                    duration: 3000,
                  });
                }
              }}>
              <Label style={{color: 'white'}}>Update</Label>
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
              value={this.state.name}
            />
          </Form>
          <Form style={Styles.formStyle}>
            <Input
              placeholderTextColor="#dcdcdc"
              placeholder="Street,House No*"
              style={Styles.inputStyle}
              onChangeText={(text) => {
                this.setState({street: text});
              }}
              value={this.state.street}
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
              value={this.state.address}
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
              style={[Styles.inputStyle, {flex: 0.45}]}
              onChangeText={(text) => {
                this.setState({postcode: text});
              }}
              value={this.state.postcode}
            />
            <Input
              placeholderTextColor="#dcdcdc"
              placeholder="City*"
              style={[Styles.inputStyle, {flex: 0.45, color: 'black'}]}
              onChangeText={(text) => {
                this.setState({city: text});
              }}
              value={this.state.city}
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
              value={this.state.co}
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
              value={this.state.comments}
            />
          </Form>
          <Button
            style={{
              borderRadius: 15,
              backgroundColor: 'white',
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              height: 50,
            }}
            onPress={() => {
              this.state.deleting ? null : this.deleteUserAddress();
            }}>
            {this.state.deleting ? (
              <ActivityIndicator size="small" color={Theme.THEME_COLOR} />
            ) : (
              <Label style={{color: 'red'}}>Delete Address</Label>
            )}
          </Button>
        </View>
      </ScrollView>
    );
  }
  updateUserAddress(data) {
    var self = this;
    self.setState({submitting: true});
    axios
      .post(BaseURL.concat('api/ShoeCleaning/UpdateSpecificAddress'), data, {
        headers: Header,
      })
      .then((res) => {
        if (res.data.success) {
          self.props.actionAddress('address', res.data.data);
          self.props.navigation.goBack();
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
  deleteUserAddress(data) {
    var self = this;
    self.setState({deleting: true});

    axios
      .post(
        BaseURL.concat(
          'api/ShoeCleaning/DeleteUserAddress?UserId=' +
            self.state.UserId +
            '&UserAddressId=' +
            self.state.UserAddressId,
        ),
        data,
        {
          headers: Header,
        },
      )
      .then((res) => {
        console.warn(res);
        if (res.data.success) {
          self.props.actionAddress('address', res.data.data);
          self.props.navigation.goBack();
          Toast.show({text: 'Address Deleted'});
        }
      })
      .catch(function (error) {
        Toast.show({text: 'Unable to delete address'});

        self.setState({loading: false});
      })
      .finally(() => self.setState({deleting: false}));
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
export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
