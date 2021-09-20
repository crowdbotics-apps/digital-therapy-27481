import React from "react"
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
// edited
export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = { home: true, account: false, profile: false }
  }
  render() {
    const { home, account, profile } = this.state
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
        style={styles.ScrollView_1}
      >
        <View style={{ flex: 1 }}>
          <HeaderWhite text="Profile Info" />
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
              <View>
                <Image
                  source={require("../../assets/profilepic.png")}
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
              </View>
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
              ></TextInput>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor={"white"}
                placeholder="Last Name"
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
              <TouchableOpacity style={styles.roundButtonLarge}>
                <Image
                  source={require("../../assets/crown.png")}
                  style={{ width: 35, height: 35 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
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
          </View>
        </View>
      </ScrollView>
    )
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
    backgroundColor: "white"
  },
  roundButtonLarge: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    backgroundColor: "white",
    alignSelf: "center"
  },
  textInputStyle: {
    flex: 0.44,
    backgroundColor: Theme.THEME_COLOR,
    borderRadius: 3,
    elevation: 3,
    paddingHorizontal: 10
  }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
