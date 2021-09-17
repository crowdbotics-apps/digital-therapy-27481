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
export class Blank extends React.Component {
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
          <View
            style={{
              flexDirection: "row",
              flex: 0.1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}
          >
            <TouchableOpacity style={styles.roundButton}>
              <Icon name="more-horiz" size={30} color={"#666666"} />
            </TouchableOpacity>
            <View>
              <Image
                source={require("../../assets/logo_text.png")}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.roundButton}>
              <Icon name="notifications" size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ImageBackground
              source={require("../../assets/splash_back.png")}
              style={{
                width: "80%",
                flex: 0.5,
                alignSelf: "center",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center"
              }}
              imageStyle={{
                width: "100%",
                borderRadius: 25
              }}
            >
              <Image
                source={require("../../assets/logo.png")}
                style={{ height: 200, resizeMode: "contain" }}
              ></Image>
            </ImageBackground>
          </View>
          <View
            style={{
              flex: 0.15,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ImageBackground
              source={require("../../assets/depth.png")}
              style={{
                width: "60%",
                flex: 1,
                alignSelf: "center",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center"
              }}
              imageStyle={{
                width: "100%",
                borderRadius: 25
              }}
              resizeMode="contain"
            >
              <View
                style={{
                  flexDirection: "row",
                  height: "70%",
                  width: "90%",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity style={styles.roundButtonLarge}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 5,
                      borderColor: Theme.THEME_COLOR,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="add"
                      size={16}
                      style={{ fontWeight: "bold" }}
                      color={Theme.THEME_COLOR}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButtonLarge}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 5,
                      borderColor: Theme.THEME_COLOR,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="arrow-downward"
                      size={16}
                      style={{ fontWeight: "bold" }}
                      color={Theme.THEME_COLOR}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <TouchableOpacity
              style={[
                styles.roundButton,
                {
                  position: "absolute",
                  bottom: -10,
                  alignSelf: "center",
                  backgroundColor: "rgba(34, 34, 34, 0.2)",
                  width: 40,
                  height: 40,
                  elevation: 0
                }
              ]}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center"
                }}
              >
                <Icon
                  name="arrow-upward"
                  size={16}
                  style={{ fontWeight: "bold" }}
                  color={"white"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.35,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 0.4,
                width: "85%",
                backgroundColor: "white",
                elevation: 3,
                borderBottomLeftRadius: 35,
                borderTopRightRadius: 35
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: profile ? Theme.HOME_SELECTION : "white"
                }}
                onPress={() => {
                  this.setState({ home: false, account: false, profile: true })
                  this.props.navigation.navigate("ProfileScreen")
                }}
              >
                <Image
                  source={require("../../assets/profile.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: profile ? "black" : "gray"
                  }}
                ></Image>
                <Text style={{ color: profile ? "black" : "gray" }}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 35,
                  borderTopRightRadius: 35,
                  backgroundColor: home ? Theme.HOME_SELECTION : "white",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({ home: true, account: false, profile: false })
                }}
              >
                <Image
                  source={require("../../assets/swiper.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: home ? "black" : "gray"
                  }}
                ></Image>
                <Text style={{ color: home ? "black" : "gray" }}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderTopRightRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: account ? Theme.HOME_SELECTION : "white"
                  //   marginLeft: -20
                }}
                onPress={() => {
                  this.setState({ home: false, account: true, profile: false })
                }}
              >
                <Image
                  source={require("../../assets/matches.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: account ? "black" : "gray"
                  }}
                ></Image>
                <Text style={{ color: account ? "black" : "gray" }}>
                  Account
                </Text>
              </TouchableOpacity>
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
    elevation: 2,
    backgroundColor: "white"
  }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Blank)
