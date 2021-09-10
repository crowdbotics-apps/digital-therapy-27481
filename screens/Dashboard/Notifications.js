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
import HeaderWhite from '../../Component/HeaderWhite';
import ProfileStatus from '../../Component/ProfileStatus';
import {actionSignup} from '../../Actions/index';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HeaderTitle} from 'react-navigation-stack';
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }
  componentDidMount() {
    this.getUserNotifications(this.props.MainReducer.user.UserId);
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getUserNotifications(this.props.MainReducer.user.UserId);
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
        <HeaderWhite showBack={false} text="My Notifications" />
        <Form style={{flex: 1, justifyContent: 'center'}}>
          {this.state.submitting ? (
            <ActivityIndicator size="large" color={Theme.THEME_COLOR} />
          ) : this.state.notifications.length > 0 ? (
            <FlatList
              data={this.state.notifications}
              renderItem={this.renderItem.bind(this)}
              // ItemSeparatorComponent={this.ItemSeparatorComponent}
              extraData={this.state}
            />
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                color: 'gray',
                fontSize: 22,
                marginTop: -50,
              }}>
              No Notifications
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
          height: 3,
        }}
      />
    );
  }
  renderItem({index, item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('UpdateOrder', {item});
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
          alignSelf: 'center',
          justifyContent: 'space-evenly',
          marginVertical: 10,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text style={[{textAlign: 'left', fontWeight: 'bold'}]}>
            Order # {item.Data}
          </Text>

          <Text style={[{textAlign: 'left'}]}>{item.NotificationTitle}</Text>
          <Form
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                {textAlign: 'left', fontSize: 12, color: 'gray', flex: 0.6},
              ]}>
              {item.NotificationDate.split('T')[0]}
            </Text>
          </Form>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="keyboard-arrow-right" type="MaterialIcons" />
        </View>
        <Form
          style={{
            position: 'absolute',
            right: 5,
            top: 5,
            flexDirection: 'row',

            justifyContent: 'flex-end',
          }}>
          <Text
            style={[
              {
                textAlign: 'right',
                fontSize: 12,
                color: 'red',
                flex: 0.6,
              },
            ]}>
            {item.ReadStatus ? '' : 'unread'}
          </Text>
        </Form>
      </TouchableOpacity>
    );
  }
  getUserNotifications(userid) {
    var self = this;
    self.setState({submitting: true});
    axios({
      method: 'get',
      url: BaseURL.concat(
        'api/ShoeCleaning/Notification/getNotifications?UserId=' + userid,
      ),
      headers: Header,
    })
      .then((res) => {
        console.warn(res);
        if (res.data.success) {
          self.setState({notifications: res.data.data});
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
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
