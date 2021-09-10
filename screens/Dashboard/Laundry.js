import React, {Component} from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
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
} from 'native-base';
import Theme from '../../Styles/Theme';
import qs from 'qs';
import strings from '../../Localization';
import {NavigationActions, StackActions} from 'react-navigation';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionAddress, actionOrder, actionSignup} from '../../Actions/index';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../Connection/index';
import ProfileStatus from '../../Component/ProfileStatus';
import OneSignal from 'react-native-onesignal';
class Laundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      deals: [
        {
          title: '5 Shoes special discount',
          desc: '20$ for 5 shoes.Every next shoes for only 4 $',
          icon: require('../../assets/sneakers.png'),
        },
        {
          title: '5 Shoes special discount',
          desc: '20$ for 5 shoes.Every next shoes for only 4 $',
          icon: require('../../assets/sneakers.png'),
        },
        {
          title: '5 Shoes special discount',
          desc: '20$ for 5 shoes.Every next shoes for only 4 $',
          icon: require('../../assets/sneakers.png'),
        },
      ],
    };
  }
  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.checkLoggedin();
        this.getUserAddress(this.props.MainReducer.user.UserId);
        this.getSlots();
      },
    );
    //one signal push notification

    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('e56b0342-e088-44a9-b227-b7ad0ffff38e');
    OneSignal.setLogLevel(6, 0);

    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      this.OSLog('Prompt response:', response);
    });
    OneSignal.sendTag('userID', '' + this.props.MainReducer.user.UserId);

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        // this.OSLog(
        //   'OneSignal: notification will show in foreground:',
        //   notifReceivedEvent,
        // );
        let notif = notifReceivedEvent.getNotification();
        alert(
          'You have received a new notification, Check notifications tab for more details',
        );
      },
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
      // this.OSLog('OneSignal: notification opened:', notification);

      var item = {
        Data: notification.notification.additionalData.orderId,
      };
      console.warn(item);
      // this.props.navigation.navigate('UpdateOrder', {item}); //temporary
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      // this.OSLog('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      // this.OSLog('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      // this.OSLog('OneSignal: subscription changed:', event);
      this.setState({isSubscribed: event.to.isSubscribed});
    });
    OneSignal.addPermissionObserver((event) => {
      // this.OSLog('OneSignal: permission changed:', event);
    });

    const deviceState = await OneSignal.getDeviceState();

    this.setState({
      isSubscribed: deviceState.isSubscribed,
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  checkLoggedin = () => {
    var self = this;
    storage
      .load({
        key: 'loginState',
      })
      .then((ret) => {
        self.props.actionSignup('user', ret);
      })
      .catch((err) => {
        self.setState({checkingLoggedIn: false});
        // any exception including data not found
        // goes to catch()
        //  console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View style={{flex: 1}}>
          <ProfileStatus navigation={this.props.navigation} />

          <Form style={Styles.formStyle}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '100%', textAlign: 'left'},
              ]}>
              WHAT TO DO WITH YOUR SHOES?
            </Text>

            <Text style={{fontSize: 16, color: 'black'}}>
              Bring your shoes a new shine by ordering shoe cleaning now
            </Text>

            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: 140,
                justifyContent: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate('ServiceSelectionNormal');
              }}>
              <Text style={{color: 'white'}}>New Order</Text>
            </Button>

            {/* Deals & News */}
          </Form>
          <Form
            style={{
              backgroundColor: 'white',
              borderWidth: 0.5,
              borderColor: '#dcdcdc',
              padding: 10,
              flex: 0.25,
              width: '90%',
              alignSelf: 'center',
              marginBottom: 20,
              borderRadius: 5,
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '100%', textAlign: 'left'},
              ]}>
              SERVICE
            </Text>
            <Text>
              You have a pair of shoes that a little Need care? ​ At Immerneu we
              specialize in exactly this type the special shoe affection!
            </Text>
            <Text>
              At Immerneu we specialize in exactly this type the special shoe
              affection!
            </Text>
          </Form>

          {/* <Form
            style={{
              backgroundColor: 'white',
              borderWidth: 0.5,
              borderColor: '#dcdcdc',
              padding: 10,
              flex: 1,
              width: '90%',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '100%', textAlign: 'left'},
              ]}>
              Deal & News
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.deals}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.itemSeperatorComponent}
            />
          </Form>
       */}
        </View>
      </ScrollView>
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
          padding: 10,
          flex: 1,
        }}>
        <Form style={{width: '70%'}}>
          <Text style={[MainStyle.textStyleBlackBold, {textAlign: 'left'}]}>
            {item.title}
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>{item.desc}</Text>
        </Form>
        <Form
          style={{
            width: '30%',
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
    );
  }
  getUserAddress(userid) {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat('api/ShoeCleaning/GetUserAddresses?UserId=' + userid),
      headers: Header,
    })
      .then((res) => {
        if (res.data.success) {
          self.props.actionAddress('address', res.data.data);
          res.data.data.forEach((address) => {
            if (address.Selected) {
              self.props.actionOrder('pickupAddress', address);
              self.props.actionOrder('dropoffAddress', address);
              return;
            }
          });
        }
      })
      .catch(function (error) {
        console.warn(error);

        self.setState({loading: false});
      })
      .finally(() => self.setState({submitting: false}));
  }
  getSlots() {
    var self = this;
    axios({
      method: 'get',
      url: BaseURL.concat('api/ShoeCleaning/GetTimes'),
      headers: Header,
    })
      .then((res) => {
        if (res.data.success) {
          self.props.actionOrder('TimeSlots', res.data.data);
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
    flex: 0.5,
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
      actionAddress,
      actionSignup,
      actionOrder,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Laundry);
