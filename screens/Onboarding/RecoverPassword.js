import React from "react"
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

const RecoverPassword = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.fStyle}>{strings.createNewPassowrd} </Text>

      <View>
        <Text style={styles.textStyle}>{strings.typeInPassword}</Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          // flexDirection: "row",
          justifyContent: "center",
          flex: 0.8
        }}
      >
        {/* Password */}
        <View style={styles.inputStyle}>
          <Icon name="lock" size={18} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        {/* Confirm Password */}
        <View style={styles.inputStyle}>
          <Icon name="lock" size={18} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.signInBackground}>
        <TouchableOpacity
          style={styles.signInTextBackground}
          // onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.signInColorTextBackground}>
            {" "}
            {strings.changePassword}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ViewStyle: {
    justifyContent: "center",
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  textInputStyle: { flex: 1, paddingLeft: 15 },

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
    top: 70,
    color: Theme.THEME_COLOR,
    fontSize: 30,
    fontWeight: "bold"
  },

  textStyle: {
    marginTop: 100,
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

  signInColorTextBackground: {
    fontSize: 16,
    color: "white"
    // fontWeight: "bold"
  }
})

export default RecoverPassword
