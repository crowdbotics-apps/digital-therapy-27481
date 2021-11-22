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
  Animated
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
import { BaseURL, Header, SET_TOKEN, GET_HEADER } from "../../Connection/index"
import ButtonStyle from "../../Styles/ButtonStyle"
import HeaderWhite from "../../Component/HeaderWhite"
import * as Animatable from "react-native-animatable"
import axios from "axios"
import DropDownPicker from "react-native-dropdown-picker"
import Toast from "react-native-toast-message"
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
  const [categories, setCategories] = useState([])
  const [categoryValue, setCategoryValue] = useState("")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [personValue, setPersonValue] = useState("")
  const [persons, setPersons] = useState([])
  const [personOpen, setPersonOpen] = useState(false)
  const [topic, setTopic] = useState("")
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
      if (categories.length == 0) {
        await getCategories()
        await getPersons()
      }
    }
    networkCall()
    Animation()
  }, [isHome, viewAnimation])

  const AnimationHome = async () => {
    if (isHome) {
      setIsHome(false)
      if (viewAnimation.current) await viewAnimation.current.slideInRight(500)
    } else {
      if (viewAnimation.current) await viewAnimation.current.slideInLeft(500)
      setIsHome(true)
    }
  }
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
        console.warn(error.response)
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
                <Icon name="notifications" size={30} />
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
                setIsHome(true)
                setHome(true)
                setIsNewProfile(false)
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
                    console.warn(categoryValue)
                    if (
                      categoryValue != "" &&
                      personValue != "" &&
                      topic != ""
                    ) {
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
                        Account Settings
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
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
                      <Text style={{ fontSize: 16, color: "black" }}>
                        Push Notifications
                      </Text>
                      <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                        on
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
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
                      <Text style={{ fontSize: 16, color: "black" }}>
                        Close your account
                      </Text>
                      <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                        off
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
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
                      <Text style={{ fontSize: 16, color: "black" }}>
                        Reset your password
                      </Text>
                      <Text style={{ fontSize: 14, color: Theme.THEME_COLOR }}>
                        set a new once
                      </Text>
                    </View>
                  </View>
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
                    Send Feedback
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
                    //   const resetAction = StackActions.reset({
                    //     index: 0,
                    //     key: null,
                    //     actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
                    //   });
                    //   self.props.navigation.dispatch(resetAction);
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: "LoginScreen" }]
                    })
                  }}
                >
                  <Text
                    style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}
                  >
                    Logout
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
                setProfile(false)
                setHome(true)
                setAccount(false)

                AnimationHome()
                setIsHome(true)
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
                setAccount(true)
                setIsHome(false)

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
