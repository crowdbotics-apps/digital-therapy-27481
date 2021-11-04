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
import { CurrentRenderContext } from "@react-navigation/core"
import user from "../../features/user"
import { useSelector } from "react-redux"
// edited
function SentVideos(props) {
  const [sentVideos, setSentVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.value.user)
  useEffect(() => {
    getSentVideos()
  }, [])

  async function getSentVideos() {
    axios({
      method: "get",
      url: BaseURL.concat("/conversation/items/sent/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        console.warn(res)
        setSentVideos(res.data.results)
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
              {item.listener.name} resolved your explanation
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
    if (
      item.argument &&
      !item.should_resolve &&
      user.id == item.conversation.person_from
    ) {
      return (
        <Text style={{ color: "gray", marginLeft: 20, fontSize: 14 }}>
          You resolved {item.listener.name}'s explanation
        </Text>
      )
    }
    if (item.argument && item.should_resolve && user.id == item.speaker.id) {
      return (
        <Text style={{ color: "gray", marginLeft: 20, fontSize: 14 }}>
          {item.listener.name} has not responded yet to this argument
        </Text>
      )
    } else if (
      !item.argument &&
      !item.should_resolve &&
      user.id == item.speaker.id
    ) {
      //  switched the role and replied back
      return (
        <Text
          style={{
            color: "gray",
            marginLeft: 20,
            marginVertical: 5,
            fontSize: 14
          }}
        >
          <Text style={{ color: "gray", marginLeft: 20, fontSize: 14 }}>
            Waiting for {item.listener.name} to approve
          </Text>
        </Text>
      )
    }
    if (
      item.argument &&
      item.should_resolve &&
      user.id == item.conversation.person_to
    ) {
      return (
        <Text
          style={{
            color: "gray",
            marginLeft: 20,
            marginVertical: 5,
            fontSize: 14
          }}
        >
          {item.speaker.name} has approved your explanation, you are the speaker
          now! Record your video and bring your word to the table!"
        </Text>
      )
    } else if (
      !item.argument &&
      !item.should_resolve &&
      user.id == item.conversation.person_to &&
      item.speaker.id == user.id
    ) {
      return (
        <Text style={{ color: "gray", marginLeft: 20, fontSize: 14 }}>
          Waiting for {item.listener.name} to approve
        </Text>
      )
    } else if (
      !item.argument &&
      !item.should_resolve &&
      user.id == item.conversation.person_to
    ) {
      return (
        <Text style={{ color: "gray", marginLeft: 20, fontSize: 14 }}>
          {item.listener.name} has not responded yet to this response
        </Text>
      )
    }
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
            received: false,
            sent: true
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
              Let's resolve this!
            </Text>
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
        <View style={{ flex: 0.4, flexDirection: "row" }}>
          <View style={{ flex: 3, justifyContent: "center" }}>
            {renderText(item)}
          </View>
          {!item.resolved ? (
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
                  source={require("../../assets/soundwaves.png")}
                  resizeMode="contain"
                  style={{ height: "70%", width: "70%" }}
                />
              </View>
            </View>
          ) : null}
        </View>
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
        text="Sent videos"
        onPress={() => props.navigation.goBack()}
        hideIcon
        navigation={props.navigation}
      />

      <View
        style={{
          flex: 1,
          width: "90%",
          alignSelf: "center"
        }}
      >
        <Text style={ButtonStyle.textStyleHeading}>Sent Videos</Text>
        {sentVideos.length > 0 ? (
          <FlatList
            data={sentVideos}
            renderItem={renderItem}
            extraData={sentVideos}
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
            <Text>You have no sent conversation</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SentVideos)
