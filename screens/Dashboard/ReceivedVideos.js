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
                  user.id == item.conversation.items?.[0].speaker.id
                    ? item.conversation.items?.[0].listener.profile_picture
                    : item.conversation.items?.[0].speaker.profile_picture
              }}
            ></Avatar>
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
              {user.id == item.conversation.items?.[0].speaker.id
                ? item.conversation.items?.[0].listener.first_name
                : item.conversation.items?.[0].speaker.first_name}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: Theme.GRAY,
                fontSize: 12
              }}
            >
              {item.conversation.items?.[0].timesince}

              {moment(
                convertUTCDateToLocalDate(item.conversation.created_at)
              ).format(" h:mma")}
              {/* {moment(item.conversation.created_at).format(" H:mma")} */}
            </Text>
            <Text
              style={{ color: Theme.THEME_COLOR, fontSize: 16, marginTop: 5 }}
            >
              {item.conversation.topic}
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
  function convertUTCDateToLocalDate(date) {
    var dateFormat = "DD MMMM, yyyy H:mma"
    var testDateUtc = moment.utc(date)
    var localDate = testDateUtc.local()

    return localDate
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
