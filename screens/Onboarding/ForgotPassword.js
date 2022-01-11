import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  SegmentedControlIOSComponent,
  ActivityIndicator
} from "react-native"
import Theme from "../../Styles/Theme"
import Icon from "react-native-vector-icons/MaterialIcons"
import strings from "../../Localization"
import { url, BaseURL, GET_HEADER } from "../../Connection"
import Toast from "react-native-toast-message"
import axios from "axios"
import HeaderWhite from "../../Component/HeaderWhite"

const ForgotScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderWhite
        text="Forgot password"
        onPress={() => {
          navigation.goBack()
        }}
        hideIcon
        navigation={navigation}
      />
      <View
        style={{
          flex: 0.4,
          justifyContent: "center"
        }}
      >
        <Text style={styles.fStyle}> Forgot Password? </Text>
        <Text style={styles.textStyle}>
          If you need any help resetting your {"\n"}password, we can help by
          sending you a {"\n"}code to reset it.
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          // flexDirection: "row",
          justifyContent: "center",
          flex: 0.4
        }}
      >
        {/* Email */}
        <View style={styles.inputStyle}>
          <Icon name="alternate-email" size={18} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Theme.PlaceHolderTextColor}
            onChangeText={text => {
              setEmail(text)
            }}
            value={email}
          />
        </View>
      </View>
      <View style={styles.signInBackground}>
        <TouchableOpacity
          style={styles.signInTextBackground}
          onPress={() => {
            if (!loading) {
              sendOTP()
            }
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Theme.THEME_WHITE} />
          ) : (
            <Text style={styles.signInColorTextBackground}>
              {" "}
              {strings.sent}{" "}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )

  async function sendOTP() {
    setLoading(true)
    axios({
      method: "post",
      url: url.concat("/rest-auth/password/reset/"),
      headers: await GET_HEADER(),
      data: {
        email: email
      }
    })
      .then(res => {
        navigation.navigate("OTPScreen", { email })
        Toast.show({
          type: "success",
          text1: res.data.detail,
          position: "bottom",
          visibilityTime: 3000
        })
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
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)

        setSubmitting(false)
      })
  }
}

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    height: 50
  },
  fStyle: {
    marginHorizontal: 15,

    color: Theme.THEME_COLOR,
    fontSize: 30,
    fontWeight: "bold"
  },

  textStyle: {
    marginTop: 30,
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
    marginTop: 75,
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
  textInputStyle: { flex: 1, paddingLeft: 15, color: "black" },

  signInColorTextBackground: {
    fontSize: 16,
    color: "white"
    // fontWeight: "bold"
  }
})

export default ForgotScreen
