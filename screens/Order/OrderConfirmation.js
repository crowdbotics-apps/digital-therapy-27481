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
  KlarnaCheckoutBaseURL,
  KlarnaPaymentHeader,
} from '../../Connection/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSelectedServices, actionSignup} from '../../Actions/index';
import moment from 'moment';
import ProfileStatus from '../../Component/ProfileStatus';

class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      sameAddress: true,
      submitting: false,
    };
  }

  render() {
    var item = this.props.MainReducer;
    item = item.pickupAddress;
    var pickupAddress =
      '' +
      item.Name +
      (item.CO != '' ? ' c/o ' + item.CO + ', ' : ', ') +
      item.Street +
      ', ' +
      (item.Address === '' ? '' + item.PostCode + '' : '' + item.Address) +
      (item.Address === '' ? '' : ', ' + item.PostCode) +
      ', ' +
      item.City +
      '.';

    item = this.props.MainReducer.dropoffAddress;
    var dropoffAddress =
      '' +
      item.Name +
      (item.CO != '' ? ' c/o ' + item.CO + ', ' : ', ') +
      item.Street +
      ', ' +
      (item.Address === '' ? '' + item.PostCode + '' : '' + item.Address) +
      (item.Address === '' ? '' : ', ' + item.PostCode) +
      ', ' +
      item.City +
      '.';
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <ProfileStatus navigation={this.props.navigation} />
          <Form
            style={{
              padding: 15,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: 'white',
              elevation: 2,
              height: 200,
            }}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '100%', textAlign: 'left'},
              ]}>
              ORDER CONFIRMATION
            </Text>

            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {
                  width: '100%',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                },
              ]}>
              Please, make sure that all information is correct
            </Text>
          </Form>

          <Form
            style={{
              flex: 0.8,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
            }}>
            {this.props.MainReducer.SelectedOrderType.OrderTypeId == 2 ? (
              <Form style={{flex: 1}}>
                <Form style={{}}>
                  <OrderDetail
                    headerText="Order Type"
                    desc={
                      '' + this.props.MainReducer.SelectedOrderType.OrderType
                    }
                    descTwo={''}></OrderDetail>
                </Form>

                <OrderDetail
                  headerText="Payment Type"
                  desc="Card"
                  descTwo=""></OrderDetail>
              </Form>
            ) : (
              <Form style={{flex: 1}}>
                <Form style={{flex: 1}}>
                  <OrderDetail
                    headerText="Pick up time"
                    desc={
                      moment(this.props.MainReducer.pickupDate).format(
                        'ddd, DD MMM, ',
                      ) +
                      '' +
                      this.props.MainReducer.pickupTime.Timings
                    }
                    descTwo=""></OrderDetail>
                  <OrderDetail
                    headerText="Pick up address"
                    desc={pickupAddress}
                    descTwo=""
                    comments={
                      this.props.MainReducer.pickupAddress.Comments
                    }></OrderDetail>
                </Form>
                <Form style={{flex: 1}}>
                  <OrderDetail
                    headerText="Return time"
                    desc={
                      moment(this.props.MainReducer.returnDate).format(
                        'ddd, DD MMM, ',
                      ) +
                      '' +
                      this.props.MainReducer.returnTime.Timings
                    }
                    descTwo=""></OrderDetail>
                  <OrderDetail
                    headerText="Return address"
                    desc={
                      this.props.MainReducer.returnToSame
                        ? pickupAddress
                        : dropoffAddress
                    }
                    descTwo=""
                    comments={
                      this.props.MainReducer.returnToSame
                        ? this.props.MainReducer.pickupAddress.Comments
                        : this.props.MainReducer.dropoffAddress.Comments
                    }></OrderDetail>
                </Form>

                <OrderDetail
                  headerText="Payment Type"
                  desc="Card"
                  descTwo=""></OrderDetail>
              </Form>
            )}
            <Form style={{flex: 1, padding: 10}}>
              <Label>Order Details</Label>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.MainReducer.selectedServices}
                renderItem={this.renderItem.bind(this)}
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
                    <Text style={{fontSize: 14, color: 'gray'}}>
                      {' '}
                      {parseFloat(this.calutateTotal() * 0.19).toFixed(2)}
                    </Text>
                  </Form>
                </View>
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

          <Form>
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
                paddingHorizontal: 15,
                alignItems: 'center',
              }}
              onPress={() => {
                var data = {
                  UserId: this.props.MainReducer.user.UserId,
                  Name: this.props.MainReducer.user.Name,
                  Email: this.props.MainReducer.user.Email,
                  PickUpTimeId: this.props.MainReducer.pickupTime.StoreTimeId,
                  PickUpDate: this.props.MainReducer.pickupDate,
                  DropOffTimeId: this.props.MainReducer.returnTime.StoreTimeId,
                  DropOffDate: this.props.MainReducer.returnDate,
                  PickUpAddressId: this.props.MainReducer.pickupAddress
                    .UserAddressId,
                  DropOffAddressId: this.props.MainReducer.returnToSame
                    ? this.props.MainReducer.pickupAddress.UserAddressId
                    : this.props.MainReducer.dropoffAddress.UserAddressId,
                  TotalAmount: this.calutateTotal(),
                  DiscountedAmount: 0,
                  Description: '',
                  PaymentMethodId: 2,
                  OrderTypeId: this.props.MainReducer.SelectedOrderType
                    .OrderTypeId,
                  CustomerOrderChilds: this.props.MainReducer.selectedServices,
                  //
                };
                if (
                  this.props.MainReducer.user != '' &&
                  this.props.MainReducer.user != undefined &&
                  this.props.MainReducer.user != null
                ) {
                  if (this.props.MainReducer.user.ProfileStatus == false) {
                    Toast.show({
                      text: 'Please verify your profile to place an order',
                      duration: 4000,
                    });
                  } else {
                    // this.props.navigation.navigate('KlarnaCheckout', {data});
                    this.submitOrder(data);
                    //save to klarna
                    // var order_lines = [];
                    // this.props.MainReducer.selectedServices.map((service) => {
                    //   var service = {
                    //     type: 'physical',
                    //     reference: service.id,
                    //     name: service.PackageTitle,
                    //     quantity: 1,
                    //     quantity_unit: 'pcs',
                    //     unit_price: service.Price * 100,
                    //     total_amount: service.Price * 100,
                    //     total_discount_amount: 0,
                    //     total_tax_amount: 0,
                    //     tax_rate: 0,
                    //   };
                    //   order_lines.push(service);
                    // });
                    // order_lines.push({
                    //   type: 'sales_tax',
                    //   name: 'VAT',
                    //   quantity: 1,
                    //   unit_price: this.calutateTotalKlarna() * 0.19, //Sales tax 19%
                    //   total_amount: this.calutateTotalKlarna() * 0.19,
                    //   total_tax_amount: 0,
                    //   tax_rate: 0,
                    // });
                    // this.createOrder({
                    //   purchase_country: 'DE',
                    //   purchase_currency: 'EUR',
                    //   locale: 'en-DE',
                    //   order_amount:
                    //     this.calutateTotalKlarna() +
                    //     this.calutateTotalKlarna() * 0.19,
                    //   order_tax_amount: this.calutateTotalKlarna() * 0.19,
                    //   billing_address: {
                    //     given_name: this.props.MainReducer.user.Name,
                    //     family_name: this.props.MainReducer.user.SurName,
                    //     organization_name: '',
                    //     email: this.props.MainReducer.user.Email,
                    //     title: 'Mr',
                    //     street_address:
                    //       this.props.MainReducer.pickupAddress.Street +
                    //       ', ' +
                    //       this.props.MainReducer.pickupAddress.Address,
                    //     street_address2: '',
                    //     street_name: this.props.MainReducer.pickupAddress
                    //       .Street,
                    //     street_number: '',
                    //     house_extension: '',
                    //     postal_code: this.props.MainReducer.pickupAddress
                    //       .PostCode,
                    //     city: this.props.MainReducer.pickupAddress.City,
                    //     region: 'DE',
                    //     phone: this.props.MainReducer.user.PhoneNumber,
                    //     country: 'DE',
                    //     care_of: this.props.MainReducer.pickupAddress.CO,
                    //     reference: 'string',
                    //     attention: 'string',
                    //   },

                    //   shipping_address: this.props.MainReducer.returnToSame
                    //     ? {
                    //         given_name: this.props.MainReducer.user.Name,
                    //         family_name:
                    //           this.props.MainReducer.user.SurName + ' ',
                    //         organization_name: '',
                    //         email: this.props.MainReducer.user.Email,
                    //         title: 'Mr',
                    //         street_address:
                    //           this.props.MainReducer.pickupAddress.Street +
                    //           ', ' +
                    //           this.props.MainReducer.pickupAddress.Address,
                    //         street_address2: '',
                    //         street_name: this.props.MainReducer.pickupAddress
                    //           .Street,
                    //         street_number: '',
                    //         house_extension: '',
                    //         postal_code: this.props.MainReducer.pickupAddress
                    //           .PostCode,
                    //         city: this.props.MainReducer.pickupAddress.City,
                    //         region: 'DE',
                    //         phone: this.props.MainReducer.user.PhoneNumber,
                    //         country: 'DE',
                    //         care_of: this.props.MainReducer.pickupAddress.CO,
                    //         reference: 'string',
                    //         attention: 'string',
                    //       }
                    //     : {
                    //         given_name: this.props.MainReducer.user.Name,
                    //         family_name:
                    //           this.props.MainReducer.user.SurName + ' ',
                    //         organization_name: '',
                    //         email: this.props.MainReducer.user.Email,
                    //         title: 'Mr',
                    //         street_address:
                    //           this.props.MainReducer.dropoffAddress.Street +
                    //           ', ' +
                    //           this.props.MainReducer.dropoffAddress.Address,
                    //         street_address2: '',
                    //         street_name: this.props.MainReducer.dropoffAddress
                    //           .Street,
                    //         street_number: '',
                    //         house_extension: '',
                    //         postal_code: this.props.MainReducer.dropoffAddress
                    //           .PostCode,
                    //         city: this.props.MainReducer.dropoffAddress.City,
                    //         region: 'DE',
                    //         phone: this.props.MainReducer.user.PhoneNumber,
                    //         country: 'DE',
                    //         care_of: this.props.MainReducer.dropoffAddress.CO,
                    //         reference: 'string',
                    //         attention: 'string',
                    //       },
                    //   order_lines: order_lines,
                    //   merchant_urls: {
                    //     terms: 'https://www.example.com/terms.html',
                    //     checkout: 'https://www.example.com/checkout.html',
                    //     confirmation: 'https://immerneu.de',
                    //     push: 'https://www.example.com/api/push',
                    //   },
                    //   //
                    //   customer: {
                    //     type: 'person',
                    //     date_of_birth: '1995-10-20',
                    //   },
                    // });
                  }
                }
              }}>
              {this.state.submitting ? (
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 12, flex: 1}}>
                    PLACING ORDER
                  </Text>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 12, flex: 1}}>
                    PLACE ORDER
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon type="MaterialIcons" name="euro-symbol"></Icon>
                    <Text style={{color: 'white', marginLeft: -15}}>
                      {this.calutateTotalWithTax()}
                    </Text>
                  </View>
                </View>
              )}
            </Button>
          </Form>
        </View>
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
              {item.PackageTitle}
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
            <Text style={{fontSize: 14, color: 'gray'}}> {item.Price}</Text>
          </Form>
        </View>
      </View>
    );
  }
  calutateTotal() {
    var total = 0;
    this.props.MainReducer.selectedServices.forEach((element) => {
      total += element.Price;
    });
    return total.toFixed(2);
  }
  calutateTotalKlarna() {
    var total = 0;
    this.props.MainReducer.selectedServices.forEach((element) => {
      total += element.Price;
    });
    return total.toFixed(2) * 100;
  }
  calutateTotalWithTax() {
    var total = 0;
    this.props.MainReducer.selectedServices.forEach((element) => {
      total += element.Price;
    });
    total += total * 0.19;
    return total.toFixed(2);
  }

  reset() {
    this.props.actionSignup('selectedServices', []);
    this.props.actionSignup('pickupDate', '');
    this.props.actionSignup('pickupTime', '');
    this.props.actionSignup('pickupAddress', '');
    this.props.actionSignup('returnToSame', false);
    this.props.actionSignup('returnDate', '');
    this.props.actionSignup('returnTime', '');
    this.props.actionSignup('dropoffAddress', '');
    this.props.actionSignup('selectedPickupTimeIndex', '-1');
    this.props.actionSignup('selectedDropoffTimeIndex', '-1');
  }
  submitOrder(data) {
    var self = this;
    self.setState({submitting: true});

    axios
      .post(BaseURL.concat('api/ShoeCleaning/NewOrder'), data, {
        headers: Header,
      })
      .then((res) => {
        if (res.data.success) {
          self.reset();
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
          });
          this.props.navigation.dispatch(resetAction);
          Toast.show({text: 'Order Placed Successfully', duration: 6000});
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
  // for klarna databse entry so driver can print receipt based on klarna orderid
  createOrder(orderDetails) {
    var self = this;
    self.setState({submitting: true});
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
        var data = {
          UserId: self.props.MainReducer.user.UserId,
          Name: self.props.MainReducer.user.Name,
          Email: self.props.MainReducer.user.Email,
          PickUpTimeId: self.props.MainReducer.pickupTime.StoreTimeId,
          PickUpDate: self.props.MainReducer.pickupDate,
          DropOffTimeId: self.props.MainReducer.returnTime.StoreTimeId,
          DropOffDate: self.props.MainReducer.returnDate,
          PickUpAddressId: self.props.MainReducer.pickupAddress.UserAddressId,
          DropOffAddressId: self.props.MainReducer.returnToSame
            ? self.props.MainReducer.pickupAddress.UserAddressId
            : self.props.MainReducer.dropoffAddress.UserAddressId,
          TotalAmount: self.calutateTotal(),
          DiscountedAmount: 0,
          Description: '',
          PaymentMethodId: 2,
          OrderTypeId: self.props.MainReducer.SelectedOrderType.OrderTypeId,
          CustomerOrderChilds: self.props.MainReducer.selectedServices,
          PaymentToken: res.data.order_id,
        };
        self.submitOrder(data);
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
      actionSignup,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
