import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native"
import Theme from "../../Styles/Theme"
import Icon from "react-native-vector-icons/MaterialIcons"
import strings from "../../Localization"
import { BaseURL, GET_HEADER } from "../../Connection"
import Toast from "react-native-toast-message"
import axios from "axios"
const RecoverPassword = props => {
  console.warn(props.route.params.code)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.fStyle}>{strings.createNewPassowrd} </Text>

      <View>
        <Text style={styles.textStyle}>{strings.typeInPassword}</Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          // flexDirection: "row",
          justifyContent: "center",
          flex: 0.8
        }}
      >
        {/* Password */}
        <View style={styles.inputStyle}>
          <Icon name="lock" size={18} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor={Theme.PlaceHolderTextColor}
            onChangeText={text => {
              setPassword(text)
            }}
          />
        </View>
        {/* Confirm Password */}
        <View style={styles.inputStyle}>
          <Icon name="lock" size={18} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry
            placeholderTextColor={Theme.PlaceHolderTextColor}
            onChangeText={text => {
              setConfirmPassword(text)
            }}
          />
        </View>
      </View>
      <View style={styles.signInBackground}>
        <TouchableOpacity
          style={styles.signInTextBackground}
          onPress={() => {
            if (checkValidation()) {
              recoverPassword()
            }
          }}
        >
          <Text style={styles.signInColorTextBackground}>
            {" "}
            {strings.changePassword}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  function checkValidation() {
    if (password == "") {
      Toast.show({
        type: "success",
        text1: "Enter new password",
        position: "bottom",
        visibilityTime: 3000
      })
      return false
    } else if (confirmPassword == "") {
      Toast.show({
        type: "success",
        text1: "Enter confirm password",
        position: "bottom",
        visibilityTime: 3000
      })
      return false
    } else if (password != confirmPassword) {
      Toast.show({
        type: "success",
        text1: "Password mismatch ",
        position: "bottom",
        visibilityTime: 3000
      })
      return false
    }
    return true
  }
  async function recoverPassword() {
    axios({
      method: "post",
      url: BaseURL.concat("/user/password_reset_confirm/"),
      headers: await GET_HEADER(),
      data: {
        token: props.route.params.code,
        password: password
      }
    })
      .then(res => {
        console.warn(res)
        // Toast.show({
        //   type: "success",
        //   text1: res.data,
        //   position: "bottom",
        //   visibilityTime: 3000
        // })
        // Toast.show({ text: res.data.message }, 3000)
      })
      .catch(function (error) {
        console.warn(error.response)
        Toast.show({
          type: "error",
          text1: error.response.data.non_field_errors[0],
          position: "bottom",
          visibilityTime: 3000
        })
      })
      .finally(() => {})
  }
}

const styles = StyleSheet.create({
  ViewStyle: {
    justifyContent: "center",
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  textInputStyle: { flex: 1, paddingLeft: 15, color: "black" },

  inputStyle: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: Theme.TEXTINPUT_BORDER_COLOR,
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    height: 50
  },
  fStyle: {
    marginHorizontal: 15,
    top: 70,
    color: Theme.THEME_COLOR,
    fontSize: 30,
    fontWeight: "bold"
  },

  textStyle: {
    marginTop: 100,
    marginHorizontal: 22,
    color: "grey"
  },

  emailStyle: {
    top: 50,
    borderBottomColor: "black",
    borderBottomWidth: 0.8,
    margin: 39
  },

  emailIconStyle: {
    top: 100,
    marginHorizontal: 40
  },

  emailTextStyle: {
    fontSize: 16,
    marginHorizontal: 50,
    bottom: 10
  },

  signInBackground: {
    backgroundColor: Theme.THEME_COLOR,
    height: 45,

    borderRadius: 6,
    marginHorizontal: 39
  },

  signInTextBackground: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  signInColorTextBackground: {
    fontSize: 16,
    color: "white"
    // fontWeight: "bold"
  }
})

export default RecoverPassword
