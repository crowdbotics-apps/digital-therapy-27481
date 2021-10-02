import React, { useState, useEffect } from "react"
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
import { Avatar, CheckBox } from "react-native-elements"
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
import { FlatList } from "react-native-gesture-handler"
import moment from "moment"
import { useSelector } from "react-redux"
import axios from "axios"
import { BaseURL, GET_HEADER } from "../../Connection"
import Toast from "react-native-toast-message"
// edited
function speakerScreen(props) {
  const [receivedVideos, setReceivedVideos] = useState([1, 2, 3, 4, 5])
  // const [listener, setListener] = useState(false)
  // const [speaker, setspeaker] = useState(false)
  // const [conversation, setConversation] = useState(null)
  // useEffect(() => {
  //   // const updateStates = () => {
  //   // setListener(props.route.params.listener)
  //   // setspeaker(props.route.params.speaker)
  //   // setConversation(props.route.params.conversation)
  //   // }
  //   // updateStates()
  //   console.warn(props.route.params.conversation)
  // }, [])
  const user = useSelector(state => state.user.value.user)
  console.warn(user)
  const { sent, received, conversation } = props.route.params
  const renderMessage = (sent, received, conversation) => {
    if (conversation.resolved) {
      return (
        <View
          style={{
            flex: 1,
            alignSelf: "center",

            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            shadowOffset: { x: 0, y: 10 },
            shadowColor: "black",
            shadowOpacity: 0.6,
            shadowRadius: 5,
            elevation: 0,
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.roundButtonLarge}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ height: "90%", width: "80%" }}
              resizeMode="contain"
            />
          </View>
          <Text style={{ fontSize: 22, color: Theme.THEME_COLOR }}>
            Resolved!
          </Text>
        </View>
      )
    } else {
      // i am not the initiator and initiator resolved this conversation but now I am the speaker and create another argument
      if (conversation.argument && !conversation.should_resolve && received) {
        return (
          <View
            style={{
              flex: 0.3,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowOffset: { x: 0, y: 10 },
              shadowColor: "black",
              shadowOpacity: 0.6,
              shadowRadius: 5,
              elevation: 1
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>Approved</Text>
              <Text style={{ color: Theme.GRAY }}>
                {conversation.speaker.name} approved your explanation, you are
                the speaker now! Record your video and bring your word to the
                table!
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  right: 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  props.navigation.navigate("Camera", {
                    data: {
                      categoryValue: null,
                      personValue: null,
                      topic: null,
                      argument: true,
                      // conversation.conversation.person_from == user.id
                      //   ? true
                      // : false,
                      createConversation: false,
                      id: conversation.conversation.id
                    }
                  })
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: Theme.THEME_COLOR,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 20
                  }}
                >
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      }

      // you have to respond to the conversation
      if (
        user.id == conversation.listener.id &&
        conversation.should_resolve &&
        conversation.argument &&
        received
      ) {
        return (
          <View
            style={{
              flex: 0.3,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowOffset: { x: 0, y: 10 },
              shadowColor: "black",
              shadowOpacity: 0.6,
              shadowRadius: 5,
              elevation: 1
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>Explain</Text>
              <Text style={{ color: Theme.GRAY }}>
                Explain what you heard in your own words
                {/* Explain what you heard in your own words */}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  right: 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  props.navigation.navigate("Camera", {
                    data: {
                      categoryValue: null,
                      personValue: null,
                      topic: null,
                      argument: false,
                      // conversation.conversation.person_from == user.id
                      //   ? true
                      // : false,
                      createConversation: false,
                      id: conversation.conversation.id
                    }
                  })
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: Theme.THEME_COLOR,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 20
                  }}
                >
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      // I switched the role and created argument
      if (
        conversation.should_resolve &&
        conversation.argument &&
        sent &&
        conversation.speaker.id == user.id
      ) {
        return (
          <View
            style={{
              flex: 0.3,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowOffset: { x: 0, y: 10 },
              shadowColor: "black",
              shadowOpacity: 0.6,
              shadowRadius: 5,
              elevation: 1
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>
                Waiting for {conversation.listener.name} to reply
              </Text>
              <Text style={{ color: Theme.GRAY }}>
                Video will appear once {conversation.listener.name} replies.
              </Text>
            </View>
          </View>
        )
      }
      if (
        user.id == conversation.speaker.id &&
        !conversation.should_resolve &&
        !conversation.argument &&
        sent
      ) {
        return (
          <View
            style={{
              flex: 0.3,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowOffset: { x: 0, y: 10 },
              shadowColor: "black",
              shadowOpacity: 0.6,
              shadowRadius: 5,
              elevation: 1
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>Approval awaited</Text>
              <Text style={{ color: Theme.GRAY }}>
                waiting for {conversation.listener.name} to approve
              </Text>
            </View>
          </View>
        )
      }
      if (
        user.id == conversation.listener.id &&
        !conversation.should_resolve &&
        !conversation.argument &&
        received
      ) {
        return (
          <View
            style={{
              flex: 0.3,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowOffset: { x: 0, y: 10 },
              shadowColor: "black",
              shadowOpacity: 0.6,
              shadowRadius: 5,
              elevation: 1
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>Confirm</Text>
              <Text style={{ color: Theme.GRAY }}>
                confirm {conversation.speaker.name}'s explanation
              </Text>
            </View>
          </View>
        )
      }

      //   // listener responded and waiting for initiator to approve
      //   if (
      //     user.id == conversation.conversation.person_to &&
      //     conversation.should_resolve &&
      //     conversation.argument &&
      //     received &&
      //     conversation.listener.id == user.id
      //   ) {
      //     return (
      //       <View
      //         style={{
      //           flex: 0.3,
      //           alignSelf: "center",
      //           flexDirection: "row",
      //           backgroundColor: "white",
      //           padding: 10,
      //           borderBottomLeftRadius: 20,
      //           borderBottomRightRadius: 20,
      //           shadowOffset: { x: 0, y: 10 },
      //           shadowColor: "black",
      //           shadowOpacity: 0.6,
      //           shadowRadius: 5,
      //           elevation: 1
      //         }}
      //       >
      //         <View style={{ flex: 3 }}>
      //           <Text style={{ fontSize: 16 }}>Waiting for approval</Text>
      //           <Text style={{ color: Theme.GRAY }}>
      //             Waiting for approval from {conversation.speaker.name}
      //           </Text>
      //         </View>
      //       </View>
      //     )
      //   }
      //   // initiator created an argument on listener response
      //   // listener responded and you have to respond back
      //   else if (
      //     user.id == conversation.conversation.person_from &&
      //     !conversation.should_resolve &&
      //     !conversation.argument
      //   ) {
      //     return (
      //       <View
      //         style={{
      //           flex: 0.3,
      //           alignSelf: "center",
      //           flexDirection: "row",
      //           backgroundColor: "white",
      //           padding: 10,
      //           borderBottomLeftRadius: 20,
      //           borderBottomRightRadius: 20,
      //           shadowOffset: { x: 0, y: 10 },
      //           shadowColor: "black",
      //           shadowOpacity: 0.6,
      //           shadowRadius: 5,
      //           elevation: 1
      //         }}
      //       >
      //         <View style={{ flex: 3 }}>
      //           <Text style={{ fontSize: 16 }}>Approved</Text>
      //           <Text style={{ color: Theme.GRAY }}>
      //             {conversation.speaker.name} approved your explanation, you are
      //             the speaker now! Record your video and bring your word to the
      //             table!
      //           </Text>
      //         </View>
      //         <View style={{ flex: 1 }}>
      //           <TouchableOpacity
      //             style={{
      //               position: "absolute",
      //               width: 60,
      //               height: 60,
      //               right: 15,
      //               justifyContent: "center",
      //               alignItems: "center"
      //             }}
      //             onPress={() => {
      //               props.navigation.navigate("Camera", {
      //                 data: {
      //                   categoryValue: null,
      //                   personValue: null,
      //                   topic: null,
      //                   argument: false,
      //                   // conversation.conversation.person_from == user.id
      //                   //   ? true
      //                   // : false,
      //                   createConversation: false,
      //                   id: conversation.conversation.id
      //                 }
      //               })
      //             }}
      //           >
      //             <View
      //               style={{
      //                 width: 40,
      //                 height: 40,
      //                 borderRadius: 100,
      //                 backgroundColor: Theme.THEME_COLOR,
      //                 justifyContent: "center",
      //                 alignItems: "center",
      //                 elevation: 20
      //               }}
      //             >
      //               <View
      //                 style={{
      //                   width: 25,
      //                   height: 25,
      //                   borderRadius: 100,
      //                   backgroundColor: "white",
      //                   justifyContent: "center",
      //                   alignItems: "center"
      //                 }}
      //               ></View>
      //             </View>
      //           </TouchableOpacity>
      //         </View>
      //       </View>
      //     )
      //   }
      //   if (sent && conversation.should_resolve && conversation.argument) {
      //     return (
      //       <View
      //         style={{
      //           flex: 0.3,
      //           alignSelf: "center",
      //           flexDirection: "row",
      //           backgroundColor: "white",
      //           padding: 10,
      //           borderBottomLeftRadius: 20,
      //           borderBottomRightRadius: 20,
      //           shadowOffset: { x: 0, y: 10 },
      //           shadowColor: "black",
      //           shadowOpacity: 0.6,
      //           shadowRadius: 5,
      //           elevation: 1
      //         }}
      //       >
      //         <View style={{ flex: 3 }}>
      //           <Text style={{ fontSize: 16 }}>Waiting</Text>
      //           <Text style={{ color: Theme.GRAY }}>
      //             waiting for {conversation.listener.name} to reply
      //           </Text>
      //         </View>
      //         <View style={{ flex: 1 }}>
      //           <View
      //             style={{
      //               position: "absolute",
      //               width: 60,
      //               height: 60,
      //               right: 15,
      //               justifyContent: "center",
      //               alignItems: "center"
      //             }}
      //           >
      //             <Image
      //               source={require("../../assets/logo.png")}
      //               style={{ width: 60, height: 60 }}
      //               resizeMode="contain"
      //             />
      //           </View>
      //         </View>
      //       </View>
      //     )
      //     // return (
      //     //   <View
      //     //     style={{
      //     //       flex: 0.3,
      //     //       alignSelf: "center",
      //     //       flexDirection: "row",
      //     //       backgroundColor: "white",
      //     //       padding: 10,
      //     //       borderBottomLeftRadius: 20,
      //     //       borderBottomRightRadius: 20,
      //     //       shadowOffset: { x: 0, y: 10 },
      //     //       shadowColor: "black",
      //     //       shadowOpacity: 0.6,
      //     //       shadowRadius: 5,
      //     //       elevation: 1
      //     //     }}
      //     //   >
      //     //     <View style={{ flex: 3 }}>
      //     //       <Text style={{ fontSize: 16 }}>Approved</Text>
      //     //       <Text style={{ color: Theme.GRAY }}>
      //     //         Jane approved your explanation, you are the speaker now! Record
      //     //         your video and bring your word to the table!
      //     //       </Text>
      //     //     </View>
      //     //     <View style={{ flex: 1 }}>
      //     //       <TouchableOpacity
      //     //         style={{
      //     //           position: "absolute",
      //     //           width: 60,
      //     //           height: 60,
      //     //           right: 15,
      //     //           justifyContent: "center",
      //     //           alignItems: "center"
      //     //         }}
      //     //         onPress={() => {
      //     //           props.navigation.navigate("Camera")
      //     //         }}
      //     //       >
      //     //         <View
      //     //           style={{
      //     //             width: 40,
      //     //             height: 40,
      //     //             borderRadius: 100,
      //     //             backgroundColor: Theme.THEME_COLOR,
      //     //             justifyContent: "center",
      //     //             alignItems: "center",
      //     //             elevation: 20
      //     //           }}
      //     //         >
      //     //           <View
      //     //             style={{
      //     //               width: 25,
      //     //               height: 25,
      //     //               borderRadius: 100,
      //     //               backgroundColor: "white",
      //     //               justifyContent: "center",
      //     //               alignItems: "center"
      //     //             }}
      //     //           ></View>
      //     //         </View>
      //     //       </TouchableOpacity>
      //     //     </View>
      //     //   </View>
      //     // )
      //   }
      //   if (
      //     user.id == conversation.conversation.person_to &&
      //     !conversation.should_resolve &&
      //     !conversation.argument &&
      //     sent &&
      //     conversation.speaker.id == user.id
      //   ) {
      //     return (
      //       <View
      //         style={{
      //           flex: 0.3,
      //           alignSelf: "center",
      //           flexDirection: "row",
      //           backgroundColor: "white",
      //           padding: 10,
      //           borderBottomLeftRadius: 20,
      //           borderBottomRightRadius: 20,
      //           shadowOffset: { x: 0, y: 10 },
      //           shadowColor: "black",
      //           shadowOpacity: 0.6,
      //           shadowRadius: 5,
      //           elevation: 1
      //         }}
      //       >
      //         <View style={{ flex: 3 }}>
      //           <Text style={{ fontSize: 16 }}>
      //             Waiting for {conversation.listener.name} to reply
      //           </Text>
      //           <Text style={{ color: Theme.GRAY }}>
      //             Video will appear once Jane replies.
      //           </Text>
      //         </View>
      //       </View>
      //     )
      //   }
      //   if (
      //     user.id == conversation.conversation.person_to &&
      //     !conversation.should_resolve &&
      //     !conversation.argument &&
      //     sent
      //   ) {
      //     return (
      //       <View
      //         style={{
      //           flex: 0.3,
      //           alignSelf: "center",
      //           flexDirection: "row",
      //           backgroundColor: "white",
      //           padding: 10,
      //           borderBottomLeftRadius: 20,
      //           borderBottomRightRadius: 20,
      //           shadowOffset: { x: 0, y: 10 },
      //           shadowColor: "black",
      //           shadowOpacity: 0.6,
      //           shadowRadius: 5,
      //           elevation: 1
      //         }}
      //       >
      //         <View style={{ flex: 3 }}>
      //           <Text style={{ fontSize: 16 }}>Approval awaited</Text>
      //           <Text style={{ color: Theme.GRAY }}>
      //             waiting for {conversation.listener.name} to approve
      //           </Text>
      //         </View>
      //       </View>
      //     )
      //   }
    }
  }
  const renderResolveButton = (sent, received, conversation) => {
    if (
      conversation.resolved ||
      (conversation.argument && !conversation.should_resolve && sent)
    ) {
      return (
        <View style={{ flex: 0.3, justifyContent: "center" }}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => {
              props.navigation.popToTop()
            }}
          >
            <Text style={{ color: "white" }}>Go back to Home Screen</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (received && conversation.should_resolve && conversation.argument) {
      return null
    }

    if (
      user.id == conversation.listener.id &&
      !conversation.should_resolve &&
      !conversation.argument
    ) {
      return (
        <View style={{ flex: 0.3, justifyContent: "center" }}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => {
              resolveArgument()
            }}
          >
            <Text style={{ color: "white" }}>Mark it as resolved</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  const resolveArgument = async () => {
    axios({
      method: "post",
      headers: await GET_HEADER(),
      url: BaseURL.concat(
        "/conversation/items/" + conversation.id + "/resolve/"
      )
    })
      .then(res => {
        console.warn(res)
        Toast.show({
          type: "success",
          text1: "This video has been resolved",
          position: "bottom",
          visibilityTime: 3000
        })
      })
      .catch(ex =>
        Toast.show({
          type: "error",
          text1: "Something went wrong ",
          position: "bottom",
          visibilityTime: 3000
        })
      )
  }
  const renderAvatarView = (sent, received, conversation) => {
    if (
      user.id == conversation.speaker.id &&
      conversation.should_resolve &&
      conversation.argument &&
      sent
    ) {
      // I am the initiator and responder has not responded yet
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginRight: -50,
              elevation: 2
            }}
          >
            <Text>{conversation.speaker.name}</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                props.navigation.navigate("ViewVideo", {
                  data: { uri: conversation.video }
                })
              }}
            >
              <Avatar
                source={{
                  uri:
                    conversation.speaker.profile_picture != null
                      ? conversation.speaker.profile_picture
                      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
                }}
                rounded
                size={100}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>speaker</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              //   backgroundColor: "blue",
              marginLeft: -40
            }}
          >
            <Text>{conversation.listener.name}</Text>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                source={{
                  uri:
                    "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                }}
                rounded
                size={
                  !(conversation.should_resolve && conversation.argument)
                    ? 100
                    : 130
                }
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {!(conversation.should_resolve && conversation.argument)
                ? "speaker"
                : "Listener"}
            </Text>
          </View>
        </View>
      )
    }

    // I am not the initiator but I have responded back and waiting for initiator to resolve or fu
    if (
      user.id == conversation.speaker.id &&
      !conversation.should_resolve &&
      !conversation.argument &&
      sent
    ) {
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginRight: -50,
              elevation: 2
            }}
          >
            <Text>{conversation.speaker.name}</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                props.navigation.navigate("ViewVideo", {
                  data: { uri: conversation.video }
                })
              }}
            >
              <Avatar
                source={{
                  uri:
                    conversation.speaker.profile_picture != null
                      ? conversation.speaker.profile_picture
                      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
                }}
                rounded
                size={100}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>speaker</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              //   backgroundColor: "blue",
              marginLeft: -40
            }}
          >
            <Text>{conversation.listener.name}</Text>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                source={{
                  uri:
                    "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                }}
                rounded
                size={130}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Listener</Text>
          </View>
        </View>
      )
    }
    // I am not the initiator and I have to respond to this conversation
    if (
      user.id == conversation.listener.id &&
      conversation.should_resolve &&
      conversation.argument &&
      received
    ) {
      // I am not the initiator and I have to respond
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginRight: -50,
              elevation: 2
            }}
          >
            <Text>{conversation.speaker.name}</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                props.navigation.navigate("ViewVideo", {
                  data: { uri: conversation.video }
                })
              }}
            >
              <Avatar
                source={{
                  uri:
                    conversation.speaker.profile_picture != null
                      ? conversation.speaker.profile_picture
                      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
                }}
                rounded
                size={100}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>speaker</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              //   backgroundColor: "blue",
              marginLeft: -40
            }}
          >
            <Text>{conversation.listener.name}</Text>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                source={{
                  uri:
                    "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                }}
                rounded
                size={
                  !(conversation.should_resolve && conversation.argument)
                    ? 100
                    : 130
                }
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {!(conversation.should_resolve && conversation.argument)
                ? "speaker"
                : "Listener"}
            </Text>
          </View>
        </View>
      )
    }
    // I am the initiator and responder have responded and I can resolve now
    if (
      user.id == conversation.listener.id &&
      !conversation.should_resolve &&
      !conversation.argument &&
      received
    )
      // I was the initiator and responder has responded back now I have to resolve or argument back
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginRight: -50,
              elevation: 2
            }}
          >
            <Text>{conversation.listener.name}</Text>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                source={{
                  uri:
                    conversation.listener.profile_picture != null
                      ? conversation.listener.profile_picture
                      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
                }}
                rounded
                size={130}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Listener</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              //   backgroundColor: "blue",
              marginLeft: -40
            }}
          >
            <Text>{conversation.speaker.name}</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",

                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                props.navigation.navigate("ViewVideo", {
                  data: { uri: conversation.video }
                })
              }}
            >
              <Avatar
                source={{
                  uri:
                    "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                }}
                rounded
                size={100}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {"speaker"}
            </Text>
          </View>
        </View>
      )

    // I am the initiator and I have resolved the conversation and coming from sent screen
    if (conversation.argument && !conversation.should_resolve && sent) {
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginRight: -50,
              elevation: 2
            }}
          >
            <Text>{conversation.speaker.name}</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                props.navigation.navigate("ViewVideo", {
                  data: { uri: conversation.video }
                })
              }}
            >
              <Avatar
                source={{
                  uri:
                    conversation.speaker.profile_picture != null
                      ? conversation.speaker.profile_picture
                      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
                }}
                rounded
                size={100}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>speaker</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              //   backgroundColor: "blue",
              marginLeft: -40
            }}
          >
            <Text>{conversation.listener.name}</Text>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                source={{
                  uri:
                    "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                }}
                rounded
                size={130}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Listener</Text>
          </View>
        </View>
      )
    }

    // I am not the initiator and the conversation is resolved by the initiator Now I am the speaker and create another argument which will change roles
    if (conversation.argument && !conversation.should_resolve && received) {
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginRight: -50,
              elevation: 2
            }}
          >
            <Text>{conversation.speaker.name}</Text>
            <TouchableOpacity
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                props.navigation.navigate("ViewVideo", {
                  data: { uri: conversation.video }
                })
              }}
            >
              <Avatar
                source={{
                  uri:
                    conversation.speaker.profile_picture != null
                      ? conversation.speaker.profile_picture
                      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
                }}
                rounded
                size={100}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>speaker</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              //   backgroundColor: "blue",
              marginLeft: -40
            }}
          >
            <Text>{conversation.listener.name}</Text>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                source={{
                  uri:
                    "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                }}
                rounded
                size={130}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/soundwaves.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: Theme.THEME_COLOR
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Listener</Text>
          </View>
        </View>
      )
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      style={styles.ScrollView_1}
    >
      <View style={{ flex: 1 }}>
        <HeaderWhite
          text={conversation.speaker.name}
          onPress={() => props.navigation.goBack()}
          hideIcon
          navigation={props.navigation}
        />

        <View
          style={{
            flex: 1,
            //   width: "90%",
            width: "100%",
            paddingHorizontal: 15,
            alignSelf: "center"
          }}
        >
          <View
            style={{
              height: 100,
              width: "100%",
              elevation: 4,
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
              justifyContent: "space-evenly"
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16 }}>Category:</Text>
                <Text style={{ fontSize: 16 }}>
                  {conversation.conversation.category}
                </Text>
              </View>
              <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
                {moment(conversation.conversation.created_at).format(
                  "d MMMM, yyyy H:mma"
                )}
              </Text>
            </View>
            <Text style={{ color: Theme.THEME_COLOR, fontSize: 16 }}>
              {conversation.conversation.topic}
            </Text>
          </View>
          <View style={{ flex: 0.7 }}>
            {renderAvatarView(sent, received, conversation)}

            {renderMessage(sent, received, conversation)}
          </View>
          {renderResolveButton(sent, received, conversation)}
        </View>
      </View>
    </ScrollView>
  )
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
export default connect(mapStateToProps, mapDispatchToProps)(speakerScreen)
