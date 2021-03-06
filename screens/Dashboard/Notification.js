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
  FlatList,
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
import HeaderWhite from "../../Component/HeaderWhite"
import ImagePicker from "react-native-image-crop-picker"
import { useSelector, useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import axios from "axios"
import { BaseURL, GET_HEADER } from "../../Connection/index"
import { update } from "../../features/user"
import { Avatar } from "react-native-elements/dist/avatar/Avatar"
// edited
function ProfileScreen(props) {
  const [uploadingImage, SetUploadingImage] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value.user)
  const state = useSelector(state => state.user)
  console.warn(state)
  const [imageData, setImageData] = useState("")
  const [imageUri, SetImageUri] = useState(
    user.profile_picture != null
      ? user.profile_picture
      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
  )
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])
  useEffect(async () => {
    async function getNotifications() {
      setLoading(true)
      axios({
        method: "get",
        url: BaseURL.concat("/notifications/"),
        headers: await GET_HEADER()
      })
        .then(res => {
          console.warn("hello")
          console.warn(res)
          setNotifications(res.data.results) // dispatch(actionCategories(res.data.results))
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
    const networkCall = async () => {
      // await getCategories()
      await getNotifications()
    }
    networkCall()
  }, [])
  const renderItem = ({ item, index }) => {
    console.warn(item?.sender?.profile_picture)
    if (item.level == "invitation") {
      return (
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            minHeight: 120,
            backgroundColor: "white",
            borderRadius: 15,
            elevation: 4,
            flexDirection: "row",
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { x: 3, y: 3 },
            shadowOpacity: 0.2,
            marginTop: index == 0 ? 10 : 0
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
              size={60}
              source={{
                uri: item?.sender?.profile_picture
              }}
              imageProps={{
                resizeMode: "contain"
              }}
            ></Avatar>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: "center"
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.description}</Text>
            <Text
              style={{
                marginTop: 5,
                color: Theme.GRAY,
                fontSize: 12
              }}
            >
              {item.timesince}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: 5
              }}
            >
              <TouchableOpacity
                style={{
                  width: "40%",
                  height: 40,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 2,
                  shadowColor: "black",
                  shadowRadius: 2,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
                }}
                onPress={() => RequestAction(item.action.reject)}
              >
                <Icon
                  name="close"
                  color={"red"}
                  size={24}
                  style={{ fontWeight: "bold" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "40%",
                  height: 40,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 2,
                  shadowColor: "black",
                  shadowRadius: 2,
                  shadowOffset: { x: 3, y: 3 },
                  shadowOpacity: 0.2
                }}
                onPress={() => RequestAction(item.action.accept)}
              >
                <Icon
                  name="done"
                  color={"green"}
                  size={24}
                  style={{ fontWeight: "bold" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    return (
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          height: 100,
          backgroundColor: "white",
          borderRadius: 15,
          elevation: 4,
          flexDirection: "row",
          shadowColor: "black",
          shadowRadius: 3,
          shadowOffset: { x: 3, y: 3 },
          shadowOpacity: 0.2
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
            size={60}
            source={{
              uri: item?.sender?.profile_picture
            }}
            containerStyle={{ borderWidth: 0.5, borderColor: "#dcdcdc" }}
          ></Avatar>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: Theme.THEME_COLOR,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: 5,
              bottom: 15
            }}
          >
            <Image
              source={require("../../assets/headphone.png")}
              resizeMode="contain"
              style={{ height: "60%", width: "60%" }}
            />
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text
            style={{
              marginTop: 5,
              color: Theme.GRAY,
              fontSize: 12
            }}
          >
            {item.timesince}
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
          <Icon
            name="keyboard-arrow-right"
            size={25}
            color={Theme.THEME_COLOR}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.THEME_COLOR,

          paddingHorizontal: 20,
          paddingTop: 20
        }}
      >
        <TouchableOpacity
          style={[
            styles.roundButton,
            {
              position: "absolute",
              right: 20,
              top: 70,
              elevation: 4,
              shadowColor: "black",
              shadowRadius: 3,
              shadowOffset: { x: 3, y: 3 },
              shadowOpacity: 0.2
            }
          ]}
          onPress={() => {
            props.navigation.goBack()
          }}
        >
          <Icon name="close" size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1.8,
          backgroundColor: "white",
          borderTopRightRadius: 100,
          marginTop: -200,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 28,
            color: "black",
            marginTop: 30
          }}
        >
          Notifications
        </Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          extraData={notifications}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={{ marginTop: 20, flex: 1 }}
        />
      </View>
    </View>
  )
  async function RequestAction(url_endpoint) {
    setLoading(true)
    axios({
      method: "POST",
      url: BaseURL.concat("/" + url_endpoint),
      headers: await GET_HEADER()
    })
      .then(res => {
        console.warn(res)
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
    elevation: 4,
    backgroundColor: "white",
    alignSelf: "center",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  textInputStyle: {
    flex: 0.44,
    backgroundColor: Theme.THEME_COLOR,
    borderRadius: 3,
    elevation: 3,
    paddingHorizontal: 10,
    color: "white",
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
