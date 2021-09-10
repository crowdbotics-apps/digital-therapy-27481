import React, {Component} from 'react';
import RNKlarna, {NativeEvent} from 'react-native-klarna';

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
import strings from '../../Localization';

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
import HeaderWhite from '../../Component/HeaderWhite';

import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
  KlarnaCheckoutBaseURL,
  KlarnaPaymentHeader,
} from '../../Connection/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSelectedServices} from '../../Actions/index';
var item = {};
class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sameAddress: true,
      orderDetail: {},
      orderItems: [],
      deliveredQRCode: '',
      pickupQRCode: '',
      updating: false,
      submitting: false,
      //
      accepted: false,
      previousOrderDetails: undefined,
      snippet: '',
      loadError: false,
      orderId: '',
      orderSubmitting: false,
      loading: true, //should be true initially to show loader
      orderSubmitted: false,
      error: false,
    };
    item = this.props.navigation.getParam('item', {});
  }
  componentDidMount() {
    item = this.props.navigation.getParam('item', {});
    this.getOrderDetails(item.Data);
    this.updateNotificationStatus(item.NotificationId);
  }
  render() {
    let {snippet, previousOrderDetails} = this.state;
    const {loadError} = this.state;
    if (loadError) {
      snippet = 'error';
    }
    return this.state.accepted ? (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {this.state.error ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <Image
                source={require('../../assets/error.png')}
                style={{width: '50%', height: '40%'}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 22,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {strings.errorOrdering}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'space-evenly',

                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  width: '80%',
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {strings.errorLine}
              </Text>
              <Button
                style={{
                  backgroundColor: Theme.THEME_COLOR,
                  width: '50%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Back to Order
                </Text>
              </Button>
            </View>
          </View>
        ) : this.state.orderSubmitted ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <Image
                source={require('../../assets/orderplaced.png')}
                style={{width: '50%', height: '40%'}}
                resizeMode="contain"
              />
              <Text
                style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}>
                {strings.orderUpdated}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'space-evenly',

                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  width: '80%',
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {strings.orderUpdateCreatedLine}
              </Text>
              <Button
                style={{
                  backgroundColor: Theme.THEME_COLOR,
                  width: '50%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Home
                </Text>
              </Button>
            </View>
          </View>
        ) : this.state.orderSubmitting || this.state.loading ? (
          <ActivityIndicator size="large" color={Theme.THEME_COLOR} />
        ) : (
          <RNKlarna
            style={{flex: 1}}
            snippet={snippet}
            onComplete={this.onComplete}
            onTouchCancel={() => {
              this.setState({snippet: 'error'});
            }}
          />
        )}
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        {this.state.updating || this.state.submitting ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {this.state.updating ? <Text>Updating Order</Text> : null}
            <ActivityIndicator size="large" color={Theme.THEME_COLOR} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <HeaderWhite
              onPress={() => {
                this.props.navigation.goBack();
              }}
              showBack={true}
              text={item.NotificationTitle}
            />
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
                      desc={'' + this.state.orderDetail.OrderType}
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

                    paddingHorizontal: 20,
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
                            color: 'green',
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
                        style={{fontSize: 14, color: 'green'}}
                      />
                      <Text style={{fontSize: 14, color: 'green'}}>
                        {parseFloat(
                          (this.calutateTotal() * 0.19) / 100,
                        ).toFixed(2)}
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
                  <Text style={{color: 'green'}}>
                    Total : {this.calutateTotalWithTax() / 100}{' '}
                  </Text>
                  <Icon
                    type="MaterialIcons"
                    name="euro-symbol"
                    style={{fontSize: 14, color: 'green'}}
                  />
                </View>
              </Form>
              {this.state.orderDetail.OrderStatusId == 7 ? null : this.state
                  .orderDetail.OrderStatusId == 6 ? null : (
                <Form
                  style={[
                    {
                      height: 50,
                      justifyContent: 'space-evenly',
                      paddingHorizontal: 10,
                      marginVertical: 10,
                    },
                  ]}>
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
                    <TouchableOpacity
                      style={{
                        flex: 0.45,
                        alignItems: 'center',
                        backgroundColor: 'red',
                      }}
                      onPress={() => {
                        this.updateOrderDetails(item.Data, 6);
                      }}>
                      {this.state.updating ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text
                          style={{
                            flex: 1,
                            textAlignVertical: 'center',
                            color: 'white',
                          }}>
                          Reject
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 0.45,
                        alignItems: 'center',
                        backgroundColor: 'green',
                      }}
                      onPress={() => {
                        var order_lines = [];
                        this.state.orderItems.map((service) => {
                          var service = {
                            quantity: service.Quantity,
                            name: service.PackageName,
                            total_amount: service.Amount * 100,
                            unit_price: service.UnitPrice * 100,
                            type: 'physical',
                            reference: service.id,
                            quantity_unit: 'pcs',
                            total_discount_amount: 0,
                            total_tax_amount: 0,
                            tax_rate: 0,
                          };
                          order_lines.push(service);
                        });
                        order_lines.push({
                          type: 'sales_tax',
                          name: 'VAT',
                          quantity: 1,
                          unit_price: this.calutateTotal() * 0.19, //Sales tax 19%
                          total_amount: this.calutateTotal() * 0.19,
                          total_tax_amount: 0,
                          tax_rate: 0,
                        });
                        if (previousOrderDetails != undefined) {
                          this.createOrder({
                            purchase_country:
                              previousOrderDetails.purchase_country,
                            purchase_currency:
                              previousOrderDetails.purchase_currency,
                            locale: previousOrderDetails.locale,
                            order_amount:
                              this.calutateTotal() +
                              this.calutateTotal() * 0.19,
                            order_tax_amount: this.calutateTotal() * 0.19,
                            billing_address:
                              previousOrderDetails.billing_address,
                            shipping_address:
                              previousOrderDetails.shipping_address,
                            order_lines: order_lines,
                            options: {
                              date_of_birth_mandatory: false,
                            },
                            merchant_urls: {
                              terms: 'https://www.example.com/terms.html',
                              checkout: 'https://www.example.com/checkout.html',
                              confirmation: 'https://immerneu.de',
                              push: 'https://www.example.com/api/push',
                            },
                          });
                        }
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          textAlignVertical: 'center',
                          color: 'white',
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                  </Form>
                </Form>
              )}
            </Form>
          </View>
        )}
      </ScrollView>
    );
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
              style={{fontSize: 14, color: item.ItemState ? 'green' : 'gray'}}>
              {' '}
              {item.Amount}
            </Text>
          </Form>
        </View>
      </View>
    );
  }

  getOrderDetails(orderId) {
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
            orderDetail: res.data.data.customerOrders[0],
            orderItems: res.data.data.customerOrderItems,
          });
          self.getPreviousKlarnaOrder(
            res.data.data.customerOrders[0].PaymentToken,
          );
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
  updateOrderDetails(orderId, StatusId) {
    var self = this;
    self.setState({updating: true});

    axios({
      method: 'post',
      url: BaseURL.concat(
        `api/ShoeCleaning/UpdateManuallyOrderStatus?CustomerOrderId=${orderId}&StatusId=${StatusId}`,
      ),
      headers: Header,
      data: {},
    })
      .then((res) => {
        if (res.data.success) {
          if (res.data.success) {
            self.setState({
              orderSubmitted: true,
              orderSubmitting: false,
              error: false,
            });
            //  self.reset();
            //   const resetAction = StackActions.reset({
            //     index: 0,
            //     key: null,
            //     actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
            //   });
            //   this.props.navigation.dispatch(resetAction);
          }
          self.props.navigation.goBack();
          Toast.show({text: res.data.message, duration: 3000});
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({updating: false}));
  }
  updateNotificationStatus(notificationID) {
    var self = this;
    axios({
      method: 'post',
      url: BaseURL.concat(
        `api/ShoeCleaning/Notification/updateNotificationReadStatus?NotificationId=${notificationID}`,
      ),
      headers: Header,
      data: {},
    })
      .then((res) => {
        console.warn(res);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }
  calutateTotal() {
    var total = 0;
    this.state.orderItems.forEach((element) => {
      total += element.Amount;
    });
    return total.toFixed(2) * 100;
  }
  calutateTotalWithTax() {
    var total = 0;
    this.state.orderItems.forEach((element) => {
      total += element.Amount;
    });
    total += total * 0.19;
    return total.toFixed(2) * 100;
  }
  //klarna new order as an update

  updateOrderPaymentToken(orderId, paymentToken) {
    var self = this;
    self.setState({updating: true});

    axios({
      method: 'post',
      url: BaseURL.concat(
        `api/ShoeCleaning/CustomerOrder/updatePaymentToken?customerOrderId=${orderId}&paymentToken=${paymentToken}`,
      ),
      headers: Header,
      data: {},
    })
      .then((res) => {
        if (res.data.success) {
          if (res.data.success) {
            self.deletePreviousOrder(self.state.orderDetail.PaymentToken);
            self.updateOrderDetails(item.Data, 7);
            //  self.reset();
            //   const resetAction = StackActions.reset({
            //     index: 0,
            //     key: null,
            //     actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
            //   });
            //   this.props.navigation.dispatch(resetAction);
          }
          // self.props.navigation.goBack();
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({updating: false}));
  }

  getPreviousKlarnaOrder = async (orderid) => {
    var self = this;

    axios({
      method: 'get',
      url: KlarnaCheckoutBaseURL.concat('checkout/v3/orders/' + orderid),

      headers: KlarnaPaymentHeader,
      //   auth: {username: KlarnaUserName, password: KlarnaPassword},
    })
      .then((res) => {
        self.setState({previousOrderDetails: res.data});
      })
      .catch((err) => {
        Toast.show({text: err, duration: 2000});
      });
  };
  createOrder(orderDetails) {
    var self = this;
    self.setState({accepted: true});
    axios({
      method: 'post',
      url: KlarnaCheckoutBaseURL.concat('checkout/v3/orders'),
      data: orderDetails,
      headers: KlarnaPaymentHeader,
      //   auth: {username: KlarnaUserName, password: KlarnaPassword},
    })
      .then((res) => {
        self.setState({
          snippet: res.data.html_snippet,
          orderId: res.data.order_id,
        });
      })
      .catch((err) => {
        console.warn('' + err);
      })
      .finally(() => {
        self.setState({loading: false});
      });
  }
  onComplete = async (event: NativeEvent) => {
    const {signalType} = event;
    if (signalType === 'complete') {
      const {orderId} = this.props;
      /*
      1. Perform call to the backend
      2. Retrieve the order status and confirmation snippet.
      3. Update the Klarna component with the confirmation snippet once the order status is final
      4*. If an error occurs, set snippet to 'error' to dismiss loading screen
      */

      try {
        // await this.setState({orderSubmitting: true});

        const result = await this.getConfirmationSnippet(this.state.orderId);
        const {newSnippet, orderStatus, loadError} = result;
        if (orderStatus) {
          this.setState({snippet: newSnippet});
        }
      } catch (error) {
        this.setState({
          loadError: true,
        });
      }
    } else {
    }
  };
  getConfirmationSnippet = async (orderid) => {
    var self = this;

    axios({
      method: 'get',
      url: KlarnaCheckoutBaseURL.concat('checkout/v3/orders/' + orderid),

      headers: KlarnaPaymentHeader,
      //   auth: {username: KlarnaUserName, password: KlarnaPassword},
    })
      .then((res) => {
        if (res.data.status == 'checkout_complete') {
          //payment successful and updating database
          self.updateOrderPaymentToken(item.Data, orderid);
        } else {
          self.setState({
            orderSubmitted: false,
            orderSubmitting: false,
            error: true,
            snippet: 'error',
          });
        }
        self.setState({snippet: res.data.html_snippet});
      })
      .catch((err) => {
        console.warn(err);
        self.setState({
          orderSubmitted: false,
          orderSubmitting: false,
          error: true,
          snippet: 'error',
        });
      })
      .finally(() => {
        self.setState({loading: false});
      });
  };
  deletePreviousOrder(order_id) {
    var self = this;
    self.setState({loading: true});
    axios({
      method: 'post',
      url: KlarnaCheckoutBaseURL.concat(
        `ordermanagement/v1/orders/${order_id}/cancel`,
      ),
      data: {order_id: order_id},
      headers: KlarnaPaymentHeader,
      //   auth: {username: KlarnaUserName, password: KlarnaPassword},
    })
      .then((res) => {
        console.warn(res);
        self.setState({
          orderSubmitted: true,
          orderSubmitting: false,
          error: false,
        });
      })
      .catch((err) => {
        console.warn('' + err);
      })
      .finally(() => {
        self.setState({loading: false});
      });
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrder);
