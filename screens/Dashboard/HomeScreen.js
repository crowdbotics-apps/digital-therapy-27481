import React, { useEffect, useRef, useState } from "react"
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
  ScrollView,
  Animated,
  Alert
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

import { bindActionCreators } from "redux"
import { actionSignup } from "../../Actions/index"
import { useSelector } from "react-redux"
import {
  url,
  BaseURL,
  Header,
  SET_TOKEN,
  GET_HEADER
} from "../../Connection/index"
import ButtonStyle from "../../Styles/ButtonStyle"
import HeaderWhite from "../../Component/HeaderWhite"
import * as Animatable from "react-native-animatable"
import axios from "axios"
import DropDownPicker from "react-native-dropdown-picker"
import Toast from "react-native-toast-message"
import OneSignal from "react-native-onesignal"
import user from "../../features/user"
import { NavigationEvents } from "react-navigation"
// edited
function HomeScreen(props) {
  const [home, setHome] = useState(true)

  const [account, setAccount] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(false)
  const [isHome, setIsHome] = useState(true)
  const [isNewProfile, setIsNewProfile] = useState(true)
  const userState = useSelector(state => state.user.value)
  // console.warn(userState.token)
  const viewAnimation = useRef()
  const homeViewAnimation = useRef()
  //newconversation
  const [categories, setCategories] = useState([
    { type: "family" },
    {
      type: "couple"
    },
    {
      type: "friend"
    },
    { type: "self" }
  ])
  const [categoryValue, setCategoryValue] = useState("")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [personValue, setPersonValue] = useState("")
  const [persons, setPersons] = useState(null)
  const [personOpen, setPersonOpen] = useState(false)
  const [topic, setTopic] = useState("")
  const [isEnabled, setIsEnabled] = useState(!userState.allow_push_notification)
  const toggleSwitchPush = () => {
    setIsEnabled(previousState => !previousState)

    EditUserSettings({ allow_push_notification: !isEnabled })
  }
  const [closeAccount, setCloseAccount] = useState(false)
  const toggleCloseAccount = () => {
    if (!closeAccount) {
      Alert.alert(
        "Close account confirmation",
        "Are you sure you want to close your account?",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              CloseAccount()
              setCloseAccount(previousState => !previousState)
            },
            style: "yes"
          }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            )
        }
      )
    } else {
      setCloseAccount(previousState => !previousState)
    }
  }
  OneSignal.getDeviceState().then(res => {
    EditUserSettings({ onesignal_user_id: res.userId })
  })

  useEffect(async () => {
    const Animation = async () => {
      if (!isHome) {
        setIsHome(false)
        if (viewAnimation.current) await viewAnimation.current.slideInRight(500)
      } else {
        if (viewAnimation.current) await viewAnimation.current.slideInLeft(500)
        setIsHome(true)
      }
    }

    const networkCall = async () => {
      if (persons?.length == 0 || persons == null) {
        // await getCategories()
        await getPersons()
      }
    }
    const listener = props.navigation.addListener("focus", () => {
      // do something
      if (props.route.params?.createSelf) {
        setIsNewProfile(true)
        setHome(false)
        setIsHome(false) // props.navigation.navigate("NewConversation")
        setCategoryValue("self")
      }
      if (props.route.params?.editSelf) {
        setIsNewProfile(true)
        setHome(false)
        setIsHome(false)
        setCategoryValue("self")
        // props.navigation.navigate("NewConversation")
        // editSelf: true,
        //     conversationId: item.conversation.id
      }
    })

    networkCall()
    Animation()
    return listener
  }, [isHome, viewAnimation, props.navigation])
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     // do something
  //     if (props.route?.params?.createSelf) {
  //       setIsNewProfile(true)
  //       setHome(false)
  //       setIsHome(false) // props.navigation.navigate("NewConversation")
  //       setCategoryValue("self")
  //     }
  //   })

  //   return unsubscribe
  // }, [props.navigation])

  const AnimationHome = async () => {
    if (isHome) {
      setIsHome(false)
      if (viewAnimation.current) await viewAnimation.current.slideInRight(500)
    } else {
      if (viewAnimation.current) await viewAnimation.current.slideInLeft(500)
      setIsHome(true)
    }
  }
  async function EditUserSettings(data) {
    axios({
      method: "PATCH",
      url: BaseURL.concat("/user/" + userState.user.id + "/"),
      headers: await GET_HEADER(),
      data: data
    })
      .then(res => {
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
  async function CloseAccount() {
    axios({
      method: "POST",
      url: BaseURL.concat("/user/cancel/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        global.storage.remove({
          key: "loginState"
        })
        props.navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }]
        })
        // dispatch(actionCategories(res.data.results))
      })
      .catch(function (error) {
        console.warn(error.response)
        Toast.show({
          type: "error",
          text1: "Something went wrong",
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
        console.warn(res)
        setPersons(res.data.results)
        // dispatch(actionCategories(res.data.results))
      })
      .catch(function (error) {
        setPersons(null)
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

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      style={styles.ScrollView_1}
    >
      <View style={{ flex: 1 }}>
        {isHome ? (
          <Animatable.View
            style={{
              flex: 1

              // justifyContent: "center"
            }}
            ref={homeViewAnimation}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 0.1,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "space-evenly"
              }}
            >
              <View style={{ width: 50 }} />
              {/* <TouchableOpacity style={[styles.roundButton, { elevation: 0 }]}>
            {/* <Icon name="more-horiz" size={30} color={"#666666"} /> */}
              {/* </TouchableOpacity> */}
              <View>
                <Image
                  source={require("../../assets/logo_text.png")}
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => {
                  props.navigation.navigate("Notification")
                }}
              >
                <Icon
                  name="notifications"
                  color={Theme.THEME_COLOR}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("GuideScreen")
                }}
                style={{
                  width: "100%",
                  flex: 1,
                  alignSelf: "center",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ImageBackground
                  source={require("../../assets/splash_back.png")}
                  style={{
                    width: "80%",
                    flex: 0.8,
                    alignSelf: "center",
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  imageStyle={{
                    width: "100%",
                    borderRadius: 25
                  }}
                >
                  <Image
                    source={require("../../assets/logo.png")}
                    style={{ height: 200, resizeMode: "contain" }}
                  ></Image>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.15,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ImageBackground
                source={require("../../assets/depth.png")}
                style={{
                  width: "60%",
                  flex: 1,
                  alignSelf: "center",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                imageStyle={{
                  width: "100%",
                  borderRadius: 25
                }}
                resizeMode="contain"
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: "70%",
                    width: "90%",
                    justifyContent: "space-between"
                  }}
                >
                  <TouchableOpacity
                    style={styles.roundButtonLarge}
                    onPress={() => {
                      setIsNewProfile(true)
                      setHome(false)
                      setIsHome(false) // props.navigation.navigate("NewConversation")
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: Theme.THEME_COLOR,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Icon
                        name="add"
                        size={16}
                        style={{ fontWeight: "bold" }}
                        color={Theme.THEME_COLOR}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.roundButtonLarge}
                    onPress={() => {
                      props.navigation.navigate("ReceivedVideos")
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: Theme.THEME_COLOR,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Icon
                        name="arrow-downward"
                        size={16}
                        style={{ fontWeight: "bold" }}
                        color={Theme.THEME_COLOR}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              <View
                style={{
                  position: "absolute",
                  bottom: -10,
                  alignSelf: "center",
                  left: 0,
                  right: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.roundButton,
                    {
                      // position: "absolute",
                      // bottom: -10,
                      alignSelf: "center",
                      backgroundColor: "rgba(34, 34, 34, 0.2)",
                      width: 40,
                      height: 40,
                      elevation: 0
                    }
                  ]}
                  onPress={() => {
                    props.navigation.navigate("SentVideos")
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 5,
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center"
                    }}
                  >
                    <Icon
                      name="arrow-upward"
                      size={16}
                      style={{ fontWeight: "bold" }}
                      color={"white"}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.roundButton,
                    {
                      backgroundColor: "rgba(34, 34, 34, 0.2)",
                      width: 40,
                      height: 40,
                      elevation: 0
                    }
                  ]}
                  onPress={() => {
                    props.navigation.navigate("SelfVideos")
                  }}
                >
                  <Image
                    source={require("../../assets/selfVideos.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        ) : isNewProfile ? (
          <Animatable.View
            style={{
              flex: 1
            }}
            ref={viewAnimation}
          >
            <HeaderWhite
              text="New Conversation"
              onPress={() => {
                if (props.route.params?.editSelf) {
                  props.navigation.popToTop()
                } else {
                  setIsHome(true)
                  setHome(true)
                  setIsNewProfile(false)
                  setPersons([])
                }
              }}
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
                      borderRadius: 3,
                      shadowColor: "black",
                      shadowRadius: 3,
                      shadowOffset: { x: 3, y: 3 },
                      shadowOpacity: 0.2
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
                    schema={{ label: "type", value: "type" }}
                    open={categoryOpen}
                    value={categoryValue}
                    items={categories}
                    setValue={setCategoryValue}
                    setItems={setCategories}
                    setOpen={setCategoryOpen}
                    listMode="MODAL"
                  />
                </View>
                {categoryValue == "self" ? null : (
                  <View style={styles.pickerContainerStyle}>
                    <Text>Select Person</Text>
                    {persons?.length > 0 ? (
                      <DropDownPicker
                        style={{
                          width: "100%",
                          height: 50,
                          backgroundColor: "white",
                          borderWidth: 0,
                          marginTop: 10,
                          elevation: 4,
                          borderRadius: 3,
                          shadowColor: "black",
                          shadowRadius: 3,
                          shadowOffset: { x: 3, y: 3 },
                          shadowOpacity: 0.2
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
                        schema={{ label: "first_name", value: "id" }}
                        open={personOpen}
                        value={personValue}
                        items={persons}
                        setValue={setPersonValue}
                        setItems={setPersons}
                        setOpen={setPersonOpen}
                        listMode="MODAL"
                      />
                    ) : null}
                  </View>
                )}
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
                      fontSize: 16,
                      shadowColor: "black",
                      shadowRadius: 3,
                      shadowOffset: { x: 3, y: 3 },
                      shadowOpacity: 0.2,
                      paddingLeft: 10
                    }}
                    value={topic}
                    placeholder="Please write down the topic"
                    onChangeText={text => setTopic(text)}
                    placeholderTextColor={Theme.PlaceHolderTextColor}
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
                    <Text
                      style={{ color: Theme.THEME_COLOR, fontWeight: "bold" }}
                    >
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
                    if (ValidateForm()) {
                      if (props.route.params?.editSelf) {
                        editConversation(props.route.params?.conversationId)
                      } else {
                        props.navigation.navigate("Camera", {
                          data: {
                            categoryValue,
                            personValue:
                              categoryValue == "self"
                                ? userState.user.id
                                : personValue,
                            topic,
                            argument: true,
                            createConversation: true
                          }
                        })
                      }
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
                  {props.route.params?.editSelf ? (
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Theme.THEME_COLOR,
                        marginTop: 30
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 18 }}>Send</Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 100,
                        backgroundColor: Theme.THEME_COLOR,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 20,
                        shadowColor: "black",
                        shadowRadius: 3,
                        shadowOffset: { x: 3, y: 3 },
                        shadowOpacity: 0.2
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
                  )}
                </TouchableOpacity>

                {props.route.params?.editSelf ? null : (
                  <Text
                    style={{
                      fontSize: 24,
                      color: Theme.THEME_COLOR,
                      marginTop: 10
                    }}
                  >
                    Record video
                  </Text>
                )}
              </View>
            </View>
          </Animatable.View>
        ) : (
          <Animatable.View
            style={{
              flex: 1
            }}
            ref={viewAnimation}
          >
            <HeaderWhite
              text="Settings"
              onPress={() => {
                setIsHome(true)
                setHome(true)
                setAccount(false)
              }}
              hideIcon
              navigation={props.navigation}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 0.3,
                  width: "90%",
                  alignSelf: "center"
                }}
              >
                <Text style={ButtonStyle.textStyleHeading}>Settings</Text>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.viewContainer}>
                    <View style={styles.roundButton}>
                      <Image
                        source={require("../../assets/matches.png")}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: Theme.THEME_COLOR
                        }}
                      />
                    </View>
                    <View style={styles.viewContainerItem}>
                      <Text style={{ fontSize: 16, color: Theme.THEME_COLOR }}>
                        Account settings
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.viewContainer}>
                    <View style={styles.roundButton}>
                      <Image
                        source={require("../../assets/notification.png")}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: Theme.THEME_COLOR
                        }}
                      />
                    </View>
                    <View
                      style={[
                        styles.viewContainerItem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }
                      ]}
                    >
                      <View>
                        <Text style={{ fontSize: 16, color: "black" }}>
                          Push notifications
                        </Text>
                        <Text
                          style={{ fontSize: 14, color: Theme.THEME_COLOR }}
                        >
                          {isEnabled ? "On" : "Off"}
                        </Text>
                      </View>
                      <Switch
                        trackColor={{
                          false: "#dcdcdc",
                          true: Theme.THEME_COLOR
                        }}
                        thumbColor={"white"}
                        ios_backgroundColor={"#dcdcdc"}
                        onValueChange={toggleSwitchPush}
                        value={isEnabled}
                      />
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.viewContainer}>
                    <View style={styles.roundButton}>
                      <Image
                        source={require("../../assets/closeaccount.png")}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: Theme.THEME_COLOR
                        }}
                      />
                    </View>
                    <View
                      style={[
                        styles.viewContainerItem,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }
                      ]}
                    >
                      <View>
                        <Text style={{ fontSize: 16, color: "black" }}>
                          Close your account
                        </Text>
                        <Text
                          style={{ fontSize: 14, color: Theme.THEME_COLOR }}
                        >
                          {closeAccount ? "On" : "Off"}
                        </Text>
                      </View>
                      <Switch
                        trackColor={{
                          false: "#dcdcdc",
                          true: Theme.THEME_COLOR
                        }}
                        thumbColor={"white"}
                        ios_backgroundColor={"#dcdcdc"}
                        onValueChange={toggleCloseAccount}
                        value={closeAccount}
                      />
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <TouchableOpacity
                    style={styles.viewContainer}
                    onPress={() => {
                      sendOTP()
                    }}
                  >
                    <View style={styles.roundButton}>
                      <Image
                        source={require("../../assets/changepassword.png")}
                        resizeMode="contain"
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: Theme.THEME_COLOR
                        }}
                      />
                    </View>
                    <View style={styles.viewContainerItem}>
                      <Text style={{ fontSize: 16, color: "black" }}>
                        Reset your password
                      </Text>
                      <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                        set a new one
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.line}></View>
                </View>
              </View>

              <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    marginVertical: 5
                  }}
                  onPress={() => {
                    props.navigation.navigate("PrivacyScreen")
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                  >
                    Privacy policy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    marginVertical: 5
                  }}
                  onPress={() => {
                    props.navigation.navigate("TermsandConditionScreen")
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                  >
                    Terms and conditions
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    marginVertical: 5
                  }}
                  onPress={() => {
                    props.navigation.navigate("SendFeedback")
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                  >
                    Send feedback
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    marginVertical: 10
                  }}
                  onPress={() => {
                    global.storage.remove({
                      key: "loginState"
                    })
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: "LoginScreen" }]
                    })
                  }}
                >
                  <Text
                    style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}
                  >
                    Sign out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        )}
        <View
          style={{
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // flex: 0.4,
              height: "100%",
              width: "85%",
              backgroundColor: "white",
              elevation: 3,
              borderBottomLeftRadius: 35,
              borderTopRightRadius: 35,
              shadowColor: "black",
              shadowRadius: 3,
              shadowOffset: { x: 3, y: 3 },
              shadowOpacity: 0.2
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
                // setProfile(false)
                // setHome(false)
                // setAccount(true)

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
                if (props.route.params?.editSelf) {
                  props.navigation.popToTop()
                } else {
                  setProfile(false)
                  setHome(true)
                  setAccount(false)
                  AnimationHome()
                  setIsHome(true)
                }
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
                borderTopRightRadius: 35,
                justifyContent: "center",
                alignItems: "center",

                backgroundColor: account ? Theme.HOME_SELECTION : "white"
                //   marginLeft: -20
              }}
              onPress={() => {
                setProfile(false)
                setHome(false)
                setIsHome(false)
                setIsNewProfile(false)
                setAccount(true)

                // props.navigation.navigate("AccountSetting")
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
  async function editConversation(id) {
    var self = this
    return axios({
      method: "PATCH",
      url: BaseURL.concat("/conversation/conversation/" + id + "/"),
      headers: await GET_HEADER(),
      data: { category: categoryValue, person_to: personValue, topic: topic }
    })
      .then(res => {
        console.warn("res")
        var item = persons.filter(item => {
          return item.id == personValue
        })
        Toast.show({
          type: "success",
          text1: "Successfully sent to " + item?.[0]?.first_name,
          position: "bottom",
          visibilityTime: 3000
        })
        props.navigation.replace("SentVideos")
      })
      .catch(function (error) {
        console.warn(error)
        console.warn(error.response)
        Toast.show({
          type: "error",
          text1: error.response.data.non_field_errors[0],
          position: "bottom",
          visibilityTime: 3000
        })
        return false
      })
      .finally(() => {})
  }

  function ValidateForm() {
    if (categoryValue != "" && topic != "") {
      if (categoryValue == "self") {
        return true
      } else {
        if (personValue != "") {
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  }
  async function sendOTP() {
    setLoading(true)
    axios({
      method: "post",
      url: url.concat("/rest-auth/password/reset/"),
      headers: await GET_HEADER(),
      data: {
        email: userState.user.email
      }
    })
      .then(res => {
        props.navigation.navigate("OTPScreen", { email: userState.user.email })
        Toast.show({
          type: "success",
          text1: res.data.detail,
          position: "bottom",
          visibilityTime: 3000
        })
        // Toast.show({ text: res.data.message }, 3000)
      })
      .catch(function (error) {
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }
}

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

const styles = StyleSheet.create({
  ScrollView_1: { backgroundColor: "white" },
  roundButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  roundButtonLarge: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  line: {
    backgroundColor: Theme.LIGHT_GRAY,
    width: "100%",
    height: 1
  },
  viewContainer: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "white",
    // elevation: 4,
    justifyContent: "center",
    alignItems: "center"
    // paddingHorizontal: 20
  },
  viewContainerItem: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },

  pickerContainerStyle: { marginVertical: 10 }
})

export default HomeScreen
