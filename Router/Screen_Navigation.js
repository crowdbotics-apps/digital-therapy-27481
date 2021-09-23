import React from "react"
import { Button, TouchableOpacity, Image, View } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"

import SplashScreen from "../screens/Onboarding/SplashScreen"
import LoginScreen from "../screens/Onboarding/LoginScreen"
import SignupScreen from "../screens/Onboarding/SignupScreen"
import OtpScreen from "../screens/Onboarding/OtpScreen"
import ForgotScreen from "../screens/Onboarding/ForgotPassword"
import RecoverPassword from "../screens/Onboarding/RecoverPassword"
import HomeScreen from "../screens/Dashboard/HomeScreen"
import ProfileScreen from "../screens/Dashboard/ProfileScreen"
import NewConversation from "../screens/Dashboard/NewConversation"
import Camera from "../screens/Record/Camera"
import SelfVideos from "../screens/Dashboard/SelfVideos"
import SentVideos from "../screens/Dashboard/SentVideos"
import ReceivedVideos from "../screens/Dashboard/ReceivedVideos"
import InviteScreen from "../screens/Dashboard/InviteScreen"
import SpeakerScreen from "../screens/Dashboard/SpeakerScreen"
import GuideScreen from "../screens/Dashboard/GuideScreen"

const Stack = createStackNavigator()

function App() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupScreen"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OTPScreen"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotScreen"
        component={ForgotScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RecoverPassword"
        component={RecoverPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NewConversation"
        component={NewConversation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Camera"
        component={Camera}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SelfVideos"
        component={SelfVideos}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SentVideos"
        component={SentVideos}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ReceivedVideos"
        component={ReceivedVideos}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InviteScreen"
        component={InviteScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SpeakerScreen"
        component={SpeakerScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GuideScreen"
        component={GuideScreen}
      />
    </Stack.Navigator>
  )
}
export default App
