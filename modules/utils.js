import React, { useState } from "react"
import { StyleSheet, View, Text, StatusBar } from "react-native"
import ScreenNavigation from "../Router/Screen_Navigation"
import Toast from "react-native-toast-message"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import userReducer from "./../features/user"
import { SafeAreaView } from "react-native-safe-area-context"
import { Settings } from "react-native-fbsdk-next"
import { FB_APPID, BaseURL, GET_HEADER } from "../Connection/index"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin"
import OneSignal from "react-native-onesignal"
import axios from "axios"
import { useSelector } from "react-redux"

const YourApp = () => {
  const [loading, setLoading] = useState(false)
  Settings.setAppID(FB_APPID)
  Settings.initializeSDK()
  const userState = useSelector(state => state.user.value)

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "712223643970-odeo0avjej6ce77j3lku1fof63295ak1.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: "", // specifies a hosted domain restriction
    loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: "" // [Android] specifies an account name on the device that should be used
    // iosClientId: "<FROM DEVELOPER CONSOLE>" // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  })

  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0)
  OneSignal.setAppId("8423fa99-5ce7-4aa6-97ba-f9b3435c159e")
  //END OneSignal Init Code
  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log("Prompt response:", response)
  })

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        "OneSignal: notification will show in foreground:",
        notificationReceivedEvent
      )
      let notification = notificationReceivedEvent.getNotification()
      console.log("notification: ", notification)
      const data = notification.additionalData
      console.log("additionalData: ", data)
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification)
    }
  )

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification)
  })

  return (
    <View style={styles.container}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <View style={styles.StatusBar}>
        <StatusBar barStyle="dark-content" backgroundColor="#000" />
      </View>
      <ScreenNavigation />
      {/* </SafeAreaView> */}
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100
    // padding: 13
  },
  text: {
    fontSize: 20
  },
  StatusBar: {
    height: 50,
    backgroundColor: "white"
  }
})

const YourAppModule = {
  title: "Digital Therapy",
  navigator: YourApp
}

const sortNavigators = (a, b) => {
  if (a.hasOwnProperty("navigator") && b.hasOwnProperty("navigator")) {
    return 0
  } else if (a.hasOwnProperty("navigator")) {
    return -1
  } else {
    return 1
  }
}

const sortMenu = (a, b) => {
  if (a.title == "App Menu") {
    return -1
  } else {
    return 0
  }
}

const validate = (mod, prop) => {
  return mod.hasOwnProperty(prop)
}

export const getModules = manifest => {
  let modules = []
  for (const [name, definition] of Object.entries(manifest)) {
    if (definition && validate(definition, "title")) {
      modules.push(definition)
    } else {
      let title = name.replace(/([A-Z])/g, " $1")
      title = title.charAt(0).toUpperCase() + title.slice(1)
      modules.push({
        title: title,
        navigator: definition
      })
    }
  }
  modules = modules.sort(sortNavigators)
  modules = modules.sort(sortMenu)
  if (!(modules.length && modules[0].hasOwnProperty("navigator"))) {
    modules.splice(0, 0, YourAppModule)
  }
  return modules
}

export function getPropertyMap(source, prop) {
  let map = {}
  source.map(mod => {
    if (mod[prop]) {
      map[mod.title] = mod[prop]
    }
  })
  return map
}
