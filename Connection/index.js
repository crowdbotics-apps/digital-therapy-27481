// export const BaseURL = 'http://160.153.251.84/CMS/';

import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
const baseurl = "https://digital-therapy-27481.botics.co"
const api_url = "/api/v1"
var userToken = ""

export const BaseURL = baseurl + api_url

export const Header = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: userToken != "" ? "Token " + userToken : ""
}

export const SET_TOKEN = token => {
  userToken = token
}
export const GET_TOKEN = token => {
  return userToken
}
