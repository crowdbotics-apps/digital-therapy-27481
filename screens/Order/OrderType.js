import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import MainStyle from '../../Styles/ButtonStyle';
import OrderTypeList from '../../Component/OrderType';

import axios from 'axios';
import {Button, Text} from 'native-base';
import Theme from '../../Styles/Theme';
import {Toast} from 'native-base';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../Connection/index';
import CalendarStrip from '../../Component/react-native-calendar-strip/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionOrder} from '../../Actions/index';
import moment from 'moment';
import ProfileStatus from '../../Component/ProfileStatus';

class OrderType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'space-evenly',
          }}>
          <View style={{flex: 0.1, padding: 20}}>
            <Text
              style={[
                MainStyle.textStyleBlackBold,
                {width: '80%', textAlign: 'left', fontSize: 26},
              ]}
              numberOfLines={2}>
              How do you want the order to be processed?
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <OrderTypeList
              onOrderTypeSelected={(item, index) => {
                this.props.actionOrder('SelectedOrderType', item);
                this.props.actionOrder('selectedOrderTypeIndex', '' + index);
              }}
              selectedIndex={this.props.MainReducer.selectedOrderTypeIndex}
            />
          </View>
          {this.props.MainReducer.SelectedOrderType != '' ? (
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => {
                if (this.props.MainReducer.SelectedOrderType.OrderTypeId == 1) {
                  this.props.navigation.navigate('PickupTime');
                } else if (
                  this.props.MainReducer.SelectedOrderType.OrderTypeId == 2
                ) {
                  if (this.props.MainReducer.addresses.length > 0) {
                    this.props.navigation.navigate('OrderConfirmation');
                  } else {
                    Toast.show({
                      text:
                        'You must set default address to proceed with this method, navigating to address screen',
                      duration: 3000,
                    });
                    setTimeout(
                      () => this.props.navigation.navigate('MyAddresses'),
                      3000,
                    );
                  }
                }
              }}>
              <Text style={{color: 'white'}}>Next</Text>
            </Button>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    );
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
      actionOrder,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrderType);
