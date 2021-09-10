import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MainStyle from '../../../Styles/ButtonStyle';
import TimeSlot from '../../../Component/TimeSlot';

import axios from 'axios';
import {Button, Text} from 'native-base';
import Theme from '../../../Styles/Theme';
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
} from '../../../Connection/index';
import CalendarStrip from '../../../Component/react-native-calendar-strip/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionOrder} from '../../../Actions/index';
import moment from 'moment';
import {ScrollView} from 'react-native';
class DropoffTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }
  componentDidMount() {
    this.props.actionOrder(
      'returnDate',
      moment(this.props.MainReducer.pickupDate).add(5, 'days'),
    );
  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
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
              When to return them back?
            </Text>
          </View>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            selectionAnimation={{duration: 300, borderWidth: 1}}
            style={{
              paddingBottom: 20,
              justifyContent: 'flex-start',
              // flex: 0.2,
              height: 150,
            }}
            calendarColor={'white'}
            highlightColor={'#9265DC'}
            dateNumberStyle={{
              color: 'gray',
            }}
            dateNameStyle={{color: 'gray'}}
            highlightDateNumberStyle={{color: 'black'}}
            highlightDateNameStyle={{color: 'black'}}
            responsiveSizingOffset={50}
            borderHighlightColor={'white'}
            numDaysInWeek={5}
            iconContainer={{marginLeft: 10}}
            scrollable
            leftSelector={[]}
            rightSelector={[]}
            onDateSelected={(date) => {
              this.props.actionOrder('returnDate', date);
            }}
            selectedDate={moment(this.props.MainReducer.pickupDate).add(
              5,
              'days',
            )}
            minDate={moment(this.props.MainReducer.pickupDate).add(5, 'days')}
            // maxDate={moment().add(1, 'days')}
            // datesWhitelist={datesWhitelist}
          ></CalendarStrip>
          <View style={{flex: 0.5}}>
            <TimeSlot
              onTimeSelected={(time, index) => {
                this.props.actionOrder('returnTime', time);
                this.props.actionOrder('selectedDropoffTimeIndex', '' + index);
              }}
              isPickupTime={true}
              selectedIndex={this.props.MainReducer.selectedDropoffTimeIndex}
            />
          </View>
          {this.props.MainReducer.returnTime &&
          this.props.MainReducer.returnDate != '' ? (
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => {
                if (this.props.MainReducer.returnToSame) {
                  this.props.navigation.navigate('OrderConfirmation');
                } else {
                  this.props.navigation.navigate('DropoffLocation');
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
export default connect(mapStateToProps, mapDispatchToProps)(DropoffTime);
