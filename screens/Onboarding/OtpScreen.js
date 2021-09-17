import React from "react"
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

const OTPScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.forgotStyling}>
        Please Enter {"\n"}
        The Code{" "}
      </Text>

      <View>
        <OTPInputView
          code="123456"
          style={{ width: "80%", height: 200 }}
          pinCount={4}
          codeInputFieldStyle={styles.underlineStyleBase}
        />
      </View>

      <TouchableOpacity
        style={styles.continueTextButtonStyle}
        onPress={() => navigation.navigate("RecoverPassword")}
      >
        <Text style={styles.continueTextColor}> {strings.continue} </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotScreen")}>
        <Text style={styles.resendCodeStyling}>{strings.resendCode}</Text>
      </TouchableOpacity>
    </View>
  )
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
    borderBottomWidth: 3
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
    fontWeight: "100",
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
