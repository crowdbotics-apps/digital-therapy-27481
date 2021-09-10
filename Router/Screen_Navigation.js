import React from "react"
import { Button, TouchableOpacity, Image, View } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"

import SplashScreen from "../screens/Onboarding/SplashScreen"
import LoginScreen from "../screens/Onboarding/LoginScreen"
import SignupScreen from "../screens/Onboarding/SignupScreen"

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
    </Stack.Navigator>
  )
}
export default App
