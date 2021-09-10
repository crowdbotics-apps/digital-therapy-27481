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
import {actionSelectedServices} from '../../Actions/index';
import Select from '../../Component/SearchableDropdown';
class ServiceSelection extends Component {
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
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
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
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderColor: '#dcdcdc',
                padding: 10,

                width: '90%',
                alignSelf: 'center',
                marginBottom: 20,
                flex: 0.7,
              }}>
              <FlatList
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
                Don't worry about a thing! just hand in your shoes and
                quantities and categorization will be organized by us?
              </Text>
            </Form>
          </View>
        </ScrollView>
        {this.props.MainReducer.selectedServices.length > 0 ? (
          <View>
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
                  this.props.navigation.navigate('SoleSelection');
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
                    style={{width: 25, height: 25}}
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
          </View>
        ) : null}
      </View>
    );
  }
  calutateTotal() {
    var total = 0;
    this.props.MainReducer.selectedServices.forEach((element) => {
      total += element.price;
    });
    return total;
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
          height: 20,

          // backgroundColor: '#dcdcdc',
        }}
      />
    );
  }
  onPackageSelect = (item, index) => {
    var packages = this.state.services;
    packages[index].selected = !packages[index].selected;
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
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                self.onPackageSelect(item, index);
              }}>
              <Form
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[MainStyle.textStyleBlackBold, {textAlign: 'left'}]}>
                  {item.title}
                </Text>
              </Form>
              <Form>
                <Form style={{width: '100%'}}>
                  {/* <Text style={{fontSize: 12, color: 'gray'}}>{item.desc}</Text> */}
                </Form>
              </Form>
            </TouchableOpacity>
            <Form
              style={{
                flex: 0.4,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={item.icon}
                style={{width: 50, height: 50}}
                resizeMode="contain"
              />
            </Form>
          </View>
          <Form
            style={{
              marginVertical: 20,
            }}>
            <Form style={{flex: 1}}>
              {/* <Select
                data={this.state.services}
                width={250}
                placeholder="Neue Absätze"
                onSelect={(key, value) => {}}
                search={false}
                style={{
                  color: 'black',
                  height: 50,
                  marginVertical: 0,
                  paddingHorizontal: 5,
                }}
              /> */}
              <Text style={{color: 'gray', fontSize: 14, marginVertical: 10}}>
                Neue Absätze
              </Text>
              <View style={{borderWidth: 0.5, borderColor: 'gray'}}>
                <Picker
                  mode="dropdown"
                  style={{width: '100%'}}
                  selectedValue={this.state.services[index].selectedParagraph}
                  onValueChange={(value) =>
                    this.onParagraphValueChange(value, index)
                  }>
                  {this.state.Paragraph.map((item) => (
                    <Picker.Item label={item.title} value={item.title} />
                  ))}
                </Picker>
              </View>
              <Text style={{color: 'gray', fontSize: 14, marginVertical: 10}}>
                Neue Sohlen
              </Text>
              <View style={{borderWidth: 0.5, borderColor: 'gray'}}>
                <Picker
                  mode="dropdown"
                  style={{width: '100%'}}
                  selectedValue={this.state.services[index].selectedSole}
                  onValueChange={(value) =>
                    this.onSoleValueChange(value, index)
                  }>
                  {this.state.Sole.map((item) => (
                    <Picker.Item label={item.title} value={item.title} />
                  ))}
                </Picker>
              </View>
            </Form>

            <Form style={{flex: 1, justifyContent: 'center', padding: 10}}>
              {item.quantity > 0 ? (
                <Counter
                  onRemovePress={() => {
                    this.removeItem(item, index);
                    if (this.state.services[index].quantity >= 1) {
                      var services = this.state.services;
                      services[index].quantity = item.quantity - 1;
                      this.setState({
                        //   selected: value,
                        services,
                      });
                    }
                  }}
                  onAddPress={() => {
                    var services = this.state.services;
                    services[index].quantity = item.quantity + 1;
                    this.setState({
                      //   selected: value,
                      services,
                    });
                    this.addItem(item, index);
                  }}
                  text={item.quantity}
                />
              ) : (
                <Button
                  onPress={() => {
                    var services = this.state.services;
                    services[index].quantity = item.quantity + 1;
                    this.setState({
                      //   selected: value,
                      services,
                    });
                    this.addItem(item, index);
                  }}
                  style={{
                    width: '50%',
                    height: '100%',
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    backgroundColor: Theme.THEME_COLOR,
                  }}>
                  <Label style={{color: 'white'}}>Add</Label>
                </Button>
              )}
            </Form>
          </Form>
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
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ServiceSelection);
