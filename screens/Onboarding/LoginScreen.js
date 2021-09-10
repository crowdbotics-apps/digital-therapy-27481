import React, { Component } from "react"
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
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import axios from "axios"

import Theme from "../../Styles/Theme"
import strings from "../../Localization"
import { actionSignup } from "../../Actions/index"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-community/google-signin"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  BaseURL,
  Header,
  iosConfig,
  androidConfig
} from "../../Connection/index"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"
import Toast from "react-native-toast-message"
class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      loading: false,
      submitting: false,
      googleSignedIn: false,
      checkingLoggedIn: true,
      submittingGoogle: false,
      submittingFacebook: false,
      hidePassword: true
    }
  }
  componentDidMount() {
    var self = this
    GoogleSignin.configure()
    GoogleSignin.isSignedIn().then(data => {
      self.setState({ googleSignedIn: data })
    })
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
    this.checkLoggedin()
  }
  checkLoggedin = () => {
    var self = this
    storage
      .load({
        key: "loginState"
      })
      .then(ret => {
        self.props.actionSignup("user", ret)
        // self.setState({checkingLoggedIn: false});
        self.props.navigation.replace("Dashboard")
      })
      .catch(err => {
        self.setState({ checkingLoggedIn: false })
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
  render() {
    if (this.state.checkingLoggedIn) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
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
                  this.setState({ email: text })
                }}
                style={Styles.textInputStyle}
              />
            </View>
            <View style={Styles.inputStyle}>
              <Icon name="lock" size={18} />

              <Input
                style={Styles.textInputStyle}
                placeholder="Password"
                secureTextEntry={this.state.hidePassword}
                onChangeText={text => {
                  this.setState({ password: text })
                }}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{ padding: 10 }}
                onPressIn={() => this.setState({ hidePassword: false })}
                onPressOut={() => this.setState({ hidePassword: true })}
              >
                <Icon name="visibility" size={18} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.navigate("ForgotPassword")
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
                  // if (!this.state.submitting) {
                  //   if (this.state.email != "") {
                  //     this.signIn(this.state.email)
                  //   } else {
                  //     Toast.show({
                  //       text1: "Input email address ",
                  //       position: "bottom",
                  //       visibilityTime: 3000
                  //     })
                  //   }
                  // }
                  // this.props.navigation.navigate('Dashboard');
                }}
                info
                style={MainStyle.button}
              >
                {this.state.submitting ? (
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
                    this.signUpFacebook()
                  }}
                >
                  {this.state.submittingFacebook ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                  }}
                >
                  {this.state.submittingFacebook ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                    this.signUpFacebook()
                  }}
                >
                  {this.state.submittingFacebook ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                    this.props.navigation.navigate("SignupScreen")
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
  }
  validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      Toast.show({
        text1: "Input valid email address",
        position: "bottom",
        visibilityTime: 3000
      })
      this.setState({ emailError: true })
      return false
    } else {
      this.setState({ emailError: false })

      return true
    }
  }
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      this.props.actionSignup("user", "")
      this.setState({ googleSignedIn: false }) // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error)
    }
  }
  signUpGoogle = async () => {
    var self = this
    self.setState({ submittingGoogle: true })
    try {
      await GoogleSignin.hasPlayServices()

      const userInfo = await GoogleSignin.signIn()
      console.warn(userInfo)
      axios({
        method: "post",
        url: BaseURL.concat("api/ShoeCleaning/Signup?IsSocial=true"),
        data: {
          Name: userInfo.user.name,
          Email: userInfo.user.email,
          Password: userInfo.user.id,
          PhoneNumber: "",
          UserAddresses: [],
          isSocial: true,
          socialId: userInfo.user.id
        },
        headers: Header
      })
        .then(function (response) {
          if (response.data.success) {
            self.props.actionSignup("user", response.data.data[0])
            self.saveUser(response.data.data[0])
            // self.props.navigation.replace('Dashboard');
          } else {
            Toast.show({
              text1: response.data.message,
              position: "bottom",
              visibilityTime: 3000
            })
          }
        })
        .catch(function (error) {
          console.warn(error)
          Toast.show({
            text1: "Network Error",
            position: "bottom",
            visibilityTime: 3000
          })
          self.setState({ loading: false })
        })
        .finally(() =>
          self.setState({ submitting: false, submittingGoogle: false })
        )
    } catch (error) {
      console.warn(error)
      self.setState({ submittingGoogle: false })
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

  saveUser(data) {
    var self = this
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
        self.props.actionSignup("user", ret)
        self.props.navigation.replace("Dashboard")
        // self.props.actionSignup('profileStatus', ret.ProfileStatus);
        Toast.show({
          text1: "Login successful",
          position: "bottom",
          visibilityTime: 3000
        })
      })
      .catch(err => {
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
  signIn(email) {
    if (this.validateEmail(email)) {
      if (this.state.password != "") {
        var self = this
        self.setState({ submitting: true })
        axios({
          method: "get",
          url: BaseURL.concat(
            "api/ShoeCleaning/SignIn?Email=" +
              email +
              "&Password=" +
              this.state.password
          ),
          params: {
            Email: email,
            Password: this.state.password
          },
          headers: Header
        })
          .then(res => {
            if (res.data.success) {
              console.warn(res.data)
              self.props.actionSignup("user", res.data.data[0])
              self.saveUser(res.data.data[0])
              // self.props.navigation.replace('Dashboard');
            } else {
              Toast.show({
                text1: "Login successful",
                position: "bottom",
                visibilityTime: 3000
              })
              Toast.show({ text: res.data.message }, 3000)
            }
          })
          .catch(function (error) {
            console.warn(error)
            Toast.show({ text: "Network Error", duration: 4000 })

            self.setState({ loading: false })
          })
          .finally(() => self.setState({ submitting: false }))
      } else {
        this.setState({ passError: true })
        Toast.show({
          text: "Enter Password",
          buttonText: "Okay",
          duration: 3000
        })
      }
    } else {
      Toast.show({ text: "Email is invalid" }, 3000)
    }
  }
  signUpFacebook() {
    // var self = this;
    // self.setState({submittingFacebook: true});
    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       console.warn('Login cancelled');
    //       self.setState({submittingFacebook: false});
    //     } else {
    //       AccessToken.getCurrentAccessToken().then(data => {
    //         self.initUser(data.accessToken);
    //       });
    //     }
    //   },
    //   function (error) {
    //     console.warn('Login fail with error: ' + error);
    //   },
    // );
  }

  initUser(token) {
    var self = this
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
        token
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        var self = this

        axios({
          method: "post",
          url: BaseURL.concat("api/ShoeCleaning/Signup?IsSocial=true"),
          data: {
            Name: json.name,
            Email: json.email,
            Password: json.id,
            PhoneNumber: "",
            UserAddresses: [],
            isSocial: true,
            socialId: json.id
          },
          headers: Header
        })
          .then(function (response) {
            if (response.data.success) {
              self.props.actionSignup("user", response.data.data[0])
              // self.props.navigation.replace('Dashboard');
              self.saveUser(response.data.data[0])
            } else {
              Toast.show({
                text: response.data.message,
                buttonText: "Okay",
                duration: 3000
              })
            }
          })
          .catch(function (error) {
            console.warn(error)
            Toast.show({
              text: "Network Error",
              buttonText: "Okay",
              duration: 3000
            })
            self.setState({ loading: false })
          })
          .finally(() =>
            self.setState({ submitting: false, submittingFacebook: false })
          )
      })
      .catch(() => {
        Toast.show({
          text: "ERROR GETTING DATA FROM FACEBOOK",
          buttonText: "Okay",
          duration: 3000
        })
        reject("ERROR GETTING DATA FROM FACEBOOK")
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
    alignItems: "center"
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
