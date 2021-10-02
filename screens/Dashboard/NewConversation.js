import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import { getNavigationScreen } from "@screens"
import Theme from "../../Styles/Theme"
import DropDownPicker from "react-native-dropdown-picker"
import HeaderWhite from "../../Component/HeaderWhite"
import ButtonStyle from "../../Styles/ButtonStyle"

import { BaseURL, GET_HEADER } from "../../Connection/index"
import Toast from "react-native-toast-message"
import { useSelector, useDispatch } from "react-redux"
import {
  actionCategories,
  actionTopic,
  actionPersons
} from "../../features/conversation"

import axios from "axios"

// edited
function NewConversation(props) {
  const [home, setHome] = useState(false)

  const [account, setAccount] = useState(false)
  const [profile, setProfile] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryValue, setCategoryValue] = useState("")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [personValue, setPersonValue] = useState("")
  const [persons, setPersons] = useState([])
  const [personOpen, setPersonOpen] = useState(false)
  const [topic, setTopic] = useState("")

  const dispatch = useDispatch()

  // setValue = setValue.bind(this)

  //   setOpen(open) {
  //     setState({
  //       open
  //     })
  //   }

  //   setValue(callback) {
  //     setState(state => ({
  //       value: callback(state.value)
  //     }))
  //   }

  useEffect(() => {
    const networkCall = async () => {
      if (categories.length == 0) {
        await getCategories()
        await getPersons()
      }
    }
    networkCall()
  }, [])
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      style={styles.ScrollView_1}
    >
      <View style={{ flex: 1 }}>
        <HeaderWhite
          text="New Conversation"
          onPress={() => props.navigation.goBack()}
          hideIcon
          navigation={props.navigation}
        />

        <View
          style={{
            flex: 0.3,
            width: "90%",
            alignSelf: "center"
          }}
        >
          <View>
            <View style={styles.pickerContainerStyle}>
              <Text>Select category</Text>
              <DropDownPicker
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "white",
                  borderWidth: 0,
                  marginTop: 10,
                  elevation: 4,
                  borderRadius: 3
                }}
                textStyle={{ color: Theme.THEME_COLOR }}
                ArrowDownIconComponent={() => (
                  <Icon
                    name="keyboard-arrow-down"
                    color={Theme.THEME_COLOR}
                    size={25}
                  />
                )}
                ArrowUpIconComponent={() => (
                  <Icon
                    name="keyboard-arrow-up"
                    color={Theme.THEME_COLOR}
                    size={25}
                  />
                )}
                placeholder="Category"
                schema={{ label: "name", value: "id" }}
                open={categoryOpen}
                value={categoryValue}
                items={categories}
                setValue={setCategoryValue}
                setItems={setCategories}
                setOpen={setCategoryOpen}
                listMode="MODAL"
              />
            </View>
            <View style={styles.pickerContainerStyle}>
              <Text>Select Person</Text>
              <DropDownPicker
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "white",
                  borderWidth: 0,
                  marginTop: 10,
                  elevation: 4,
                  borderRadius: 3
                }}
                textStyle={{ color: Theme.THEME_COLOR }}
                ArrowDownIconComponent={() => (
                  <Icon
                    name="keyboard-arrow-down"
                    color={Theme.THEME_COLOR}
                    size={25}
                  />
                )}
                ArrowUpIconComponent={() => (
                  <Icon
                    name="keyboard-arrow-up"
                    color={Theme.THEME_COLOR}
                    size={25}
                  />
                )}
                // setItems={setCategories}
                placeholder="Persons"
                schema={{ label: "name", value: "id" }}
                open={personOpen}
                value={personValue}
                items={persons}
                setValue={setPersonValue}
                setItems={setPersons}
                setOpen={setPersonOpen}
                listMode="MODAL"
              />
            </View>
            <View style={styles.pickerContainerStyle}>
              <Text>Set Topic</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "white",
                  borderWidth: 0,
                  marginTop: 10,
                  elevation: 4,
                  borderRadius: 3,
                  color: Theme.THEME_COLOR,
                  fontSize: 16
                }}
                value={topic}
                placeholder="Please write down the topic"
                onChangeText={text => setTopic(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center"
              }}
            >
              <Text style={{ color: Theme.GRAY }}>Person is not on </Text>
              <Text style={{ fontStyle: "italic", color: Theme.GRAY }}>
                Resolve{"? "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("InviteScreen")
                }}
              >
                <Text style={{ color: Theme.THEME_COLOR, fontWeight: "bold" }}>
                  Invite them
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              // flex: 0.5,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => {
                console.warn(categoryValue)
                if (categoryValue != "" && personValue != "" && topic != "") {
                  props.navigation.navigate("Camera", {
                    data: {
                      categoryValue,
                      personValue,
                      topic,
                      argument: true,
                      createConversation: true
                    }
                  })
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Fill in all the fields",
                    position: "bottom",
                    visibilityTime: 3000
                  })
                }
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  backgroundColor: Theme.THEME_COLOR,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 20
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                ></View>
              </View>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 24,
                color: Theme.THEME_COLOR,
                marginTop: 10
              }}
            >
              Record video
            </Text>
          </View>
        </View>
        {/* <View style={{ marginVertical: 20, justifyContent: "center" }}>
          <TouchableOpacity style={ButtonStyle.button}>
            <Text style={{ color: "white" }}>Mark it as resolved</Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            // flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            marginBottom: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // flex: 0.8,
              height: 70,
              width: "85%",
              backgroundColor: "white",
              elevation: 5,
              borderBottomLeftRadius: 35,
              borderTopRightRadius: 35
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderBottomLeftRadius: 35,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: profile ? Theme.HOME_SELECTION : "white"
              }}
              onPress={() => {
                setProfile(true)
                setHome(false)
                setAccount(false)
                props.navigation.navigate("ProfileScreen")
              }}
            >
              <Image
                source={require("../../assets/profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: profile ? "black" : "gray"
                }}
              ></Image>
              <Text style={{ color: profile ? "black" : "gray" }}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderBottomLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: home ? Theme.HOME_SELECTION : "white",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                setProfile(false)
                setHome(true)
                setAccount(false)
                props.navigation.goBack()
              }}
            >
              <Image
                source={require("../../assets/swiper.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: home ? "black" : "gray"
                }}
              ></Image>
              <Text style={{ color: home ? "black" : "gray" }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderTopRightRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: account ? Theme.HOME_SELECTION : "white"
                //   marginLeft: -20
              }}
              onPress={() => {
                setProfile(false)
                setHome(false)
                setAccount(true)
                props.navigation.navigate("AccountSetting")
              }}
            >
              <Image
                source={require("../../assets/matches.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: account ? "black" : "gray"
                }}
              ></Image>
              <Text style={{ color: account ? "black" : "gray" }}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
  async function getCategories() {
    axios({
      method: "get",
      url: BaseURL.concat("/conversation/category/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        setCategories(res.data.results)
        // dispatch(actionCategories(res.data.results))
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: error.response.data.non_field_errors[0],
          position: "bottom",
          visibilityTime: 3000
        })
        setLoading(false)
      })
      .finally(() => {
        // setSubmitting(false)
      })
  }
  async function getPersons() {
    axios({
      method: "get",
      url: BaseURL.concat("/user/get_users/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        setPersons(res.data)
        // dispatch(actionCategories(res.data.results))
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: error.response.data.non_field_errors[0],
          position: "bottom",
          visibilityTime: 3000
        })
        setLoading(false)
      })
      .finally(() => {
        // setSubmitting(false)
      })
  }
}

const styles = StyleSheet.create({
  ScrollView_1: { backgroundColor: "white" },
  roundButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white"
  },
  roundButtonLarge: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white"
  },
  pickerContainerStyle: { marginVertical: 10 }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(NewConversation)
