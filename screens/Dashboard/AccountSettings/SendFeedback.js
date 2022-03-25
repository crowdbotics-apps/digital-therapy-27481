import React, { useEffect, useState, Component } from "react"
import {
  View,
  PlatView,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  TextInput as Input
} from "react-native"
import MainStyle from "../../../Styles/ButtonStyle"
// import Button from '../../src/component/Button';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import axios from "axios"

import Theme from "../../../Styles/Theme"
import strings from "../../../Localization"
import { actionSignup } from "../../../Actions/index"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  BaseURL,
  GET_HEADER,
  Header,
  SET_TOKEN
} from "../../../Connection/index"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"
import Toast from "react-native-toast-message"
import HeaderWhite from "../../../Component/HeaderWhite"
import { useSelector } from "react-redux"
function SendFeedback(props) {
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const userState = useSelector(state => state.user.value)
  useEffect(() => {
    // checkLoggedin()
  })

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-evenly",
        backgroundColor: Theme.THEME_WHITE
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <HeaderWhite
          text="Send Feedback"
          hideIcon
          onPress={() => {
            props.navigation.goBack()
          }}
        />
        <View style={[Styles.ViewStyle, { flex: 0.3, alignSelf: "center" }]}>
          <Text style={MainStyle.textStyleHeading}>Send Feedback</Text>
          {/* <Image
              source={require('../../assets/logo.png')}
              style={Styles.logoStyle}
              resizeMode="contain"
            /> */}
        </View>
        <View
          style={[
            Styles.ViewStyle,
            {
              justifyContent: "flex-start",
              flex: 0.7
            }
          ]}
        >
          <Text>Email</Text>
          <View style={Styles.inputStyle}>
            <Input
              style={[Styles.textInputStyle, { color: Theme.THEME_COLOR }]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text)
              }}
              placeholderTextColor={Theme.PlaceHolderTextColor}
            />
          </View>
          <Text>Content</Text>
          <View style={Styles.inputStyle}>
            <Input
              style={[
                Styles.textInputStyle,
                { height: 150, color: Theme.THEME_COLOR }
              ]}
              multiline
              textAlign="left"
              textAlignVertical="top"
              placeholder="Type your feedback here"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => {
                setFeedback(text)
              }}
              blurOnSubmit
              placeholderTextColor={Theme.PlaceHolderTextColor}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 0.2
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate("HomeScreen")

                if (!submitting) {
                  if (email != "") {
                    sendFeedback(email)
                  } else {
                    Toast.show({
                      text1: "Input email address ",
                      position: "bottom",
                      visibilityTime: 3000
                    })
                  }
                }
              }}
              info
              style={MainStyle.button}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ textAlign: "center", color: "white" }}>
                  Send
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )

  async function sendFeedback() {
    if (validateEmail(email)) {
      var self = this

      if (feedback != "") {
        setSubmitting(true)
        axios({
          method: "post",
          url: BaseURL.concat("/feedback/"),
          data: {
            email: email,
            content: feedback,
            user: userState.user.id
          },
          headers: await GET_HEADER()
        })
          .then(res => {
            Toast.show({
              text1: "Feedback submitted",
              text2: "Thank you, your feedback has been submitted.",
              position: "bottom",
              visibilityTime: 3000,
              type: "success"
            })
            console.warn(res)
            // self.props.navigation.replace('Dashboard');

            // Toast.show({ text: res.data.message }, 3000)
          })
          .catch(function (error) {
            console.warn(error.response)
            Toast.show({
              type: "error",
              text1: "Something went wrong",
              position: "bottom",
              visibilityTime: 3000
            })
            setLoading(false)
          })
          .finally(() => {
            setSubmitting(false)
          })
      } else {
        Toast.show({
          text1: "Input feedback content",
          position: "bottom",
          visibilityTime: 3000
        })
      }
    } else {
      Toast.show({
        text1: "Input valid email address",
        position: "bottom",
        visibilityTime: 3000
      })
    }
  }
  function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      Toast.show({
        text1: "Input valid email address",
        position: "bottom",
        visibilityTime: 3000
      })

      return false
    } else {
      return true
    }
  }
  function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      Toast.show({
        text1: "Input valid email",
        buttonText: "Okay",
        visibilityTime: 3000,
        position: "top"
      })
      return false
    } else {
      return true
    }
  }
}

const Styles = StyleSheet.create({
  ImageContainer: { flex: 0.3, justifyContent: "center", alignItems: "center" },
  logoStyle: { width: 100, height: 100 },
  ViewStyle: {
    justifyContent: "center",
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  inputStyle: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: Theme.TEXTINPUT_BORDER_COLOR,
    // borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "100%",
    alignSelf: "flex-start",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  textInputStyle: { flex: 1, paddingLeft: 15, minHeight: 50 },
  lineStyle: {
    flex: 1,
    backgroundColor: "black",
    height: 1,
    width: "100%"
  },
  socialButton: {
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10
  }
})
const mapStateToProps = state => {
  const { MainReducer } = state
  return { MainReducer }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      actionSignup
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback)
