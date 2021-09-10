import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import MainStyle from '../../../Styles/ButtonStyle';
import TimeSlot from '../../../Component/TimeSlot';

import axios from 'axios';
import {Button, Text} from 'native-base';
import Theme from '../../../Styles/Theme';
import {Toast} from 'native-base';
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
import ProfileStatus from '../../../Component/ProfileStatus';

class PickupTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
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
              When should we pickup your shoes?
            </Text>
          </View>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            // selectionAnimation={{duration: 300, borderWidth: 1}}
            showDate
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
              fontSize: 50,
            }}
            // minDate={moment().subtract(1, 'days')}
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
              if (
                moment(date).isBefore(moment()) &&
                moment().isSame(date, 'day')
              ) {
                Toast.show({text: 'Cannot select current Date'});
              } else {
                this.props.actionOrder('pickupDate', date);
              }
            }}
            selectedDate={moment().add(1, 'day')}

            // maxDate={moment().add(1, 'days')}
            // datesWhitelist={datesWhitelist}
          ></CalendarStrip>
          <View style={{flex: 0.5}}>
            <TimeSlot
              onTimeSelected={(time, index) => {
                this.props.actionOrder('pickupTime', time);
                this.props.actionOrder('selectedPickupTimeIndex', '' + index);
              }}
              isPickupTime={true}
              selectedIndex={this.props.MainReducer.selectedPickupTimeIndex}
            />
          </View>
          {this.props.MainReducer.pickupTime &&
          this.props.MainReducer.pickupDate != '' ? (
            <Button
              style={{
                backgroundColor: Theme.THEME_COLOR,
                width: '80%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('PickupLocation');
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
export default connect(mapStateToProps, mapDispatchToProps)(PickupTime);
