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
    </Stack.Navigator>
  )
}
export default App
