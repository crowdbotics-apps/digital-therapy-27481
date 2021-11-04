// export const BaseURL = 'http://160.153.251.84/CMS/';

import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
export const url = "https://digital-therapy-27481.botics.co"
const api_url = "/api/v1"
var userToken = ""
export const FB_APPID = "467358747803961"
export const GET_HEADER = () => {
  return storage
    .load({
      key: "loginState"
    })
    .then(ret => {
      console.warn(ret.key)
      // self.props.actionSignup("user", ret)
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + ret.token
      }
    })
    .catch(err => {
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ""
      }
      // console.warn(err)
      console.warn(err)
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

export const BaseURL = url + api_url

export const Header = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: userToken != "" ? "Token " + userToken : ""
}

export const SET_TOKEN = token => {
  userToken = token
  return userToken
}
export const GET_TOKEN = token => {
  return userToken
}
