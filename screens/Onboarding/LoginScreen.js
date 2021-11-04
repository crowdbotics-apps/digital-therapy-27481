import React, { useEffect, Component, useState } from "react"
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
import MainStyle from "../../Styles/ButtonStyle"
// import Button from '../../src/component/Button';
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk-next"

import axios from "axios"

import Theme from "../../Styles/Theme"
import strings from "../../Localization"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin"
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation
} from "@invertase/react-native-apple-authentication"
import RNFirebaseAuth from "@react-native-firebase/auth"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { actionSignup } from "../../Actions/index"

import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig,
  SET_TOKEN,
  GET_TOKEN,
  GET_HEADER
} from "../../Connection/index"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"
import Toast from "react-native-toast-message"
import { createAction, OutputSelector } from "@reduxjs/toolkit"

import { useSelector, useDispatch } from "react-redux"
import { login } from "../../features/user"
function LoginScreen(props) {
  useEffect(() => {
    global.storage = new Storage({
      // maximum capacity, default 1000
      size: 1000,

      // Use AsyncStorage for RN, or window.localStorage for web.
      // If not set, data would be lost after reload.
      storageBackend: AsyncStorage,

      // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
      // can be null, which means never expire.
      defaultExpires: null,

      // cache data in the memory. default is true.
      enableCache: true,

      // if data was not found in storage or expired,
      // the corresponding sync method will be invoked and return
      // the latest data.
      sync: {
        // we'll talk about the details later.
      }
    })
    checkLoggedin()
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passError, setPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [googleSignedIn, setGoogleSignIn] = useState(false)
  const [checkingLoggedIn, setCheckingLoggedIn] = useState(false)
  const [submittingGoogle, setSubmittingGoogle] = useState(false)
  const [submittingFacebook, setSubmittingFacebook] = useState(false)
  const [submittingApple, setSubmittingApple] = useState(false)

  const [hidePassword, setHidePassword] = useState(true)
  const dispatch = useDispatch()

  if (checkingLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Theme.THEME_COLOR} />
      </View>
    )
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-evenly",
        backgroundColor: Theme.THEME_WHITE
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={[Styles.ViewStyle, { flex: 0.5 }]}>
          <Text style={MainStyle.textStyleHeading}>{strings.login}</Text>
          {/* <Image
            source={require('../../assets/logo.png')}
            style={Styles.logoStyle}
            resizeMode="contain"
          /> */}
        </View>
        <View style={[Styles.ViewStyle, { justifyContent: "flex-start" }]}>
          <View style={Styles.inputStyle}>
            <Icon name="alternate-email" size={18} />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text)
              }}
              style={Styles.textInputStyle}
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
              onPressIn={() => setHidePassword(false)}
              onPressOut={() => setHidePassword(true)}
            >
              <Icon name="visibility" size={18} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("ForgotScreen")
            }}
            style={{ alignItems: "flex-end", marginVertical: 20 }}
          >
            <Text style={MainStyle.textStyle}>{strings.forgotPassword}</Text>
          </TouchableOpacity>

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
                    signIn(email)
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
                  {strings.login}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 12, color: "gray", marginVertical: 10 }}>
              Or connect with
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={[Styles.socialButton]}
                onPress={() => {
                  signUpFacebook()
                }}
              >
                {submittingFacebook ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: Theme.LIGHT_GRAY,
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={require("../../assets/facebook.png")}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[Styles.socialButton]}
                onPress={() => {
                  // this.signUpFacebook();
                  signUpGoogle()
                }}
              >
                {submittingFacebook ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: Theme.LIGHT_GRAY,
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={require("../../assets/google.png")}
                        style={{ width: "80%", height: "80%" }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[Styles.socialButton]}
                onPress={() => {
                  // signUpFacebook()
                  onAppleSignin()
                }}
              >
                {submittingFacebook ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: Theme.LIGHT_GRAY,
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={require("../../assets/applelogo.png")}
                        style={{ width: "80%", height: "60%" }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
              }}
            >
              <Text style={{ fontSize: 14 }}>{strings.newCust}</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("SignupScreen")
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: Theme.THEME_COLOR,
                    marginLeft: 5
                  }}
                >
                  {strings.createAccount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )

  function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      Toast.show({
        text1: "Input valid email address",
        position: "bottom",
        visibilityTime: 3000
      })
      setEmailError(true)
      return false
    } else {
      setEmailError(false)

      return true
    }
  }
  async function signOut() {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      this.props.actionSignup("user", "")
      setGoogleSignIn(false)
      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error)
    }
  }
  async function signUpGoogle() {
    var self = this
    setSubmittingGoogle(true)
    try {
      await GoogleSignin.hasPlayServices()

      const userInfo = await GoogleSignin.signIn()

      console.log(userInfo.serverAuthCode)
      console.log("--------------userinfogoogle-----------")
      googleLogin(userInfo.serverAuthCode)
    } catch (error) {
      console.warn(error)
      setSubmittingGoogle(false)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
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
        // found data goes to then()
        // self.props.actionSignup("user", ret)
        props.navigation.replace("HomeScreen")
        // self.props.actionSignup('profileStatus', ret.ProfileStatus);
        Toast.show({
          text1: "Login successful",
          position: "bottom",
          visibilityTime: 3000
        })
      })
      .catch(err => {
        // console.warn(err)
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
  async function GetUserDetails() {
    axios({
      method: "get",
      url: BaseURL.concat("/user/get_user_profile/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        console.warn(res.data)
        var data = { token: GET_TOKEN(), user: res.data }
        dispatch(login(data))

        // self.props.actionSignup("user", res.data.data[0])
        saveUser(data)

        Toast.show({
          type: "success",
          text1: "Login successful",
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
        setSubmitting(false)
      })
  }
  function signIn(email) {
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
  function signUpFacebook() {
    setSubmittingFacebook(true)
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.warn("Login cancelled")
          setSubmittingFacebook(false)
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            initUser(data.accessToken)
          })
        }
      },
      function (error) {
        console.warn("Login fail with error: " + error)
      }
    )
  }

  function initUser(token) {
    // fetch(
    //   "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
    //     token
    // )
    //   .then(response => response.json())
    //   .then(json => {
    // Some user object has been set up somewhere, build that user here

    axios({
      method: "post",
      url: BaseURL.concat("/login/facebook/"),
      data: {
        access_token: token
      }
    })
      .then(async res => {
        SET_TOKEN(res.data.key)
        // // console.warn(GET_TOKEN())
        // dispatch(login(res.data))
        // // self.props.actionSignup("user", res.data.data[0])
        await storage.save({
          key: "loginState", // Note: Do not use underscore("_") in key!
          data: { token: res.data.key },
          expires: null
        })
        await GetUserDetails()
        // Toast.show({ text: res.data.message }, 3000)
      })
      .catch(function (error) {
        console.error(error.response)
        // Toast.show({
        //   type: "error",
        //   text1: error.response.data.email[0],
        //   position: "bottom",
        //   visibilityTime: 3000
        // })
        setLoading(false)
      })
      .finally(() => {
        setSubmitting(false)
      })
      .finally(() => {
        setSubmitting(false)
        setSubmittingFacebook(false)
      })
    // })
    // .catch(() => {
    //   Toast.show({
    //     text: "ERROR GETTING DATA FROM FACEBOOK",
    //     buttonText: "Okay",
    //     duration: 3000
    //   })
    //   reject("ERROR GETTING DATA FROM FACEBOOK")
    // })
  }
  function googleLogin(token) {
    axios({
      method: "post",
      url: BaseURL.concat("/login/google/"),
      data: {
        code: token
      }
    })
      .then(async res => {
        SET_TOKEN(res.data.key)
        // // console.warn(GET_TOKEN())
        // dispatch(login(res.data))
        // // self.props.actionSignup("user", res.data.data[0])
        await storage.save({
          key: "loginState", // Note: Do not use underscore("_") in key!
          data: { token: res.data.key },
          expires: null
        })
        await GetUserDetails()
        // Toast.show({ text: res.data.message }, 3000)
      })
      .catch(function (error) {
        console.warn(error.response)
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error?.response?.data?.non_field_errors?.[0],
          position: "bottom",
          visibilityTime: 3000
        })
        setLoading(false)
      })
      .finally(() => {
        setSubmitting(false)
      })
      .finally(() => {
        setSubmitting(false)
        setSubmittingFacebook(false)
      })
    // })
    // .catch(() => {
    //   Toast.show({
    //     text: "ERROR GETTING DATA FROM FACEBOOK",
    //     buttonText: "Okay",
    //     duration: 3000
    //   })
    //   reject("ERROR GETTING DATA FROM FACEBOOK")
    // })
  }
  function appleLogin(token) {
    setSubmittingApple(true)
    axios({
      method: "post",
      url: BaseURL.concat("/login/apple/"),
      data: {
        access_token: token
      }
    })
      .then(async res => {
        console.warn(res)
        SET_TOKEN(res.data.key)
        // // console.warn(GET_TOKEN())
        // dispatch(login(res.data))
        // // self.props.actionSignup("user", res.data.data[0])
        await storage.save({
          key: "loginState", // Note: Do not use underscore("_") in key!
          data: { token: res.data.key },
          expires: null
        })
        await GetUserDetails()
        // Toast.show({ text: res.data.message }, 3000)
      })
      .catch(function (error) {
        console.warn(error.response)
        // Toast.show({
        //   type: "error",
        //   text1: "error",
        //   text2: error.response.data.non_field_errors[0],
        //   position: "bottom",
        //   visibilityTime: 3000
        // })
        setLoading(false)
      })
      .finally(() => {
        setSubmitting(false)
      })
      .finally(() => {
        setSubmitting(false)
        setSubmittingApple(false)
      })
    // })
    // .catch(() => {
    //   Toast.show({
    //     text: "ERROR GETTING DATA FROM FACEBOOK",
    //     buttonText: "Okay",
    //     duration: 3000
    //   })
    //   reject("ERROR GETTING DATA FROM FACEBOOK")
    // })
  }
  function checkLoggedin() {
    var self = this
    storage
      .load({
        key: "loginState"
      })
      .then(ret => {
        // self.props.actionSignup("user", ret)
        SET_TOKEN(ret.token)
        dispatch(login(ret))
        props.navigation.replace("HomeScreen")
      })
      .catch(err => {
        // console.warn(err)
        console.warn(err)
        setCheckingLoggedIn(false)
        // any exception including data not found
        // goes to catch()
        //  console.warn(err.message);
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
  function loginWithApple(identityToken, nonce) {
    const appleCredential = RNFirebaseAuth.auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    )

    RNFirebaseAuth.auth()
      .signInWithCredential(appleCredential)
      .then(response => {
        console.log(response)

        appleLogin(response.access_token)
      })
      .catch(_error => {
        console.log(_error)
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          position: "bottom",
          visibilityTime: 3000
        })
      })
  }
  function onAppleSignin() {
    return new Promise(async (resolve, _reject) => {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL]
        })

        const { identityToken, nonce } = appleAuthRequestResponse
        console.log("identity token")
        console.log(appleAuthRequestResponse.identityToken)
        console.log("nonce")
        console.log(nonce)
        appleLogin(appleAuthRequestResponse.nonce)

        // loginWithApple(identityToken, nonce)
        // sending entire auth response to server in `fetch` request
        // const { ack, response } = await authFetch({
        //   uri: "/sign-in-with-apple",
        //   body: {
        //     ...appleAuthRequestResponse
        //   }
        // })
        // .then(async response => {
        //   response
        //   if (response?.user) {
        //     //handle successful login
        //     resolve({ success: true })
        //   } else {
        //     //handle unsuccessful login
        //     resolve({ success: false })
        //   }
        // })
      } catch (error) {
        console.log(error)
        resolve({ success: false })
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
