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
  const renderMessage = conversation => {
    var conversation = conversation.conversation
    console.warn(conversation.items.length)

    var firstItem = conversation.items?.[0]

    // -----------------------------------------------New Code---------------------------------
    if (
      user.id == firstItem.owner &&
      firstItem.status.toLowerCase() == "sent" &&
      conversation.items.length == 1
    ) {
      //  Waiting for other person to reply
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

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Waiting</Text>
            <Text style={{ color: Theme.GRAY }}>
              In the meantime remember while this conversation may be old to
              you, It may be new to them. Try to be patient.
              {/* Waiting for {firstItem.listener.first_name} to reply */}
            </Text>
          </View>
        </View>
      )
    }

    if (
      user.id != firstItem.owner &&
      firstItem.status.toLowerCase() == "sent" &&
      conversation.items.length == 1
    ) {
      //  You have received and you have to explain
      return (
        <View
          style={{
            height: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Show understanding</Text>
            <Text style={{ color: Theme.GRAY }}>
              Explain what you heard in your own words. Remember this is not
              agreement or disagreement. Its simply to show understanding. If
              you aren't sure. Ask questions.
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
                    createConversation: false,
                    id: conversation.id
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
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
    //  testing
    if (
      user.id != firstItem.owner &&
      conversation.items?.[0].status.toLowerCase() == "confirmed"
    ) {
      // you have confirmed the explanation
      return (
        <View
          style={{
            minHeight: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginBottom: 20,
            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Confirmed</Text>
            <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
              You have confirmed the explanation.
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                position: "absolute",
                width: 60,
                height: 60,
                right: 15,
                justifyContent: "center",
                alignItems: "center"
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
                }}
              >
                <Icon name="done" color={"white"} size={25} />
              </View>
            </View>
          </View>
        </View>
      )
    }
    if (
      user.id != firstItem.owner &&
      conversation.items?.[0].status.toLowerCase() == "not_confirmed"
    ) {
      // you have not confirmed the explanation
      return (
        <View
          style={{
            minHeight: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginBottom: 20,
            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Not Confirmed</Text>
            <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
              You have not confirmed the explanation.
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                position: "absolute",
                width: 60,
                height: 60,
                right: 15,
                justifyContent: "center",
                alignItems: "center"
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
                }}
              >
                <Icon name="close" color={"white"} size={25} />
              </View>
            </View>
          </View>
        </View>
      )
    }
    //
    if (
      user.id != firstItem.owner &&
      conversation.items?.[1].status.toLowerCase() == "replied"
    ) {
      //  You have received from listener and you have to confirm or not confirm
      return (
        <View>
          <View
            style={{
              minHeight: 80,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginBottom: 20,
              elevation: 1,
              shadowColor: "black",
              shadowRadius: 3,
              shadowOffset: { x: 3, y: 3 },
              shadowOpacity: 0.2
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>Confirm</Text>
              <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
                Great job expressing the issue. Now that there is an
                understanding we can work towards getting this resolved.
                {/* Confirm {firstItem.listener.first_name}'s rephrasing (this is
                what I said) */}
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
                  updateItem(firstItem.id, "confirmed")
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
                    elevation: 20,
                    shadowColor: "black",
                    shadowRadius: 3,
                    shadowOffset: { x: 3, y: 3 },
                    shadowOpacity: 0.2
                  }}
                >
                  <Icon name="done" color={"white"} size={25} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Not confirm */}
          <View
            style={{
              minHeight: 80,
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              padding: 10,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,

              elevation: 1,
              shadowColor: "black",
              shadowRadius: 3,
              shadowOffset: { x: 3, y: 3 },
              shadowOpacity: 0.2
            }}
          >
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 16 }}>Not confirmed</Text>
              <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
                Lets help Jane get a clearer understanding. What do you believe
                they missed? How do you think we can get them from where they
                are now to a better understanding?
                {/* Respond to {firstItem.listener.first_name}'s explanation as not
                confirmed(this is not what I said) */}
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
                      createConversation: false,
                      updateItem: true,
                      id: firstItem.id,
                      status: "not_confirmed"
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
                    elevation: 20,
                    shadowColor: "black",
                    shadowRadius: 3,
                    shadowOffset: { x: 3, y: 3 },
                    shadowOpacity: 0.2
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
              {/* <TouchableOpacity
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  right: 15,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  updateItem(firstItem.id, "not_confirmed")
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
                    elevation: 20,
                    shadowColor: "black",
                    shadowRadius: 3,
                    shadowOffset: { x: 3, y: 3 },
                    shadowOpacity: 0.2
                  }}
                >
                  <Icon name="close" color={"white"} size={25} />
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      )
    }

    if (
      user.id == firstItem.owner &&
      firstItem.status.toLowerCase() == "sent" &&
      conversation.items?.length > 1 &&
      conversation.items?.[1].status.toLowerCase() != "confirmed"
    ) {
      //  You have sent the explanation video
      return (
        <View
          style={{
            height: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Understanding sent</Text>
            <Text style={{ color: Theme.GRAY }}>
              Great! Listening is not easy and is critical to the success of any
              relationship.
              {/* Waiting - In the meantime remember while this conversation may be
              old to you, It may be new to them. Try to be patient. */}
              {/* Waiting for {firstItem.speaker.first_name} to respond */}
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
                    createConversation: false,
                    id: conversation.id
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
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
    if (
      user.id == firstItem.owner &&
      firstItem.status.toLowerCase() == "confirmed" &&
      !conversation.resolved
    ) {
      //  Speaker confirmed and switched the roles you are speaker now
      return (
        <View
          style={{
            minHeight: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 14 }}>
              Bring your view into the conversation
              {/* Bring your opinion now into the conversation */}
            </Text>
            <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
              Start speaking in a speaker role and bring your view
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
                    createConversation: false,
                    id: conversation.id
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
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
    if (
      user.id == firstItem.owner &&
      firstItem.status.toLowerCase() == "not_confirmed"
    ) {
      //  You have received and you have to explain
      return (
        <View
          style={{
            minHeight: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 14 }}>
              {firstItem.speaker.first_name} responded{" "}
            </Text>
            <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
              We think there still maybe some misunderstanding. We tried to
              expound on the information given.
              {/* {firstItem.speaker.first_name} doesn’t confirm that you rephrased
              his video in the right way as he intended to say{" "} */}
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
                    createConversation: false,
                    id: conversation.id
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
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

    if (
      user.id == firstItem.owner &&
      firstItem.status.toLowerCase() == "sent" &&
      conversation.items.length > 1 &&
      conversation.items?.[1].status.toLowerCase() == "confirmed"
    ) {
      // After switching the role you are now speaker and asked question already
      return (
        <View
          style={{
            minHeight: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Waiting</Text>
            <Text style={{ color: Theme.GRAY }}>
              In the meantime remember while this conversation may be old to
              you, It may be new to them. Try to be patient.
              {/* Waiting for {firstItem.listener.first_name} to reply */}
            </Text>
          </View>
        </View>
      )
    }
    if (
      user.id != firstItem.owner &&
      firstItem.status.toLowerCase() == "sent" &&
      conversation.items.length > 1 &&
      conversation.items?.[1].status.toLowerCase() == "confirmed"
    ) {
      // After switching the role you are now listener and explain in your own word

      return (
        <View
          style={{
            height: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2
          }}
        >
          <View style={{ flex: 3 }}>
            <Text style={{ fontSize: 16 }}>Show understanding</Text>
            <Text style={{ color: Theme.GRAY }}>
              Explain what you heard in your own words. Remember this is not
              agreement or disagreement. Its simply to show understanding. If
              you aren't sure. Ask questions.
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
                    createConversation: false,
                    id: conversation.id
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
                  elevation: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
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
    if (conversation.resolved) {
      //  Speaker confirmed and switched the roles you are speaker now
      return (
        <View
          style={{
            minHeight: 80,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "white",

            width: 100,
            height: 100,
            borderRadius: 50,
            elevation: 1,
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={{ height: 80, width: 80 }}
          />
        </View>
      )
    }
    // ----------------------------------------------New Code End---------------------------
  }
  const renderResolveButton = conversation => {
    if (conversation.can_resolve && user.id != conversation.person_from) {
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
    if (conversation.can_resolve && user.id == conversation.person_from) {
      return (
        <View style={{ flex: 0.3, justifyContent: "center" }}>
          <TouchableOpacity
            style={ButtonStyle.button}
            onPress={() => {
              resolveArgument(conversation)
            }}
          >
            <Text style={{ color: "white" }}>Mark it as resolved</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if (conversation.resolved) {
      return (
        <View style={{ flex: 0.3, justifyContent: "center" }}>
          <Text
            style={{
              color: Theme.THEME_COLOR,
              alignSelf: "center",
              fontSize: 24
            }}
          >
            Resolved!
          </Text>

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
  }
  const resolveArgument = async conversation => {
    console.warn(conversation.id)
    axios({
      method: "POST",
      // url: BaseURL.concat(
      //   "/conversation/items/" + conversation.items?.[0].id + "/resolve/"
      // ),
      url: BaseURL.concat(
        "/conversation/conversation/" + conversation.id + "/resolve/"
      ),
      data: { resolved: true },
      headers: await GET_HEADER()
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
      .catch(ex => {
        console.warn(ex.response)
        Toast.show({
          type: "error",
          text1: "Something went wrong ",
          position: "bottom",
          visibilityTime: 3000
        })
      })
  }
  async function updateItem(id, status) {
    console.warn(id)
    console.warn(status)
    axios({
      method: "PATCH",
      headers: await GET_HEADER(),
      url: BaseURL.concat("/conversation/items/" + id + "/"),
      data: { status: status }
    })
      .then(res => {
        console.warn(res)
        props.navigation.popToTop()
      })
      .catch(ex => {
        console.warn(ex.response)
        Toast.show({
          type: "error",
          text1: "Something went wrong ",
          position: "bottom",
          visibilityTime: 3000
        })
      })
  }
  const renderSpeaker = (conversation, status) => {
    var speaker = conversation.items?.[0].speaker
    var uri = ""
    conversation.items?.some(element => {
      if (speaker.id == element.owner) {
        uri = element.video
        return true
      }
    })
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginRight: -50,
          elevation: 2,
          zIndex: 4,
          shadowColor: "black"
          // shadowRadius: 3,
          // shadowOffset: { x: 3, y: 3 },
          // shadowOpacity: 0.2
        }}
      >
        <Text>{speaker.first_name}</Text>
        <TouchableOpacity
          style={{
            width: 130,
            height: 130,
            borderRadius: 100,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={async () => {
            props.navigation.navigate("ViewVideo", {
              data: { uri: uri }
            })
          }}
        >
          <Avatar
            source={{
              uri:
                speaker.profile_picture != null
                  ? speaker.profile_picture
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }}
            rounded
            size={uri != "" ? 100 : 130}
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
    )
  }
  function renderListener(conversation, status) {
    var listener = conversation.items?.[0].listener
    var uri = ""
    conversation.items?.some(element => {
      if (listener.id == element.owner) {
        uri = element.video
        return true
      }
    })
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          //   backgroundColor: "blue",
          marginLeft: conversation.items?.[0].status == "replied" ? -60 : -60
        }}
      >
        <Text>{listener.first_name}</Text>
        <TouchableOpacity
          disabled={!conversation.items?.[0].status == "replied"}
          style={{
            width: 130,
            height: 130,
            borderRadius: 100,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red"
          }}
          onPress={async () => {
            await props.navigation.navigate("ViewVideo", {
              data: { uri: uri }
            })
          }}
        >
          <Avatar
            source={{
              uri:
                listener.profile_picture != null
                  ? listener.profile_picture
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }}
            rounded
            size={
              conversation.items?.[0].status == "replied" || uri != ""
                ? 130
                : 130
            }
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
            source={require("../../assets/headphones.png")}
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
    )
  }
  const renderAvatarView = (sent, received, conversation) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20
        }}
      >
        {renderSpeaker(conversation.conversation, conversation.status)}
        {renderListener(conversation.conversation, conversation.status)}
      </View>
    )
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      style={styles.ScrollView_1}
    >
      <View style={{ flex: 1 }}>
        <HeaderWhite
          text={conversation.speaker.first_name}
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
            // flexDirection: "row"
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
              justifyContent: "space-evenly",
              shadowColor: "black",
              shadowRadius: 3,
              shadowOffset: { x: 3, y: 3 },
              shadowOpacity: 0.2,
              // backgroundColor: "red",
              flexDirection: "row"
            }}
          >
            <View style={{ justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16 }}>Category:</Text>
                <Text style={{ fontSize: 16 }}>
                  {conversation.conversation.category}
                </Text>
              </View>
              <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
                {/* {moment("2022-01-24T11:31:45.150079").format(
                  "DD MMMM, yyyy H:mma"
                )} */}
                {moment(
                  convertUTCDateToLocalDate(
                    conversation.conversation.created_at
                  )
                ).format("DD MMMM, yyyy hh:mma")}
              </Text>
              <Text style={{ color: Theme.THEME_COLOR, fontSize: 16 }}>
                {conversation.conversation.topic}
              </Text>
            </View>

            <Text style={{ fontSize: 9, color: "black" }}>
              Video expires in 3h
            </Text>
          </View>
          <View style={{ flex: 0.7 }}>
            {renderAvatarView(sent, received, conversation)}

            {renderMessage(conversation)}
          </View>
          {renderResolveButton(conversation.conversation)}
        </View>
      </View>
    </ScrollView>
  )
  function convertUTCDateToLocalDate(date) {
    var dateFormat = "DD MMMM, yyyy H:mma"
    var testDateUtc = moment.utc(date)
    var localDate = testDateUtc.local()

    return localDate
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
  pickerContainerStyle: { marginVertical: 10 }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(speakerScreen)
