import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
// import Button from '../../src/component/Button';
import axios from 'axios';
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
  Radio,
  Picker,
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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSelectedServices} from '../../Actions/index';
class SoleSelection extends Component {
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
      packages: [
        {
          title: 'KOMFORT',
          desc:
            ' \u2022 Exterior cleaning including sole\n \u2022 Professional material care \n \u2022 Shoelace cleaning (without removing it from the shoe)  ',
          icon: require('../../assets/sneakers.png'),
          selected: true,
          quantity: 3,
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
          quantity: 2,
          price: 100,
          selectedParagraph: '',
          selectedSole: '',
        },
        {
          title: 'LUXUS',
          desc:
            ' \u2022 Particularly suitable for fine leather, silk shoes and shoes with decorations \n \u2022 Exterior cleaning including soles \n \u2022 Professional material care \n \u2022 Additional care taking into account the material requirements \n \u2022 Laces cleaning (removed from the shoe) \n \u2022 Interior cleaning \n \u2022 Re-dyeing work \n \u2022 impregnation',
          icon: require('../../assets/sneakers.png'),
          selected: false,
          quantity: 2,
          price: 100,
          selectedParagraph: '',
          selectedSole: '',
        },
      ],
      optimizedPackages: [],
    };
  }
  componentDidMount() {
    console.warn(this.props.MainReducer.selectedServices);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
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
            data={this.props.MainReducer.selectedServices}
            renderItem={this.renderItem.bind(this)}
            ItemSeparatorComponent={this.itemSeperatorComponent}
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
            Don't worry about a thing! just hand in your shoes and quantities
            and categorization will be organized by us?
          </Text>
        </Form>
        <Form>
          <Button
            style={{
              backgroundColor: Theme.THEME_COLOR,
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('PickupTime');
            }}>
            <Text style={{color: 'white'}}>Next</Text>
          </Button>
        </Form>
      </View>
    );
  }
  itemSeperatorComponent() {
    return (
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          height: 1,
          backgroundColor: '#dcdcdc',
        }}
      />
    );
  }

  renderItem({index, item}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          alignItems: 'center',
        }}
        onPress={() => {
          //   self.onPackageSelect(item, index);
        }}>
        <View
          style={{
            flexDirection: 'row',
            // width: '100%',
            flex: 1,
            paddingVertical: 10,
          }}>
          <Form style={{flex: 0.8}}>
            <Text style={[MainStyle.textStyleBlackBold, {textAlign: 'left'}]}>
              {item.title}
            </Text>
            <Form style={{width: '100%', flexDirection: 'row'}}>
              <Text>{item.selectedParagraph}</Text>
              {item.selectedSole != '' ? <Text> / </Text> : null}
              <Text>{item.selectedSole}</Text>
            </Form>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon
                type="MaterialIcons"
                name="euro-symbol"
                style={{fontSize: 14}}
              />
              <Text style={{fontSize: 14}}> {item.price}</Text>
            </View>
          </Form>
          <Form
            style={{
              flex: 0.2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {/* <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Icon
                type="MaterialIcons"
                name="euro-symbol"
                style={{fontSize: 14}}
              />
              <Text style={{fontSize: 14}}> {item.price}</Text>
            </View> */}
            <TouchableOpacity style={{flex: 1}}>
              <Icon
                type="MaterialIcons"
                style={{color: 'red'}}
                name="remove-circle"
              />
            </TouchableOpacity>
          </Form>
        </View>
      </View>
    );

    // return (
    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       width: '100%',
    //       flex: 1,
    //       padding: 10,
    //     }}
    //     onPress={() => {
    //       //   self.onPackageSelect(item, index);
    //     }}>
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         // width: '100%',
    //         flex: 1,
    //         paddingVertical: 10,
    //       }}>
    //       <Form style={{width: '70%'}}>
    //         <Text style={[MainStyle.textStyleBlackBold, {textAlign: 'left'}]}>
    //           {item.title}
    //         </Text>
    //         <Picker
    //           note
    //           mode="dropdown"
    //           style={{width: 120}}
    //           selectedValue={this.state.selected}
    //           onValueChange={this.onValueChange.bind(this)}>
    //           <Picker.Item label="Wallet" value="key0" />
    //           <Picker.Item label="ATM Card" value="key1" />
    //           <Picker.Item label="Debit Card" value="key2" />
    //           <Picker.Item label="Credit Card" value="key3" />
    //           <Picker.Item label="Net Banking" value="key4" />
    //         </Picker>
    //       </Form>
    //       <Form
    //         style={{
    //           width: '30%',
    //           height: '100%',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         <Image
    //           source={item.icon}
    //           style={{width: 50, height: 50}}
    //           resizeMode="contain"
    //         />
    //       </Form>
    //     </View>
    //   </View>
    // );
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
export default connect(mapStateToProps, mapDispatchToProps)(SoleSelection);
