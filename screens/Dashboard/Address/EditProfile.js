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
import {actionSignup} from '../../../Actions/index';
class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      loading: false,
      submitting: false,
    };
  }
  componentDidMount() {
    this.setState({
      email: this.props.MainReducer.user.Email,
      phone: this.props.MainReducer.user.PhoneNumber,
    });
  }
  render() {
    return (
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
            <Icon type="MaterialIcons" name="arrow-back" />
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
              if (!this.state.submitting) {
                if (this.state.email != '' && this.state.phone != '') {
                  var user = {
                    UserId: this.props.MainReducer.user.UserId,
                    Name: this.props.MainReducer.user.Name,
                    SurName: '',
                    Email: this.state.email,
                    PhoneNumber: this.state.phone,
                  };
                  this.editProfile(user);
                } else {
                  Toast.show({
                    text: 'fill all fields',
                    buttonText: 'Okay',
                    duration: 3000,
                  });
                }
              }
            }}>
            {this.state.submitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Label style={{color: 'white'}}>SAVE</Label>
            )}
          </Button>
        </Form>
        <Form
          style={[
            Styles.formStyle,
            {justifyContent: 'space-evenly', paddingHorizontal: 10},
          ]}>
          <Input
            disabled
            placeholder="Name"
            placeholderTextColor="#dcdcdc"
            style={[Styles.inputStyle, {color: '#acacac', flex: 1}]}
            defaultValue={this.props.MainReducer.user.Name}
          />
        </Form>

        <Form
          style={[
            Styles.formStyle,
            {justifyContent: 'space-evenly', paddingHorizontal: 10},
          ]}>
          <Input
            placeholder="Email Address*"
            placeholderTextColor="#dcdcdc"
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={this.props.MainReducer.user.ProfileStatus}
            style={[
              Styles.inputStyle,
              {
                flex: 1,
                color: this.props.MainReducer.user.ProfileStatus
                  ? '#acacac'
                  : 'black',
              },
            ]}
            defaultValue={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
          />
        </Form>
        <Form
          style={[
            Styles.formStyle,
            {justifyContent: 'space-evenly', paddingHorizontal: 10},
          ]}>
          <Input
            placeholder="Phone Number*"
            placeholderTextColor="#dcdcdc"
            keyboardType="phone-pad"
            style={[Styles.inputStyle, {flex: 1}]}
            defaultValue={this.state.phone}
            onChangeText={(text) => this.setState({phone: text})}
          />
        </Form>
        {/* <Form style={Styles.formStyle}>
          <Input
            placeholderTextColor="#dcdcdc"
            placeholder="Street,House No*"
            style={Styles.inputStyle}
            defaultValue={this.props.MainReducer.user.Street}
          />
        </Form>
        <Form style={Styles.formStyle}>
          <Input
            placeholderTextColor="#dcdcdc"
            placeholder="Address Line 2"
            style={Styles.inputStyle}
            defaultValue={this.props.MainReducer.user.Address}
          />
        </Form>
        <Form
          style={[
            Styles.formStyle,
            {justifyContent: 'space-evenly', paddingHorizontal: 10},
          ]}>
          <Input
            placeholder="Postcode*"
            placeholderTextColor="#dcdcdc"
            style={[Styles.inputStyle, {flex: 1}]}
            defaultValue={this.props.MainReducer.user.PostCode}
          />
        </Form> */}

        {/* <Form style={Styles.formStyle}>
          <Input
          disabled
            placeholderTextColor="#dcdcdc"
            value="Engineertalha@yahoo.com"
            style={[
              Styles.inputStyle,
              {flex: 1, backgroundColor: '#dcdcdc', color: '#acacac'},
            ]}
          />
        </Form>
     */}
      </View>
    );
  }
  editProfile(data) {
    var self = this;
    self.setState({submitting: true});
    axios
      .post(BaseURL.concat('api/ShoeCleaning/UpdateProfile'), data, {
        headers: Header,
      })
      .then((res) => {
        if (res.data.success) {
          self.props.actionSignup('user', res.data.data[0]);
          self.props.navigation.goBack();
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
      actionSignup,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
