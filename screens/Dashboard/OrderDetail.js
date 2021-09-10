import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Animated,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
import axios from 'axios';
import {StackActions, NavigationActions} from 'react-navigation';
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
import OrderDetail from '../../Component/OrderDetail';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../Connection/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSelectedServices} from '../../Actions/index';
class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sameAddress: true,
      orderDetail: {},
      orderItems: [],
      deliveredQRCode: '',
      pickupQRCode: '',
    };
  }
  componentDidMount() {
    var item = this.props.navigation.getParam('item', {});
    this.getOrderItems(item.CustomerOrderId);
    this.setState({orderDetail: item});
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
              padding: 15,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 2,
              height: 100,
            }}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '100%', textAlign: 'left'},
              ]}>
              ORDER # {this.state.orderDetail.RefNo}
            </Text>
          </Form>
          {this.state.pickupQRCode != '' && this.state.deliveredQRCode == '' ? (
            <View>
              <Text
                style={[
                  MainStyle.textStyleBlackBold,
                  {
                    width: '100%',
                    textAlign: 'left',
                    marginLeft: 20,
                    fontWeight: '100',
                  },
                ]}>
                Scan this QR code - Pick up
              </Text>

              <Image
                source={{
                  uri: this.state.pickupQRCode,
                }}
                resizeMode="contain"
                style={{width: 150, height: 150, alignSelf: 'center'}}
              />
            </View>
          ) : (
            <View />
          )}
          {this.state.deliveredQRCode != '' &&
          this.state.orderDetail.OrderStatusId != 1 &&
          this.state.orderDetail.OrderStatusId != 5 ? ( //todeliver
            <View>
              <Text
                style={[
                  MainStyle.textStyleBlackBold,
                  {
                    width: '100%',
                    textAlign: 'left',
                    marginLeft: 20,
                    fontWeight: '100',
                  },
                ]}>
                Scan this QR code - Delivery{' '}
              </Text>

              <Image
                source={{
                  uri: this.state.deliveredQRCode,
                }}
                resizeMode="contain"
                style={{width: 150, height: 150, alignSelf: 'center'}}
              />
            </View>
          ) : (
            <View />
          )}
          <Form
            style={{
              flex: 0.8,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
            }}>
            {this.state.orderDetail.OrderTypeId == 2 ? (
              <Form style={{flex: 1}}>
                <Form style={{}}>
                  <OrderDetail
                    headerText="Order Type"
                    desc={'Drop Off'}
                    descTwo={''}></OrderDetail>
                </Form>
                <OrderDetail
                  headerText="Payment Type"
                  desc={
                    this.state.orderDetail.PaymentMethodId == 1
                      ? 'Cash'
                      : 'Card'
                  }
                  descTwo=""></OrderDetail>
              </Form>
            ) : (
              <Form style={{flex: 1}}>
                <Form style={{flex: 1}}>
                  <OrderDetail
                    headerText="Pick up time"
                    desc={this.state.orderDetail.PickTime}
                    descTwo=""></OrderDetail>
                  <OrderDetail
                    headerText="Pick up address"
                    desc={this.state.orderDetail.PickUpAddress}
                    descTwo=""></OrderDetail>
                </Form>
                <Form style={{flex: 1}}>
                  <OrderDetail
                    headerText="Return time"
                    desc={this.state.orderDetail.DropTime}
                    descTwo=""></OrderDetail>
                  <OrderDetail
                    headerText="Return address"
                    desc={this.state.orderDetail.DropAddress}
                    descTwo=""></OrderDetail>
                </Form>
                <OrderDetail
                  headerText="Payment Type"
                  desc={
                    this.state.orderDetail.PaymentMethodId == 1
                      ? 'Cash'
                      : 'Card'
                  }
                  descTwo=""></OrderDetail>
              </Form>
            )}

            <Form style={{flex: 1, padding: 10}}>
              <Label>Order Details</Label>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.orderItems}
                renderItem={this.renderItem.bind(this)}
                extraData={this.state.orderItems}
                ItemSeparatorComponent={this.itemSeperatorComponent}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  flex: 1,

                  paddingHorizontal: 15,
                  paddingVertical: 5,
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
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  <Form style={{flex: 0.8}}>
                    <Text
                      style={[
                        MainStyle.textStyleBlackBold,
                        {
                          textAlign: 'left',
                          fontSize: 12,
                          fontWeight: '100',
                          color: 'gray',
                          width: '100%',
                        },
                      ]}>
                      VAT
                    </Text>
                  </Form>
                  <Form
                    style={{
                      flex: 0.2,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="MaterialIcons"
                      name="euro-symbol"
                      style={{fontSize: 14, color: 'gray'}}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                      }}>
                      {parseFloat(this.calutateTotal() * 0.19).toFixed(2)}
                    </Text>
                  </Form>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Text>Total : {this.calutateTotalWithTax()} </Text>
                <Icon
                  type="MaterialIcons"
                  name="euro-symbol"
                  style={{fontSize: 14, color: 'gray'}}
                />
              </View>
            </Form>
            {/* <Form
              style={[
                {
                  height: 50,
                  justifyContent: 'space-evenly',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                },
              ]}>
              <Text style={{fontSize: 10, color: 'gray'}}>
                Do you want to redeem voucher for discount?
              </Text>
              <Form
                style={[
                  {
                    height: 50,
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginVertical: 10,
                    flexDirection: 'row',
                  },
                ]}>
                <Input
                  placeholder="Voucher code"
                  placeholderTextColor="#dcdcdc"
                  style={[Styles.inputStyle, {flex: 0.8, fontSize: 14}]}
                />
                <TouchableOpacity
                  style={{
                    flex: 0.2,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      textAlignVertical: 'center',
                      color: Theme.THEME_COLOR,
                    }}>
                    Redeem
                  </Text>
                </TouchableOpacity>
              </Form>
            </Form>
           */}
          </Form>
        </View>
      </ScrollView>
    );
  }
  calutateTotal() {
    var total = 0;
    this.state.orderItems.forEach((element) => {
      if (!element.ItemState) total += element.Amount;
    });

    return total.toFixed(2);
  }
  calutateTotalWithTax() {
    var total = 0;
    this.state.orderItems.forEach((element) => {
      if (!element.ItemState) total += element.Amount;
    });
    total += total * 0.19;
    return total.toFixed(2);
  }
  itemSeperatorComponent() {
    return (
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 1,
          backgroundColor: '#dcdcdc',
        }}
      />
    );
  }

  renderItem({index, item}) {
    if (!item.ItemState) {
      return (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flex: 1,

            paddingHorizontal: 15,
            paddingVertical: 5,
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
              paddingVertical: 5,
              alignItems: 'center',
            }}>
            <Form style={{flex: 0.8}}>
              <Text
                style={[
                  MainStyle.textStyleBlackBold,
                  {
                    textAlign: 'left',
                    fontSize: 12,
                    fontWeight: '100',
                    color: item.ItemState ? 'green' : 'gray',
                    width: '100%',
                  },
                ]}>
                {item.ItemState ? '+' : ''} {item.PackageName}
              </Text>
            </Form>
            <Form
              style={{
                flex: 0.2,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Icon
                type="MaterialIcons"
                name="euro-symbol"
                style={{fontSize: 14, color: item.ItemState ? 'green' : 'gray'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: item.ItemState ? 'green' : 'gray',
                }}>
                {' '}
                {item.Amount}
              </Text>
            </Form>
          </View>
        </View>
      );
    }
    return <View />;
  }

  getOrderItems(orderId) {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat(
        'api/ShoeCleaning/GetOrderDetails?CustomerOrderId=' + orderId,
      ),
      headers: Header,
    })
      .then((res) => {
        if (res.data.success) {
          self.setState({
            orderItems: res.data.data.customerOrderItems,
            pickupQRCode: res.data.pickupQRCode,
            deliveredQRCode: res.data.deliveredQRCode,
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
      actionSelectedServices,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
