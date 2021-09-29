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
import { CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import { getNavigationScreen } from "@screens"
import Theme from "../../Styles/Theme"

import { bindActionCreators } from "redux"
import { actionSignup } from "../../Actions/index"
import { useSelector } from "react-redux"
import { BaseURL, Header, SET_TOKEN, GET_HEADER } from "../../Connection/index"
// edited
function HomeScreen(props) {
  const [home, setHome] = useState(true)

  const [account, setAccount] = useState(false)

  const [profile, setProfile] = useState(false)
  const userState = useSelector(state => state.user.value)
  // console.warn(userState.token)
  useEffect(async () => {
    console.warn(await GET_HEADER())
  })
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
          <TouchableOpacity style={[styles.roundButton, { elevation: 0 }]}>
            {/* <Icon name="more-horiz" size={30} color={"#666666"} /> */}
          </TouchableOpacity>
          <View>
            <Image
              source={require("../../assets/logo_text.png")}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.roundButton}>
            <Icon name="notifications" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("GuideScreen")
            }}
            style={{
              width: "100%",
              flex: 1,
              alignSelf: "center",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ImageBackground
              source={require("../../assets/splash_back.png")}
              style={{
                width: "80%",
                flex: 0.5,
                alignSelf: "center",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center"
              }}
              imageStyle={{
                width: "100%",
                borderRadius: 25
              }}
            >
              <Image
                source={require("../../assets/logo.png")}
                style={{ height: 200, resizeMode: "contain" }}
              ></Image>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.15,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ImageBackground
            source={require("../../assets/depth.png")}
            style={{
              width: "60%",
              flex: 1,
              alignSelf: "center",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center"
            }}
            imageStyle={{
              width: "100%",
              borderRadius: 25
            }}
            resizeMode="contain"
          >
            <View
              style={{
                flexDirection: "row",
                height: "70%",
                width: "90%",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                style={styles.roundButtonLarge}
                onPress={() => {
                  props.navigation.navigate("NewConversation")
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: Theme.THEME_COLOR,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="add"
                    size={16}
                    style={{ fontWeight: "bold" }}
                    color={Theme.THEME_COLOR}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.roundButtonLarge}
                onPress={() => {
                  props.navigation.navigate("ReceivedVideos")
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: Theme.THEME_COLOR,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="arrow-downward"
                    size={16}
                    style={{ fontWeight: "bold" }}
                    color={Theme.THEME_COLOR}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View
            style={{
              position: "absolute",
              bottom: -10,
              alignSelf: "center",
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20
            }}
          >
            <TouchableOpacity
              style={[
                styles.roundButton,
                {
                  // position: "absolute",
                  // bottom: -10,
                  alignSelf: "center",
                  backgroundColor: "rgba(34, 34, 34, 0.2)",
                  width: 40,
                  height: 40,
                  elevation: 0
                }
              ]}
              onPress={() => {
                props.navigation.navigate("SentVideos")
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center"
                }}
              >
                <Icon
                  name="arrow-upward"
                  size={16}
                  style={{ fontWeight: "bold" }}
                  color={"white"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roundButton,
                {
                  backgroundColor: "rgba(34, 34, 34, 0.2)",
                  width: 40,
                  height: 40,
                  elevation: 0
                }
              ]}
              onPress={() => {
                props.navigation.navigate("SelfVideos")
              }}
            >
              <Image
                source={require("../../assets/selfVideos.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.35,
            justifyContent: "center",
            alignItems: "center"
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
                setProfile(true)
                setHome(false)
                setAccount(false)
                props.navigation.navigate("ProfileScreen")
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
                setProfile(false)
                setHome(false)
                setAccount(true)
                props.navigation.navigate("AccountSetting")
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

              <Text style={{ color: account ? "black" : "gray" }}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
const mapStateToProps = state => {
  const { app } = state
  return { app }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      actionSignup
    },
    dispatch
  )

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
  }
})

export default HomeScreen
