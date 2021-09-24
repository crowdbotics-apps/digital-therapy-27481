import React, { Component } from "react"
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native"

import strings from "../../Localization"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { actionLogin } from "../../Actions/index"
import MainStyle from "../../Styles/ButtonStyle"

import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
class SplashScreen extends Component {
  constructor(props) {
    super(props)

    global.Token = ""
    this.state = { submitting: false }
  }

  componentDidMount() {
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
    setTimeout(() => {
      // this.props.navigation.replace('LoginScreen');
    }, 2500)
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/splash_back.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={{ flex: 0.3, width: "100%", justifyContent: "center" }}>
          <View
            style={{
              justifyContent: "center",
              flex: 0.2
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("LoginScreen")
              }}
              info
              style={[MainStyle.button, { width: "80%" }]}
            >
              {this.state.submitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ textAlign: "center", color: "white" }}>
                  {strings.getstarted}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = state => {
  const { LoginReducer } = state
  return { LoginReducer }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ actionLogin }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
