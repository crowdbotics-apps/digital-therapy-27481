import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
// import Button from '../../src/component/Button';
import Counter from '../../Component/Counter';
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
import Theme from '../../Styles/Theme';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../Connection/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  actionOrder,
  actionSignup,
  actionSelectedServices,
} from '../../Actions/index';
import Select from '../../Component/SearchableDropdown';
import moment from 'moment';
import ProfileStatus from '../../Component/ProfileStatus';
class ServiceSelectionNormal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      Paragraph: [
        {title: 'Not necessary', price: 0},
        {title: 'Rubber', price: 30},
        {title: 'Leather', price: 50},
      ],
      Sole: [
        {title: 'Not necessary', price: 0},
        {title: 'Rubber', price: 10},
        {title: 'Leather', price: 20},
      ],
      services: [
        {
          title: 'KOMFORT',
          desc:
            ' \u2022 Exterior cleaning including sole\n \u2022 Professional material care \n \u2022 Shoelace cleaning (without removing it from the shoe)  ',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 0,
          price: 100,
          selectedParagraph: '',
          selectedSole: '',
          Amount: 30,
        },
        {
          title: 'PREMIUM',
          desc:
            ' \n \u2022 Exterior cleaning including soles\n \u2022 Professional material care \n \u2022 Laces cleaning (removed from the shoe) \n \u2022 Interior cleaning \n \u2022 Re-dyeing work \n \u2022 impregnation',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 0,
          price: 150,
          selectedParagraph: '',
          selectedSole: '',
          Amount: 30,
        },
        {
          title: 'LUXUS',
          desc:
            ' \u2022 Particularly suitable for fine leather, silk shoes and shoes with decorations \n \u2022 Exterior cleaning including soles \n \u2022 Professional material care \n \u2022 Additional care taking into account the material requirements \n \u2022 Laces cleaning (removed from the shoe) \n \u2022 Interior cleaning \n \u2022 Re-dyeing work \n \u2022 impregnation',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 0,
          price: 200,
          selectedParagraph: '',
          selectedSole: '',
          Amount: 30,
        },
      ],
      defaultServices: [
        {
          title: 'KOMFORT',
          desc:
            ' \u2022 Exterior cleaning including sole\n \u2022 Professional material care \n \u2022 Shoelace cleaning (without removing it from the shoe)  ',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 0,
          price: 100,
          selectedParagraph: '',
          selectedSole: '',
        },
        {
          title: 'PREMIUM',
          desc:
            '\u2022 Exterior cleaning including soles\n \u2022 Professional material care \n \u2022 Laces cleaning (removed from the shoe) \n \u2022 Interior cleaning \n \u2022 Re-dyeing work \n \u2022 impregnation',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 1,
          price: 150,
          selectedParagraph: '',
          selectedSole: '',
        },
        {
          title: 'LUXUS',
          desc:
            ' \u2022 Particularly suitable for fine leather, silk shoes and shoes with decorations \n \u2022 Exterior cleaning including soles \n \u2022 Professional material care \n \u2022 Additional care taking into account the material requirements \n \u2022 Laces cleaning (removed from the shoe) \n \u2022 Interior cleaning \n \u2022 Re-dyeing work \n \u2022 impregnation',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 1,
          price: 200,
          selectedParagraph: '',
          selectedSole: '',
        },
      ],
      optimizedPackages: [],
    };
  }
  componentDidMount() {
    this.reset();
    this.getPackages();
    this.props.actionOrder('pickupDate', moment().add('1', 'day'));
  }
  reset() {
    this.props.actionSignup('selectedServices', []);
    this.props.actionSignup('pickupDate', '');
    this.props.actionSignup('pickupTime', '');
    // this.props.actionSignup('pickupAddress', '');
    this.props.actionSignup('returnToSame', true);
    this.props.actionSignup('returnDate', '');
    this.props.actionSignup('returnTime', '');
    this.props.actionOrder('selectedPickupTimeIndex', '-1');
    this.props.actionOrder('selectedDropoffTimeIndex', '-1');
    this.props.actionOrder('SelectedOrderType', '');
    this.props.actionOrder('selectedOrderTypeIndex', '-1');
    // this.props.actionSignup('dropoffAddress', '');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ProfileStatus navigation={this.props.navigation} />

        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
          {this.state.data === null ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'gray', fontSize: 12}}>
                Packages are not available currently, Please visit again.
              </Text>
            </View>
          ) : (
            <View style={{flex: 0.8, justifyContent: 'space-evenly'}}>
              <Form style={Styles.formStyle}>
                <Text
                  style={[
                    MainStyle.textStyleBlackBold,
                    {width: '100%', textAlign: 'left'},
                  ]}>
                  What Package would you like to have?
                </Text>
              </Form>
              <Form
                style={{
                  padding: 10,

                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 20,
                  flex: 0.7,
                }}>
                <FlatList
                  keyExtractor={(item) => item.PackageId}
                  showsVerticalScrollIndicator={false}
                  data={this.state.services}
                  renderItem={this.renderItem.bind(this)}
                  ItemSeparatorComponent={this.itemSeperatorComponent}
                  extraData={this.props}
                />
              </Form>
              <Form>
                <Text
                  style={[
                    {
                      width: '85%',
                      fontSize: 12,
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: 'gray',
                    },
                  ]}>
                  Visit our pricing page and scroll down to see which services
                  are included in each package
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://www.immerneu.de/');
                  }}>
                  <Text
                    style={[
                      {
                        width: '85%',
                        marginTop: 5,
                        fontSize: 14,
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: Theme.THEME_COLOR,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    Our Pricing
                  </Text>
                </TouchableOpacity>
              </Form>
            </View>
          )}
        </ScrollView>
        {this.props.MainReducer.selectedServices.length > 0 ? (
          <Animated.View>
            <Form>
              <Button
                style={{
                  backgroundColor: Theme.THEME_COLOR,
                  width: '80%',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
                onPress={() => {
                  this.props.navigation.navigate('OrderType');
                }}>
                <Text style={{color: 'white', fontSize: 12, flex: 1}}>
                  submit
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                  }}>
                  <Image
                    source={require('../../assets/shoes.png')}
                    style={{width: 25, height: 25, tintColor: 'white'}}
                    tintColor="white"
                    resizeMode="contain"
                  />
                  <Icon
                    type="MaterialIcons"
                    name="clear"
                    style={{fontSize: 10, color: 'white', marginLeft: 3}}
                  />
                  {/* <Text
                  style={{
                    color: 'white',
                    fontSize: 8,
                    fontWeight: 'bold',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                  }}></Text> */}
                  <Label
                    style={{
                      color: '#ffffff',
                      textAlign: 'left',
                      height: '100%',
                      textAlignVertical: 'center',
                      fontSize: 12,
                      marginLeft: -9,
                    }}>
                    {this.props.MainReducer.selectedServices.length}
                  </Label>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon type="MaterialIcons" name="euro-symbol"></Icon>
                  <Text style={{color: 'white', marginLeft: -30}}>
                    {this.calutateTotal()}
                  </Text>
                </View>
              </Button>
            </Form>
          </Animated.View>
        ) : null}
      </View>
    );
  }
  calutateTotal() {
    var total = 0.0;
    this.props.MainReducer.selectedServices.forEach((element) => {
      total += element.Price;
    });
    return total.toFixed(2);
  }
  onParagraphValueChange(value, index) {
    var packages = this.state.services;
    packages[index].selectedParagraph = value;
    this.setState({
      //   selected: value,
      services: packages,
    });
  }
  onSoleValueChange(value, index) {
    var packages = this.state.services;
    packages[index].selectedSole = value;
    this.setState({
      //   selected: value,
      services: packages,
    });
  }

  itemSeperatorComponent() {
    return (
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          height: 15,

          // backgroundColor: '#dcdcdc',
        }}
      />
    );
  }
  onPackageSelect = (item, index) => {
    var packages = this.state.services;
    packages[index].Selected = !packages[index].Selected;
    this.setState({services: packages});
  };
  renderItem({index, item}) {
    var self = this;
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              // width: '100%',
              flex: 1,
              justifyContent: 'space-evenly',
              height: 50,
              backgroundColor: 'white',
              elevation: 0,
              borderRadius: 5,
              alignItems: 'center',
              padding: 5,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                var services = this.state.services;
                services[index].Quantity = item.Quantity + 1;
                this.setState({
                  //   selected: value,
                  services,
                });
                this.addItem(item, index);
              }}>
              <Form
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/sneakers.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    {
                      textAlign: 'left',

                      marginLeft: 15,
                      marginVertical: 0,
                    },
                  ]}>
                  {item.PackageTitle}
                </Text>
                {item.Quantity > 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-evenly',

                      backgroundColor: Theme.THEME_COLOR,
                      paddingVertical: 2,
                      paddingHorizontal: 4,
                      borderRadius: 30,
                      marginLeft: 15,
                    }}>
                    <Icon
                      type="MaterialIcons"
                      style={{
                        fontSize: 14,
                        color: 'white',
                        textAlignVertical: 'bottom',
                      }}
                      name="euro-symbol"></Icon>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      {item.Price}
                    </Text>
                  </View>
                ) : (
                  <View />
                  // <Image
                  //   source={require('../../assets/sneakers.png')}
                  //   style={{width: 20, height: 20}}
                  //   resizeMode="contain"
                  // />
                )}
              </Form>
            </TouchableOpacity>

            {item.Quantity > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.removeItem(item, index);
                    if (this.state.services[index].Quantity >= 1) {
                      var services = this.state.services;
                      services[index].Quantity = item.Quantity - 1;
                      this.setState({
                        //   selected: value,
                        services,
                      });
                    }
                  }}
                  style={[Styles.buttonStyle]}>
                  <Icon
                    name="remove"
                    style={{color: 'gray', fontSize: 14}}
                    type="MaterialIcons"
                  />
                </TouchableOpacity>

                <View
                  style={{
                    // backgroundColor: Theme.THEME_COLOR,
                    // width: 20,
                    // height: 20,
                    // borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      fontWeight: 'bold',
                      textAlignVertical: 'center',
                      textAlign: 'center',
                      marginHorizontal: 10,
                    }}>
                    {item.Quantity}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    var services = this.state.services;
                    services[index].Quantity = item.Quantity + 1;
                    this.setState({
                      //   selected: value,
                      services,
                    });
                    this.addItem(item, index);
                  }}
                  style={[Styles.buttonStyle]}>
                  <Icon
                    name="add"
                    style={{color: 'gray', fontSize: 14}}
                    type="MaterialIcons"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 10,
                  }}>
                  <Icon
                    type="MaterialIcons"
                    style={{fontSize: 12}}
                    name="euro-symbol"></Icon>
                  <Text style={{color: 'black', fontSize: 12}}>
                    {item.Price}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    var services = this.state.services;
                    services[index].Quantity = item.Quantity + 1;
                    this.setState({
                      //   selected: value,
                      services,
                    });
                    this.addItem(item, index);
                  }}
                  style={[Styles.buttonStyle]}>
                  <Icon
                    name="add"
                    style={{color: 'gray', fontSize: 14}}
                    type="MaterialIcons"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
  removeItem(item, index) {
    var selectedServices = [];
    selectedServices = this.props.MainReducer.selectedServices;
    selectedServices.forEach((newitem, index) => {
      if (JSON.stringify(item) === JSON.stringify(newitem)) {
        selectedServices.splice(index, 1);
      }
    });
    this.props.actionSelectedServices('selectedServices', selectedServices);
  }

  addItem(item, index) {
    var item = item;
    var cart = this.state.optimizedPackages;
    // for (var i = 0; i < item.quantity; i++) {
    //   cart.push(item);
    // }
    cart.push(item);
    console.warn(cart);
    this.props.actionSelectedServices('selectedServices', cart);
    this.resetServices(index);
  }
  resetServices(index) {
    const services = this.state.services;
    const defaultServices = this.state.defaultServices;
    defaultServices[index] = services[index];

    services[index] = Object.assign({}, defaultServices[index]);

    this.setState({defaultServices});
  }
  getPackages() {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat('api/ShoeCleaning/GetPackages'),
      headers: Header,
    })
      .then((res) => {
        if (res.status == 200) {
          self.setState({
            defaultServices: res.data.data,
            services: res.data.data,
          });
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
  buttonStyle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
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
      actionSelectedServices,
      actionSignup,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceSelectionNormal);
