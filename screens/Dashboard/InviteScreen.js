import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native"
import Theme from "../../Styles/Theme"
import Icon from "react-native-vector-icons/MaterialIcons"
import strings from "../../Localization"
import HeaderWhite from "../../Component/HeaderWhite"
import { connect } from "react-redux"
import axios from "axios"
import { BaseURL, Header, SET_TOKEN, GET_HEADER } from "../../Connection/index"
import Toast from "react-native-toast-message"
const InviteScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderWhite
        text="Invite friends"
        hideIcon
        onPress={() => {
          navigation.goBack()
        }}
      />
      <View
        style={{
          flex: 0.4,
          justifyContent: "center"
        }}
      >
        <Text style={styles.fStyle}>
          Invite your friends to the Resolve app{" "}
        </Text>
        <Text style={styles.textStyle}>
          Please enter the email of a person that you want to invite
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          // flexDirection: "row",
          justifyContent: "center",
          flex: 0.4
        }}
      >
        {/* Email */}
        <View style={styles.inputStyle}>
          <Icon name="alternate-email" size={18} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      <View style={styles.signInBackground}>
        <TouchableOpacity
          style={styles.signInTextBackground}
          onPress={() => {
            if (email != "") {
              if (validateEmail(email)) {
                SendInvite()
              }
            } else {
              Toast.show({
                type: "error",
                text1: "Input email address to send an invite.",
                position: "bottom",
                visibilityTime: 3000
              })
            }
          }}
        >
          <Text style={styles.signInColorTextBackground}>{strings.invite}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  function validateEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === false) {
      Toast.show({
        type: "error",
        text1: "Input valid email",
        visibilityTime: 3000,
        position: "bottom"
      })

      return false
    } else {
      return true
    }
  }
  async function SendInvite() {
    setLoading(true)
    await axios({
      method: "POST",
      url: BaseURL.concat("/invite"),
      headers: await GET_HEADER(),
      data: {
        // category: "friend",
        // invited_email: email,
        email: email
        // topic:
        //   "Hi, I would like to invite you to resolve speaker listener application"
      }
    })
      .then(res => {
        Toast.show({
          type: "success",
          text1: "Invitaion has been sent to " + email,
          position: "bottom",
          visibilityTime: 3000
        })
        setTimeout(() => {
          navigation.goBack()
        }, 1500)

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
  ViewStyle: {
    justifyContent: "center",
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  inputStyle: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: Theme.TEXTINPUT_BORDER_COLOR,
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "90%",
    alignSelf: "center"
  },
  fStyle: {
    marginHorizontal: 15,

    color: Theme.THEME_COLOR,
    fontSize: 30,
    fontWeight: "bold"
  },

  textStyle: {
    marginTop: 30,
    marginHorizontal: 22,
    color: "grey"
  },

  emailStyle: {
    top: 50,
    borderBottomColor: "black",
    borderBottomWidth: 0.8,
    margin: 39
  },

  emailIconStyle: {
    top: 100,
    marginHorizontal: 40
  },

  emailTextStyle: {
    fontSize: 16,
    marginHorizontal: 50,
    bottom: 10
  },

  signInBackground: {
    marginTop: 75,
    backgroundColor: Theme.THEME_COLOR,
    height: 45,
    borderRadius: 6,
    marginHorizontal: 39
  },

  signInTextBackground: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  textInputStyle: { flex: 1, paddingLeft: 15, paddingVertical: 15 },

  signInColorTextBackground: {
    fontSize: 16,
    color: "white"
    // fontWeight: "bold"
  }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen)
