import React, {useState, Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
// import Button from '../../src/component/Button';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
import ProfileStatus from '../../Component/ProfileStatus';

import {actionSignup} from '../../Actions/index';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      showActive: true,
      containPastOrders: false,
      submitting: false,
    };
  }
  componentDidMount() {
    this.getUserOrders(this.props.MainReducer.user.UserId, 'Delivered');
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getUserOrders(this.props.MainReducer.user.UserId, 'Delivered');
        this.setState({showActive: true});
      },
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ProfileStatus navigation={this.props.navigation} />
        <Form style={Styles.formStyle}>
          <Text
            style={[
              MainStyle.textStyleBlackBold,
              {width: '100%', textAlign: 'left', fontSize: 30},
            ]}>
            My Orders
          </Text>

          <Form
            style={{
              flexDirection: 'row',

              justifyContent: 'space-evenly',
            }}>
            <Button
              style={{
                backgroundColor: this.state.showActive
                  ? Theme.THEME_COLOR
                  : '#a9a9a9',
                width: 140,
                justifyContent: 'center',
              }}
              onPress={() => {
                this.setState({showActive: true});
              }}>
              <Text style={{color: 'white'}}>Active</Text>
            </Button>
            <Button
              style={{
                backgroundColor: !this.state.showActive
                  ? Theme.THEME_COLOR
                  : '#a9a9a9',
                width: 140,
                justifyContent: 'center',
              }}
              onPress={() => {
                this.setState({showActive: false});
              }}>
              <Text style={{color: 'white'}}>Past</Text>
            </Button>
          </Form>
        </Form>

        <Form style={{flex: 1, justifyContent: 'center'}}>
          {this.state.submitting ? (
            <ActivityIndicator size="large" color={Theme.THEME_COLOR} />
          ) : this.state.orders.length > 0 ? (
            !this.state.showActive && !this.state.containPastOrders ? (
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'gray',
                  fontSize: 22,
                  marginTop: -50,
                }}>
                No Past Orders
              </Text>
            ) : (
              <FlatList
                data={this.state.orders}
                renderItem={this.renderItem.bind(this)}
                // ItemSeparatorComponent={this.ItemSeparatorComponent}
                extraData={this.state}
              />
            )
          ) : (
            // <FlatList
            //   data={this.state.orders}
            //   renderItem={this.renderItem.bind(this)}
            //   ItemSeparatorComponent={this.ItemSeparatorComponent}
            //   extraData={this.state}
            // />
            <Text
              style={{
                alignSelf: 'center',
                color: 'gray',
                fontSize: 22,
                marginTop: -50,
              }}>
              No {this.state.showActive ? 'Active' : 'Past'} Orders
            </Text>
          )}
        </Form>
      </View>
    );
  }
  ItemSeparatorComponent() {
    return (
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          height: 10,
        }}
      />
    );
  }
  renderItem({index, item}) {
    if (this.state.showActive) {
      if (item.Status != 'Delivered') {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('OrderDetail', {item});
            }}
            style={{
              width: '90%',
              borderRadius: 5,
              backgroundColor: 'white',
              elevation: 3,
              shadowColor: 'black',
              shadowRadius: 5,
              shadowOffset: {x: 10, y: 10},
              shadowOpacity: 0.4,
              padding: 10,
              height: 240,
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 10,
            }}>
            <Text style={[{textAlign: 'left', fontWeight: 'bold'}]}>
              Order # {item.RefNo}
            </Text>
            <Form
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              {item.OrderTypeId == 2 ? (
                <View style={{flex: 0.6}}>
                  {/* <Text style={[{textAlign: 'left'}]}>{item.OrderType}</Text> */}
                </View>
              ) : (
                <Text style={[{textAlign: 'left', flex: 0.6}]}>
                  {item.OrDate}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'flex-start',
                }}>
                <Icon
                  type="MaterialIcons"
                  name="update"
                  style={{
                    color: Theme.THEME_COLOR,
                    fontSize: 20,
                    marginHorizontal: 2,
                  }}
                />
                <Text style={{textAlignVertical: 'center'}}>{item.Status}</Text>
              </View>
            </Form>
            {item.OrderTypeId == 2 ? (
              <Form>
                {/* Pickup time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      backgroundColor: Theme.THEME_COLOR,
                      marginHorizontal: 12,
                    }}></View>
                  <View>
                    <Text style={[{textAlign: 'left'}]}>{item.OrderType}</Text>
                    <Text style={{color: 'gray', fontSize: 12}}>
                      During the laundry opening timings
                    </Text>
                    <Text style={{color: 'gray', fontSize: 12}}>
                      9:00 - 17:00, Mon. - Fri.
                    </Text>
                  </View>
                </Form>
                {/* Dropoff time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      marginHorizontal: 12,
                    }}></View>
                  {/* Fri, 6 Nov, 08:00 - 09-00 */}
                  <View>
                    <Text style={[{textAlign: 'left'}]}></Text>
                    <Text style={{color: 'gray', fontSize: 14}}></Text>
                  </View>
                </Form>
              </Form>
            ) : (
              <Form>
                {/* Pickup time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      backgroundColor: Theme.THEME_COLOR,
                      marginHorizontal: 12,
                    }}></View>
                  <View>
                    <Text style={[{textAlign: 'left'}]}>{item.PickTime}</Text>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      Pickup time
                    </Text>
                  </View>
                </Form>
                {/* Dropoff time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      marginHorizontal: 12,
                    }}></View>
                  {/* Fri, 6 Nov, 08:00 - 09-00 */}
                  <View>
                    <Text style={[{textAlign: 'left'}]}>{item.DropTime}</Text>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      Return time
                    </Text>
                  </View>
                </Form>
              </Form>
            )}
            <View
              style={{
                backgroundColor: '#dcdcdc',
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                color: 'gray',

                fontSize: 14,
                marginLeft: 0,
                alignSelf: 'center',
              }}>
              View Details
            </Text>
          </TouchableOpacity>
        );
      }
      if (item.Status === 'Delivered') {
        if (!this.state.containPastOrders) {
          this.setState({containPastOrders: true});
        }
      }
    } else {
      if (item.OrderStatusId == 4) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('OrderDetail', {item});
            }}
            style={{
              width: '90%',
              borderRadius: 5,
              backgroundColor: 'white',
              elevation: 3,
              shadowColor: 'black',
              shadowRadius: 5,
              shadowOffset: {x: 10, y: 10},
              shadowOpacity: 0.4,
              padding: 10,
              height: 240,
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 10,
            }}>
            <Text style={[{textAlign: 'left', fontWeight: 'bold'}]}>
              Order # {item.RefNo}
            </Text>
            <Form
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              {item.OrderTypeId == 2 ? (
                <View style={{flex: 0.6}}>
                  {/* <Text style={[{textAlign: 'left'}]}>{item.OrderType}</Text> */}
                </View>
              ) : (
                <Text style={[{textAlign: 'left', flex: 0.6}]}>
                  {item.OrDate}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'flex-start',
                }}>
                <Icon
                  type="MaterialIcons"
                  name="update"
                  style={{
                    color: Theme.THEME_COLOR,
                    fontSize: 20,
                    marginHorizontal: 2,
                  }}
                />
                <Text style={{textAlignVertical: 'center'}}>{item.Status}</Text>
              </View>
            </Form>
            {item.OrderTypeId == 2 ? (
              <Form>
                {/* Pickup time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      backgroundColor: Theme.THEME_COLOR,
                      marginHorizontal: 12,
                    }}></View>
                  <View>
                    <Text style={[{textAlign: 'left'}]}>{item.OrderType}</Text>
                    <Text style={{color: 'gray', fontSize: 12}}>
                      During the laundry opening timings
                    </Text>
                    <Text style={{color: 'gray', fontSize: 12}}>
                      9:00 - 17:00, Mon. - Fri.
                    </Text>
                  </View>
                </Form>
                {/* Dropoff time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      marginHorizontal: 12,
                    }}></View>
                  {/* Fri, 6 Nov, 08:00 - 09-00 */}
                  <View>
                    <Text style={[{textAlign: 'left'}]}></Text>
                    <Text style={{color: 'gray', fontSize: 14}}></Text>
                  </View>
                </Form>
              </Form>
            ) : (
              <Form>
                {/* Pickup time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      backgroundColor: Theme.THEME_COLOR,
                      marginHorizontal: 12,
                    }}></View>
                  <View>
                    <Text style={[{textAlign: 'left'}]}>{item.PickTime}</Text>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      Pickup time
                    </Text>
                  </View>
                </Form>
                {/* Dropoff time */}
                <Form
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      marginHorizontal: 12,
                    }}></View>
                  {/* Fri, 6 Nov, 08:00 - 09-00 */}
                  <View>
                    <Text style={[{textAlign: 'left'}]}>{item.DropTime}</Text>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      Return time
                    </Text>
                  </View>
                </Form>
              </Form>
            )}
            <View
              style={{
                backgroundColor: '#dcdcdc',
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                color: 'gray',

                fontSize: 14,
                marginLeft: 0,
                alignSelf: 'center',
              }}>
              View Details
            </Text>
          </TouchableOpacity>

          // <TouchableOpacity
          //   onPress={() => {
          //     this.props.navigation.navigate('OrderDetail', {item});
          //   }}
          //   style={{
          //     width: '90%',
          //     borderRadius: 5,
          //     backgroundColor: 'white',
          //     elevation: 3,
          //     shadowColor: 'black',
          //     shadowRadius: 5,
          //     shadowOffset: {x: 10, y: 10},
          //     shadowOpacity: 0.4,
          //     padding: 10,
          //     height: 240,
          //     alignSelf: 'center',
          //     justifyContent: 'space-evenly',
          //     marginVertical: 10,
          //   }}>
          //   <Text style={[{textAlign: 'left', fontWeight: 'bold'}]}>
          //     Order # {item.RefNo}
          //   </Text>
          //   <Form
          //     style={{
          //       flexDirection: 'row',
          //       justifyContent: 'space-evenly',
          //       width: '100%',
          //     }}>
          //     <Text style={[{textAlign: 'left', flex: 0.6}]}>
          //       {item.OrDate}
          //     </Text>
          //     <View
          //       style={{
          //         flexDirection: 'row',

          //         alignItems: 'flex-start',
          //       }}>
          //       <Icon
          //         type="MaterialIcons"
          //         name="update"
          //         style={{
          //           color: Theme.THEME_COLOR,
          //           fontSize: 20,
          //           marginHorizontal: 2,
          //         }}
          //       />
          //       <Text style={{textAlignVertical: 'center'}}>{item.Status}</Text>
          //     </View>
          //   </Form>
          //   {/* Pickup time */}
          //   <Form
          //     style={{
          //       flexDirection: 'row',

          //       alignItems: 'center',
          //     }}>
          //     <View
          //       style={{
          //         height: 8,
          //         width: 8,
          //         borderRadius: 10,
          //         backgroundColor: Theme.THEME_COLOR,
          //         marginHorizontal: 12,
          //       }}></View>
          //     <View>
          //       <Text style={[{textAlign: 'left'}]}>{item.PickTime}</Text>
          //       <Text style={{color: 'gray', fontSize: 14}}>Pickup time</Text>
          //     </View>
          //   </Form>
          //   {/* Dropoff time */}
          //   <Form
          //     style={{
          //       flexDirection: 'row',

          //       alignItems: 'center',
          //     }}>
          //     <View
          //       style={{
          //         height: 8,
          //         width: 8,
          //         borderRadius: 10,
          //         backgroundColor: 'gray',
          //         marginHorizontal: 12,
          //       }}></View>
          //     {/* Fri, 6 Nov, 08:00 - 09-00 */}
          //     <View>
          //       <Text style={[{textAlign: 'left'}]}>{item.DropTime}</Text>
          //       <Text style={{color: 'gray', fontSize: 14}}>Return time</Text>
          //     </View>
          //   </Form>
          //   <View
          //     style={{
          //       backgroundColor: '#dcdcdc',
          //       height: 0.5,
          //       width: '80%',
          //       alignSelf: 'center',
          //     }}
          //   />
          //   <Text
          //     numberOfLines={1}
          //     style={{
          //       color: 'gray',

          //       fontSize: 14,
          //       marginLeft: 0,
          //       alignSelf: 'center',
          //     }}>
          //     View Details
          //   </Text>
          // </TouchableOpacity>
        );
      }
    }
  }
  getUserOrders(userid, status) {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat(
        'api/ShoeCleaning/GetUserOrders?UserId=' + userid,
        //  +
        // '&OrderType=' +
        // status,
      ),
      headers: Header,
    })
      .then((res) => {
        console.warn(res);
        if (res.data.success) {
          self.setState({orders: res.data.data});
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
    flex: 0.3,
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
      actionSignup,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
