import React, { useState } from "react"
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
import HeaderWhite from "../../Component/HeaderWhite"
import ImagePicker from "react-native-image-crop-picker"
import { useSelector, useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import axios from "axios"
import { BaseURL, GET_HEADER } from "../../Connection/index"
import { update } from "../../features/user"
// edited
function ProfileScreen(props) {
  const [uploadingImage, SetUploadingImage] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value.user)
  const state = useSelector(state => state.user)
  const [imageData, setImageData] = useState("")
  const [imageUri, SetImageUri] = useState(
    user?.profile_picture != null
      ? user.profile_picture
      : "https://th.bing.com/th/id/R.d7e225fbcef887e32a0cef4f28c333ba?rik=V3gaVPpl%2bwuUiA&pid=ImgRaw&r=0"
  )
  const [firstname, setFirstName] = useState(user?.first_name)
  const [lastname, setLastName] = useState(user?.last_name)
  const [email, setEmail] = useState(user?.email)
  const [submitting, setSubmitting] = useState(false)

  async function uploadProfilePicture() {
    SetUploadingImage(true)
    return axios({
      method: "POST",
      url: BaseURL.concat("/user/set_profile_picture/"),
      headers: await GET_HEADER(),
      data: { image: imageData }
    })
      .then(res => {
        console.warn(res)
        // dispatch(actionCategories(res.data.results))
        dispatch(update(res.data))
        return res
      })
      .catch(function (error) {
        console.warn(error)
        // Toast.show({
        //   type: "error",
        //   text1: error,
        //   position: "bottom",
        //   visibilityTime: 3000
        // })
        SetUploadingImage(false)
      })
      .finally(() => {
        // setSubmitting(false)
      })
  }
  async function updateUser() {
    return axios({
      method: "patch",
      url: BaseURL.concat("/user/" + user.id + "/"),
      headers: await GET_HEADER(),
      data: {
        email: email,
        first_name: firstname,
        last_name: lastname
      }
    })
      .then(res => {
        dispatch(update(res.data))
        Toast.show({
          type: "success",
          text1: "User updated successfully",
          position: "bottom",
          visibilityTime: 3000
        })
        // dispatch(actionCategories(res.data.results))
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: error,
          position: "bottom",
          visibilityTime: 3000
        })
        SetUploadingImage(false)
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
        <HeaderWhite
          onPress={() => {
            props.navigation.goBack()
          }}
          updateUser={async () => {
            if (firstname == "" || lastname == "" || email == "") {
              Toast.show({
                type: "error",
                text1: "Fill in all the fields",
                position: "bottom",
                visibilityTime: 3000
              })
            } else {
              setSubmitting(true)
              await uploadProfilePicture()
              await updateUser()
              setSubmitting(false)
            }
          }}
          text="Profile Info"
        />
        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
              width: "100%",
              padding: 15
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                borderColor: "gray",
                borderRadius: 10
              }}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  includeBase64: true,
                  cropping: false
                }).then(image => {
                  setImageData(image.mime + ";base64," + image.data)
                  SetImageUri(image.path)
                })
              }}
            >
              <Image
                source={{
                  uri: imageUri
                }}
                style={{
                  height: 120,
                  width: 120,
                  resizeMode: "cover",
                  borderRadius: 10
                }}
              ></Image>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: "green",
                  position: "absolute",
                  bottom: -5,
                  right: -5
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%"
            }}
          >
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor={"white"}
              placeholder="Name"
              value={firstname}
              onChangeText={text => setFirstName(text)}
            ></TextInput>
            <TextInput
              style={styles.textInputStyle}
              placeholderTextColor={"white"}
              placeholder="Last Name"
              value={lastname}
              onChangeText={text => setLastName(text)}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              flex: 1,
              width: "100%"
            }}
          >
            <TextInput
              style={[
                styles.textInputStyle,
                {
                  flex: 0.92,
                  alignSelf: "center",
                  backgroundColor: Theme.THEME_COLOR
                }
              ]}
              placeholderTextColor={"white"}
              keyboardType="email-address"
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{}}>
            <TouchableOpacity
              style={styles.roundButtonLarge}
              onPress={() => {
                !user.is_member ? props.navigation.navigate("Membership") : null
              }}
            >
              <Image
                source={require("../../assets/crown.png")}
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {user.is_member ? (
            <View
              style={{
                flex: 0.2,
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: Theme.THEME_COLOR,
                  fontWeight: "bold",
                  fontSize: 22
                }}
              >
                You are a member
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 0.2,
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: Theme.THEME_COLOR,
                  fontWeight: "bold",
                  fontSize: 22
                }}
              >
                Upgrade to premium
              </Text>
              <View
                style={{
                  width: 25,
                  height: 4,
                  borderRadius: 10,
                  backgroundColor: Theme.THEME_COLOR
                }}
              />
              <Text
                style={{
                  color: Theme.THEME_COLOR,
                  fontSize: 18
                }}
              >
                Get rid of ads{" "}
              </Text>
            </View>
          )}
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
    shadowOpacity: 0.2,
    height: 50
  }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
