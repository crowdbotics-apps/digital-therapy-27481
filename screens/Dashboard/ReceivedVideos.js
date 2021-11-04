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
import { GET_HEADER, BaseURL } from "../../Connection/index"
import axios from "axios"
import Toast from "react-native-toast-message"
import moment from "moment"
import { useSelector } from "react-redux"
// edited
function ReceivedVideos(props) {
  const [receivedVideos, setReceivedVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.value.user)
  useEffect(() => {
    getReceivedVideos()
  }, [])
  async function getReceivedVideos() {
    axios({
      method: "get",
      url: BaseURL.concat("/conversation/items/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        setReceivedVideos(res.data.results)
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
  const renderText = item => {
    console.warn("argument:" + item.argument)
    console.warn("should_resolve:" + item.should_resolve)
    // I am not the initiator of this conversation
    if (item.resolved) {
      return (
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/emoji.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              You resolved {item.speaker.name}'s explanation
            </Text>
            {/* <Text>You resolved {item.speaker.name}'s explanation</Text> */}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                // backgroundColor: Theme.THEME_COLOR,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          </View>
        </View>
      )
    }
    // I am not the initiator and initiator resolved this conversation now I am the speaker and I can create another argument
    if (item.argument && !item.should_resolve) {
      return (
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/emoji.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>Approved!</Text>
            <Text>
              {item.speaker.name} approved your explanation, you are the speaker
              now! Record your video and bring your word to the table!
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: Theme.THEME_COLOR,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20
              }}
            >
              <Image
                source={require("../../assets/headphone.png")}
                resizeMode="contain"
                style={{ height: "60%", width: "60%" }}
              />
            </View>
          </View>
        </View>
      )
    }

    if (
      item.argument &&
      item.should_resolve &&
      item.conversation.person_from != user?.id
    ) {
      return (
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/emoji.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              Check out this video
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: Theme.THEME_COLOR,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../../assets/headphone.png")}
                resizeMode="contain"
                style={{ height: "60%", width: "60%" }}
              />
            </View>
          </View>
        </View>
      )
    }
    // I was the initiator of this conversation
    if (
      item.argument &&
      item.should_resolve &&
      item.conversation.person_from == user?.id
    ) {
      return (
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/emoji.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>
              Check out this video
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: Theme.THEME_COLOR,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../../assets/headphone.png")}
                resizeMode="contain"
                style={{ height: "60%", width: "60%" }}
              />
            </View>
          </View>
        </View>
      )
    }

    // I was the initiator and listener has responded
    else if (!item.argument && !item.should_resolve) {
      return (
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../assets/emoji.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            <Text style={{ color: "gray", fontSize: 16 }}>Confirm</Text>
            <Text>Confirm {item.speaker.name}'s explanation</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: Theme.THEME_COLOR,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../../assets/headphone.png")}
                resizeMode="contain"
                style={{ height: "60%", width: "60%" }}
              />
            </View>
          </View>
        </View>
      )
    }
    // // I was not the initiator of this conversation
    // else if (
    //   item.argument &&
    //   !item.should_resolve &&
    //   item.conversation.person_from == user.id
    // ) {
    //   return (
    //     <View style={{ flex: 0.4, flexDirection: "row" }}>
    //       <View
    //         style={{
    //           flex: 1,
    //           justifyContent: "center",
    //           alignItems: "center"
    //         }}
    //       >
    //         <Image
    //           source={require("../../assets/emoji.png")}
    //           style={{ width: 20, height: 20 }}
    //           resizeMode="contain"
    //         />
    //       </View>
    //       <View style={{ flex: 3, justifyContent: "center" }}>
    //         <Text style={{ color: "gray", fontSize: 16 }}>Approved!</Text>
    //         <Text>
    //           {item.speaker.name} approved your explanation, you are the speaker
    //           now! Record your video and bring your word to the table!
    //         </Text>
    //       </View>
    //       <View
    //         style={{
    //           flex: 1,
    //           alignItems: "center",
    //           justifyContent: "center"
    //         }}
    //       >
    //         <View
    //           style={{
    //             width: 40,
    //             height: 40,
    //             borderRadius: 30,
    //             backgroundColor: Theme.THEME_COLOR,
    //             alignItems: "center",
    //             justifyContent: "center"
    //           }}
    //         >
    //           <Image
    //             source={require("../../assets/headphone.png")}
    //             resizeMode="contain"
    //             style={{ height: "60%", width: "60%" }}
    //           />
    //         </View>
    //       </View>
    //     </View>
    //   )
    // }
  }
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 10,
          elevation: 4,
          minHeight: 180,
          justifyContent: "space-evenly",
          backgroundColor: "white",
          marginHorizontal: 5,
          marginVertical: 5,
          shadowColor: "black",
          shadowRadius: 3,
          shadowOffset: { x: 3, y: 3 },
          shadowOpacity: 0.2
          // height: 100
        }}
        onPress={() => {
          props.navigation.navigate("SpeakerScreen", {
            conversation: item,
            received: true,
            sen: false
          })
        }}
      >
        <View
          style={{
            flex: 0.7,
            // backgroundColor: "red",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              rounded
              size="medium"
              source={{
                uri:
                  item.speaker.profile_picture != null
                    ? item.speaker.profile_picture
                    : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
              }}
            ></Avatar>
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.conversation.topic}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: Theme.GRAY,
                fontSize: 12
              }}
            >
              {moment(item.conversation.created_at).format(
                "d MMMM, yyyy H:mma"
              )}
            </Text>
            <Text
              style={{ color: Theme.THEME_COLOR, fontSize: 16, marginTop: 5 }}
            >
              {item.resolved || (item.argument && !item.should_resolve)
                ? "Resolved"
                : "Let's resolve this!"}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Icon name="keyboard-arrow-up" size={25} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#dcdcdc",
            height: 1,
            width: "95%",
            alignSelf: "center"
          }}
        />
        {renderText(item)}
      </TouchableOpacity>
    )
  }
  return (
    // <ScrollView
    //   contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
    //   style={styles.ScrollView_1}
    // >
    <View style={{ flex: 1 }}>
      <HeaderWhite
        text="Received videos"
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
        <Text style={ButtonStyle.textStyleHeading}>Videos</Text>
        {receivedVideos.length > 0 ? (
          <FlatList
            data={receivedVideos}
            renderItem={renderItem}
            extraData={receivedVideos}
            // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>You have no received conversation</Text>
          </View>
        )}
      </View>
    </View>
    // </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(ReceivedVideos)
