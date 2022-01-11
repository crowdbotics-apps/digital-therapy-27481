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
  ScrollView,
  FlatList
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
import { GET_HEADER, BaseURL } from "../../Connection/index"

import axios from "axios"
import Toast from "react-native-toast-message"
import { useSelector } from "react-redux"

// edited
function SelfVideos(props) {
  const [selfVideos, setSelfVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.value.user)

  useEffect(() => {
    getSelfVideos()
  }, [])
  async function getSelfVideos() {
    axios({
      method: "get",
      url: BaseURL.concat("/conversation/items/self/"),
      headers: await GET_HEADER()
    })
      .then(res => {
        console.warn(res)
        setSelfVideos(res.data.results)
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
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 100,
          backgroundColor: "white",
          borderRadius: 15,
          elevation: 4,
          flexDirection: "row",
          marginVertical: 5,
          marginHorizontal: 5,
          shadowColor: "black",
          shadowRadius: 3,
          shadowOffset: { x: 3, y: 3 },
          shadowOpacity: 0.2
        }}
        onPress={() => {
          props.navigation.replace("HomeScreen", {
            editSelf: true,
            conversationId: item.conversation.id
          })
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
                user.profile_picture != null
                  ? user.profile_picture
                  : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
            }}
          ></Avatar>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{item.conversation.topic}</Text>
          <Text
            style={{
              marginTop: 5,
              color: Theme.GRAY,
              fontSize: 12
            }}
          >
            {item.conversation.timesince}
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
          <Text style={{ color: Theme.THEME_COLOR }}>Send to</Text>
          <Icon
            name="keyboard-arrow-right"
            size={25}
            color={Theme.THEME_COLOR}
          />
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
        text="Self Videos"
        onPress={() => props.navigation.goBack()}
        showRecord
        navigation={props.navigation}
        onRecordPress={() => {
          props.navigation.replace("HomeScreen", { createSelf: true })
        }}
      />

      <View
        style={{
          flex: 1,
          width: "90%",
          alignSelf: "center"
        }}
      >
        <Text style={ButtonStyle.textStyleHeading}>Self Videos</Text>
        {selfVideos.length > 0 ? (
          <FlatList
            data={selfVideos}
            renderItem={renderItem}
            extraData={selfVideos}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            style={{}}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>You have no self video </Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SelfVideos)
