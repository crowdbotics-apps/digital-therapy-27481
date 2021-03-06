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
  TextInput as Input,
  KeyboardAvoidingView
} from "react-native"
import MainStyle from "../../Styles/ButtonStyle"
// import Button from '../../src/component/Button';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import axios from "axios"

import Theme from "../../Styles/Theme"
import strings from "../../Localization"
import { actionSignup } from "../../Actions/index"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin"

import { connect, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { BaseURL, Header, SET_TOKEN } from "../../Connection/index"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"
import Toast from "react-native-toast-message"
import HeaderWhite from "../../Component/HeaderWhite"
import { login } from "../../features/user"

function SignupScreen(props) {
  const [email, setEmail] = useState("")
  const [lastname, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  // const [googleSignedIn, setGoogleSignIn] = useState(false)
  // const [checkingLoggedIn, setCheckingLoggedIn] = useState(false)
  // const [submittingGoogle, setSubmittingGoogle] = useState(false)
  // const [submittingFacebook, setSubmittingFacebook] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const [emailError, setEmailError] = useState(false)
  const [passError, setPasswordError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [confirmPassError, setConfirmPassError] = useState(false)
  const [invite_code, setInviteCode] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    // checkLoggedin()
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Theme.THEME_WHITE }}
      behavior="padding"
      // keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <HeaderWhite
            text="Sign up"
            onPress={() => {
              props.navigation.goBack()
            }}
            hideIcon
            navigation={props.navigation}
          />
          <View style={[Styles.ViewStyle, { flex: 0.3, alignSelf: "center" }]}>
            <Text style={MainStyle.textStyleHeading}>{strings.signup}</Text>
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
            {/* name */}
            <View style={Styles.inputStyle}>
              <Icon name="account-circle" size={18} />
              <Input
                style={Styles.textInputStyle}
                placeholder="Name"
                autoCapitalize="none"
                onChangeText={text => {
                  setName(text)
                }}
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
            </View>
            {/* last name */}
            <View style={Styles.inputStyle}>
              <Icon name="account-circle" size={18} />
              <Input
                style={Styles.textInputStyle}
                placeholder="Last Name"
                autoCapitalize="none"
                onChangeText={text => {
                  setLastName(text)
                }}
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
            </View>
            {/* name */}
            <View style={Styles.inputStyle}>
              <Icon name="account-circle" size={18} />
              <Input
                style={Styles.textInputStyle}
                placeholder="Age"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={text => {
                  setAge(text)
                }}
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
            </View>
            {/* Email */}
            <View style={Styles.inputStyle}>
              <Icon name="alternate-email" size={18} />
              <Input
                style={Styles.textInputStyle}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={text => {
                  setEmail(text)
                }}
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
            </View>
            {/* Location */}
            <View style={Styles.inputStyle}>
              <Icon name="location-on" size={18} />
              <Input
                style={Styles.textInputStyle}
                placeholder="Location"
                autoCapitalize="none"
                onChangeText={text => {
                  setLocation(text)
                }}
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
            </View>
            <View style={Styles.inputStyle}>
              <Icon name="lock" size={18} />

              <Input
                style={Styles.textInputStyle}
                placeholder="Password"
                secureTextEntry={hidePassword}
                onChangeText={text => {
                  setPassword(text)
                }}
                autoCapitalize="none"
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
              <TouchableOpacity
                style={{ padding: 10 }}
                onPressIn={() => {
                  setHidePassword(false)
                }}
                onPressOut={() => setHidePassword(true)}
              >
                <Icon name="visibility" size={18} />
              </TouchableOpacity>
            </View>
            <View style={Styles.inputStyle}>
              <Icon name="lock" size={18} />

              <Input
                style={Styles.textInputStyle}
                placeholder="Confirm Password"
                secureTextEntry={hideConfirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text)
                }}
                autoCapitalize="none"
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
              <TouchableOpacity
                style={{ padding: 10 }}
                onPressIn={() => setHideConfirmPassword(false)}
                onPressOut={() => setHideConfirmPassword(true)}
              >
                <Icon name="visibility" size={18} />
              </TouchableOpacity>
            </View>
            {/* Invite Code */}
            <View style={Styles.inputStyle}>
              <Icon name="code" size={18} />
              <Input
                style={Styles.textInputStyle}
                placeholder="Invite code"
                autoCapitalize="none"
                onChangeText={text => {
                  setInviteCode(text)
                }}
                placeholderTextColor={Theme.PlaceHolderTextColor}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                flex: 0.2,
                marginVertical: 5
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!submitting) {
                    if (
                      email != "" &&
                      age != "" &&
                      location != "" &&
                      name != "" &&
                      lastname != "" &&
                      password != "" &&
                      confirmPassword != ""
                    ) {
                      if (password == confirmPassword) {
                        register()
                      } else {
                        Toast.show({
                          type: "error",
                          text1: "Password does not match",
                          visibilityTime: 3000,
                          position: "bottom"
                        })
                      }
                    } else {
                      Toast.show({
                        type: "error",
                        text1: "Input all fields",
                        visibilityTime: 3000,
                        position: "bottom"
                      })
                    }
                  }
                  // this.props.navigation.navigate('Dashboard');
                }}
                info
                style={MainStyle.button}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={{ textAlign: "center", color: "white" }}>
                    {strings.signup}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )

  function register() {
    if (validateEmail(email)) {
      if (password != "") {
        var self = this
        setSubmitting(true)
        var data = {
          email: email,
          password: password,
          first_name: name,
          last_name: lastname,
          age: age,
          location: location
        }
        if (invite_code != "") {
          data["invite_code"] = invite_code
        }

        axios({
          method: "post",
          url: BaseURL.concat("/signup/"),
          data: data,
          headers: Header
        })
          .then(res => {
            signIn(email, password)
            // console.warn(res)
            // console.SET_TOKEN(res.data.token)
            // // console.warn(GET_TOKEN())
            // dispatch(login(res.data))
            // // self.props.actionSignup("user", res.data.data[0])
            // saveUser(res.data)
            // self.props.navigation.replace('Dashboard');

            // Toast.show({ text: res.data.message }, 3000)
          })
          .catch(function (error) {
            console.warn(error.response)
            Toast.show({
              type: "error",
              text1: error.response.data.email[0],
              position: "bottom",
              visibilityTime: 3000
            })
            setLoading(false)
          })
          .finally(() => {
            setSubmitting(false)
          })
      } else {
        setPasswordError(true)
        Toast.show({
          type: "error",
          text1: "Enter Password",
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
  function signIn(email, password) {
    if (validateEmail(email)) {
      if (password != "") {
        var self = this
        setSubmitting(true)

        axios({
          method: "post",
          url: BaseURL.concat("/login/"),
          data: { username: email, password: password },
          headers: Header
        })
          .then(res => {
            console.warn(res.data)
            SET_TOKEN(res.data.token)
            dispatch(login(res.data))

            // self.props.actionSignup("user", res.data.data[0])
            saveUser(res.data)

            Toast.show({
              type: "success",
              text1: "Login successful",
              position: "bottom",
              visibilityTime: 3000
            })
            // Toast.show({ text: res.data.message }, 3000)
          })
          .catch(function (error) {
            console.warn(error.response.data.non_field_errors[0])
            Toast.show({
              type: "error",
              text1: error.response.data.non_field_errors[0],
              position: "bottom",
              visibilityTime: 3000
            })
            setLoading(false)
          })
          .finally(() => {
            setSubmitting(false)
          })
      } else {
        setPasswordError(true)
        Toast.show({
          text1: "Something went wrong",
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
        type: "error",
        text1: "Input valid email",
        visibilityTime: 3000,
        position: "bottom"
      })
      setEmailError(true)
      return false
    } else {
      setEmailError(false)
      return true
    }
  }

  function saveUser(data) {
    storage.save({
      key: "loginState", // Note: Do not use underscore("_") in key!
      data,
      // if not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    })
    //
    storage
      .load({
        key: "loginState"
      })
      .then(ret => {
        console.warn(ret)
        // found data goes to then()
        // self.props.actionSignup("user", ret)
        // props.navigation.replace("HomeScreen")
        props.navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }]
        })
        // self.props.actionSignup('profileStatus', ret.ProfileStatus);
        Toast.show({
          type: "success",
          text1: "Registration successful",
          position: "bottom",
          visibilityTime: 3000
        })
      })
      .catch(err => {
        console.warn(err)
        // any exception including data not found
        // goes to catch()
        //  console.warn(err.messagce);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            break
          case "ExpiredError":
            // TODO
            break
        }
      })
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
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "95%",
    alignSelf: "flex-start",
    height: 50
  },
  textInputStyle: { flex: 1, paddingLeft: 15 },
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
