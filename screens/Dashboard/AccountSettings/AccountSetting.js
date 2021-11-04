import React, { useEffect, useState } from "react"
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
import { Avatar, CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import Theme from "../../../Styles/Theme"
import DropDownPicker from "react-native-dropdown-picker"
import HeaderWhite from "../../../Component/HeaderWhite"
import ButtonStyle from "../../../Styles/ButtonStyle"
import { FlatList } from "react-native-gesture-handler"
import { GET_HEADER, BaseURL } from "../../../Connection/index"
import axios from "axios"
import Toast from "react-native-toast-message"
import moment from "moment"
// edited
function AccountSettings(props) {
  const [sentVideos, setSentVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [home, setHome] = useState(false)

  const [account, setAccount] = useState(true)

  const [profile, setProfile] = useState(false)
  useEffect(() => {}, [])

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      style={styles.ScrollView_1}
    >
      <View style={{ flex: 1 }}>
        <HeaderWhite
          text="Settings"
          onPress={() => props.navigation.goBack()}
          hideIcon
          navigation={props.navigation}
        />

        <View
          style={{
            flex: 0.3,
            width: "90%",
            alignSelf: "center"
          }}
        >
          <Text style={ButtonStyle.textStyleHeading}>Settings</Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={styles.viewContainer}>
              <View style={styles.roundButton}>
                <Image
                  source={require("../../../assets/matches.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Theme.THEME_COLOR
                  }}
                />
              </View>
              <View style={styles.viewContainerItem}>
                <Text style={{ fontSize: 16, color: Theme.THEME_COLOR }}>
                  Account Settings
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.viewContainer}>
              <View style={styles.roundButton}>
                <Image
                  source={require("../../../assets/matches.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Theme.THEME_COLOR
                  }}
                />
              </View>
              <View style={styles.viewContainerItem}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  Push Notifications
                </Text>
                <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                  on
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.viewContainer}>
              <View style={styles.roundButton}>
                <Image
                  source={require("../../../assets/matches.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Theme.THEME_COLOR
                  }}
                />
              </View>
              <View style={styles.viewContainerItem}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  Close your account
                </Text>
                <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                  off
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.viewContainer}>
              <View style={styles.roundButton}>
                <Image
                  source={require("../../../assets/matches.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Theme.THEME_COLOR
                  }}
                />
              </View>
              <View style={styles.viewContainerItem}>
                <Text style={{ fontSize: 16, color: "black" }}>
                  Reset your password
                </Text>
                <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                  set a new once
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
          </View>
        </View>

        <View style={{ flex: 0.3 }}>
          <TouchableOpacity
            style={{ width: "90%", alignSelf: "center", marginVertical: 5 }}
            onPress={() => {
              props.navigation.navigate("PrivacyScreen")
            }}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              Privacy policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "90%", alignSelf: "center", marginVertical: 5 }}
            onPress={() => {
              props.navigation.navigate("TermsandConditionScreen")
            }}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              Terms and conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "90%", alignSelf: "center", marginVertical: 5 }}
            onPress={() => {
              props.navigation.navigate("SendFeedback")
            }}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              Send Feedback
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "90%", alignSelf: "center", marginVertical: 10 }}
            onPress={() => {
              global.storage.remove({
                key: "loginState"
              })
              //   const resetAction = StackActions.reset({
              //     index: 0,
              //     key: null,
              //     actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
              //   });
              //   self.props.navigation.dispatch(resetAction);
              props.navigation.reset({
                index: 0,
                routes: [{ name: "LoginScreen" }]
              })
            }}
          >
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
            // marginVertical: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 0.4,
              width: "85%",
              backgroundColor: "white",
              elevation: 3,
              borderBottomLeftRadius: 35,
              borderTopRightRadius: 35,
              shadowColor: "black",
              shadowRadius: 3,
              shadowOffset: { x: 3, y: 3 },
              shadowOpacity: 0.2
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
                setProfile(true)
                setHome(false)
                setAccount(false)
                props.navigation.navigate("ProfileScreen")
              }}
            >
              <Image
                source={require("../../../assets/profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: profile ? "black" : "gray"
                }}
              ></Image>
              <Text style={{ color: profile ? "black" : "gray" }}>Profile</Text>
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
                setProfile(false)
                setHome(true)
                setAccount(false)
                props.navigation.goBack()
              }}
            >
              <Image
                source={require("../../../assets/swiper.png")}
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
                setProfile(false)
                setHome(false)
                setAccount(true)
                props.navigation.navigate("AccountSetting")
              }}
            >
              <Image
                source={require("../../../assets/matches.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: account ? "black" : "gray"
                }}
              ></Image>

              <Text style={{ color: account ? "black" : "gray" }}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  ScrollView_1: { backgroundColor: "white" },
  line: {
    backgroundColor: Theme.LIGHT_GRAY,
    width: "100%",
    height: 1
  },
  viewContainer: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "white",
    // elevation: 4,
    justifyContent: "center",
    alignItems: "center"
    // paddingHorizontal: 20
  },
  viewContainerItem: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: "white",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
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
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
