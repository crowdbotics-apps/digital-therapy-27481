import React from "react"
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import { getNavigationScreen } from "@screens"
import Theme from "../../Styles/Theme"
import DropDownPicker from "react-native-dropdown-picker"
import HeaderWhite from "../../Component/HeaderWhite"
import ButtonStyle from "../../Styles/ButtonStyle"
// edited
export class GuideScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      value: null,
      items: [],
      home: false,
      account: false,
      profile: false
    }

    // this.setValue = this.setValue.bind(this)
  }
  //   setOpen(open) {
  //     this.setState({
  //       open
  //     })
  //   }

  //   setValue(callback) {
  //     this.setState(state => ({
  //       value: callback(state.value)
  //     }))
  //   }

  //   setItems(callback) {
  //     this.setState(state => ({
  //       items: callback(state.items)
  //     }))
  //   }

  render() {
    const { home, account, profile } = this.state
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
        style={styles.ScrollView_1}
      >
        <View style={{ flex: 1 }}>
          <HeaderWhite
            text="Guide Screen"
            onPress={() => this.props.navigation.goBack()}
            hideIcon
            navigation={this.props.navigation}
          />
          <View
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: Theme.THEME_COLOR
              }}
            >
              Guide - How to use?
            </Text>
          </View>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 40,
                color: Theme.THEME_COLOR,
                textAlignVertical: "top"
              }}
            >
              -
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              width: "95%"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: 50
              }}
            >
              Welcome to Speak Listen Resolve {"\n"} Speak Listen Resolve app is
              a tool to help people communicate without arguing. {"\n"} Below is
              a brief guide for the roles
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 20
              }}
            >
              Rules for the Speaker
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center"
              }}
            >
              – Speak for yourself and about how you felt.{"\n"}– Don’t mind
              read! Don't tell them how they feel or what they think.{"\n"}–
              Keep statements brief (3-5 min). Don’t go on and on.{"\n"}– Focus
              on how you felt about the situation or act.
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 20
              }}
            >
              Rules for the Listener
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center"
              }}
            >
              – Paraphrase what you hear.{"\n"}– Focus on the speaker’s message.
              Don’t rebut.{"\n"}– Focus on how they felt about the situation or
              act.{"\n"}– This is not agreement. It is only to let them know you
              heard them.
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 20
              }}
            >
              Rules for Both
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center"
              }}
            >
              – The speaker has the floor.{"\n"}– Speaker keeps the floor while
              the listener paraphrases.{"\n"}– Once the Speaker acknowledges the
              Listeners paraphrasing the roles will swap.{"\n"}– Remember you
              are a team!
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  ScrollView_1: { backgroundColor: "white" },
  roundButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  roundButtonLarge: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  pickerContainerStyle: { marginVertical: 10 }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(GuideScreen)
