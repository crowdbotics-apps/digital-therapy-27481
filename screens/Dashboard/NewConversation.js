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

// edited
export class NewConversation extends React.Component {
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
          <View
            style={{
              flexDirection: "row",
              flex: 0.1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}
          >
            <Text>New Conversation</Text>
          </View>
          <View
            style={{
              flex: 0.5,
              width: "90%",
              alignSelf: "center"
            }}
          >
            <View>
              <View style={styles.pickerContainerStyle}>
                <Text>Select category</Text>
                <DropDownPicker
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "white",
                    borderWidth: 0,
                    marginTop: 10,
                    elevation: 4,
                    borderRadius: 3
                  }}
                  textStyle={{ color: Theme.THEME_COLOR }}
                  ArrowDownIconComponent={() => (
                    <Icon
                      name="keyboard-arrow-down"
                      color={Theme.THEME_COLOR}
                      size={25}
                    />
                  )}
                  ArrowUpIconComponent={() => (
                    <Icon
                      name="keyboard-arrow-up"
                      color={Theme.THEME_COLOR}
                      size={25}
                    />
                  )}
                  items={this.state.items}
                  placeholder="Category"
                />
              </View>
              <View style={styles.pickerContainerStyle}>
                <Text>Select Person</Text>
                <DropDownPicker
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "white",
                    borderWidth: 0,
                    marginTop: 10,
                    elevation: 4,
                    borderRadius: 3
                  }}
                  textStyle={{ color: Theme.THEME_COLOR }}
                  ArrowDownIconComponent={() => (
                    <Icon
                      name="keyboard-arrow-down"
                      color={Theme.THEME_COLOR}
                      size={25}
                    />
                  )}
                  ArrowUpIconComponent={() => (
                    <Icon
                      name="keyboard-arrow-up"
                      color={Theme.THEME_COLOR}
                      size={25}
                    />
                  )}
                  items={this.state.items}
                  placeholder="Category"
                />
              </View>
              <View style={styles.pickerContainerStyle}>
                <Text>Set Topic</Text>
                <DropDownPicker
                  style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "white",
                    borderWidth: 0,
                    marginTop: 10,
                    elevation: 4,
                    borderRadius: 3
                  }}
                  textStyle={{ color: Theme.THEME_COLOR }}
                  ArrowDownIconComponent={() => (
                    <Icon
                      name="keyboard-arrow-down"
                      color={Theme.THEME_COLOR}
                      size={25}
                    />
                  )}
                  ArrowUpIconComponent={() => (
                    <Icon
                      name="keyboard-arrow-up"
                      color={Theme.THEME_COLOR}
                      size={25}
                    />
                  )}
                  items={this.state.items}
                  placeholder="Please write down the topic"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center"
                }}
              >
                <Text style={{ color: Theme.GRAY }}>Person is not on </Text>
                <Text style={{ fontStyle: "italic", color: Theme.GRAY }}>
                  Resolve{"? "}
                </Text>
                <Text style={{ color: Theme.THEME_COLOR, fontWeight: "bold" }}>
                  Invite them
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.props.navigation.navigate("Camera")
                }}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    backgroundColor: Theme.THEME_COLOR,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 20
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  ></View>
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 24,
                  color: Theme.THEME_COLOR,
                  marginTop: 10
                }}
              >
                Record video
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 0.8,
                width: "85%",
                backgroundColor: "white",
                elevation: 3,
                borderBottomLeftRadius: 35,
                borderTopRightRadius: 35
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: profile ? Theme.HOME_SELECTION : "white"
                }}
                onPress={() => {
                  this.setState({ home: false, account: false, profile: true })
                  this.props.navigation.navigate("ProfileScreen")
                }}
              >
                <Image
                  source={require("../../assets/profile.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: profile ? "black" : "gray"
                  }}
                ></Image>
                <Text style={{ color: profile ? "black" : "gray" }}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 35,
                  borderTopRightRadius: 35,
                  backgroundColor: home ? Theme.HOME_SELECTION : "white",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({ home: true, account: false, profile: false })
                }}
              >
                <Image
                  source={require("../../assets/swiper.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: home ? "black" : "gray"
                  }}
                ></Image>
                <Text style={{ color: home ? "black" : "gray" }}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderTopRightRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: account ? Theme.HOME_SELECTION : "white"
                  //   marginLeft: -20
                }}
                onPress={() => {
                  this.setState({ home: false, account: true, profile: false })
                }}
              >
                <Image
                  source={require("../../assets/matches.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: account ? "black" : "gray"
                  }}
                ></Image>
                <Text style={{ color: account ? "black" : "gray" }}>
                  Account
                </Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "white"
  },
  roundButtonLarge: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white"
  },
  pickerContainerStyle: { marginVertical: 10 }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(NewConversation)
