import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native"
import OTPInputView from "@twotalltotems/react-native-otp-input"
import Theme from "../../Styles/Theme"
import strings from "../../Localization"
import Toast from "react-native-toast-message"
import axios from "axios"
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
  SET_TOKEN,
  GET_TOKEN,
  GET_HEADER
} from "../../Connection/index"
import HeaderWhite from "../../Component/HeaderWhite"

const OTPScreen = props => {
  const [code, setCode] = useState("")
  console.warn(props.route.params.email)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderWhite
        text="OTP"
        onPress={() => {
          props.navigation.goBack()
        }}
        hideIcon
        navigation={props.navigation}
      />
      <Text style={styles.forgotStyling}>
        Please Enter {"\n"}
        The Code{" "}
      </Text>

      <View>
        <OTPInputView
          style={{ width: "80%", height: 200, color: "black" }}
          pinCount={6}
          code={code}
          codeInputFieldStyle={styles.underlineStyleBase}
          placeholderTextColor={Theme.PlaceHolderTextColor}
          onCodeChanged={code => {
            setCode(code)
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.continueTextButtonStyle}
        onPress={() => {
          if (code.length == 6) {
            VerifyOtp()
          } else {
            Toast.show({
              text1: "Enter complete code to continue",
              visibilityTime: 3000,
              position: "bottom"
            })
          }
        }}
      >
        <Text style={styles.continueTextColor}> {strings.continue} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("ForgotScreen")}
      >
        <Text style={styles.resendCodeStyling}>{strings.resendCode}</Text>
      </TouchableOpacity>
    </View>
  )
  async function VerifyOtp() {
    axios({
      method: "POST",
      url: BaseURL.concat("/user/verify_token/"),
      headers: await GET_HEADER(),
      data: {
        token: code,
        email: props.route.params.email
      }
    })
      .then(res => {
        props.navigation.navigate("RecoverPassword", {
          code,
          email: props.route.params.email
        })
        // dispatch(actionCategories(res.data.results))
      })
      .catch(function (error) {
        console.warn(error.response)
        Toast.show({
          type: "error",
          text1: error.response?.data?.[0],
          position: "bottom",
          visibilityTime: 3000
        })
      })
      .finally(() => {
        // setSubmitting(false)
      })
  }
}

const styles = StyleSheet.create({
  forgotStyling: {
    marginHorizontal: 20,
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: Theme.THEME_COLOR
  },
  underlineStyleBase: {
    left: 35,
    width: 35,
    height: 45,
    borderBottomColor: "black",
    borderWidth: 0,
    borderBottomWidth: 3,
    color: "black"
  },

  continueTextButtonStyle: {
    backgroundColor: Theme.THEME_COLOR,
    height: 45,
    borderRadius: 5,
    margin: 30,
    bottom: 30
  },

  continueTextColor: {
    fontSize: 20,
    color: "white",
    // fontWeight: "100",
    flexDirection: "row",
    alignSelf: "center",
    right: 10,
    top: 10
  },

  resendCodeStyling: {
    fontSize: 15,
    fontWeight: "bold",
    color: Theme.THEME_COLOR,
    flexDirection: "row",
    alignSelf: "center"
  }
})

export default OTPScreen
