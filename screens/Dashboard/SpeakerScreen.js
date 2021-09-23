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
// edited
export class SpeakerScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      receivedVideos: [1, 2, 3, 4, 5],
      Speaker: true
    }
  }

  render() {
    const { Speaker } = this.state
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
        style={styles.ScrollView_1}
      >
        <View style={{ flex: 1 }}>
          <HeaderWhite
            text="Hary Cross"
            onPress={() => this.props.navigation.goBack()}
            hideIcon
            navigation={this.props.navigation}
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
            <View
              style={{
                height: 100,
                width: "100%",
                elevation: 4,
                backgroundColor: "white",
                borderRadius: 5,
                padding: 10,
                justifyContent: "space-evenly"
              }}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 16 }}>Category:</Text>
                  <Text style={{ fontSize: 16 }}> Couple</Text>
                </View>
                <Text style={{ color: Theme.GRAY, fontSize: 12 }}>
                  Today,11:00pm
                </Text>
              </View>
              <Text style={{ color: Theme.THEME_COLOR, fontSize: 16 }}>
                Which one is better?
              </Text>
            </View>
            <View style={{ flex: 0.7 }}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginRight: -50,
                    elevation: 2
                  }}
                >
                  <Text>Harry Cross</Text>
                  <View
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 100,
                      backgroundColor: Speaker ? "red" : "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Avatar
                      source={{
                        uri:
                          "https://s3-alpha-sig.figma.com/img/a077/4174/e90e7da558343949a212b72e0498120b?Expires=1633305600&Signature=f35MCpCnUJ2F-Rtsi7WRvF5xzBNx9T8CiFc37hDYqxJaTF0esi7SgaesAsfplZAm2EQ~Zfs9lr7~wF0gnGSQXBV3yt7ISo~o50ZGFtd3fC2uZaKUPWTym~hZippyyAOnZ-2rZA323VEXJhtXuUpMxiiMGyphVXI~lFIH3V5EmJzCFVJxbXMp9ndLiL4eGM8aE~vgBUsz5IKYlVmy7RNKnw8yf2Mqld1vLkSzw24hdYO4HdoaPaYZZdQsCJ4OqBnlCPAiOVjtiJWof15OytYCnA0Ksv5ovTiQ4lvxjT-eCOe8aE-AMQY-7ulr4et5OSsS0sZN3u4PzGrPQ2kmkIvI7g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      }}
                      rounded
                      size={100}
                    />
                  </View>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={require("../../assets/soundwaves.png")}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: Theme.THEME_COLOR
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {Speaker ? "Speaker" : "Listener"}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    //   backgroundColor: "blue",
                    marginLeft: -40
                  }}
                >
                  <Text>Jane Alison</Text>
                  <View
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 100,
                      backgroundColor: !Speaker ? "red" : "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Avatar
                      source={{
                        uri:
                          "https://s3-alpha-sig.figma.com/img/c737/9d4a/bb8fda7f8824443fb63da9d8746e1a7e?Expires=1633305600&Signature=ZUGNZJkJ9HI7Hw997En1jlh1YcrLWMd3-r9ThMUT4ShgEckW7s2daoOtnWHvkopd1aNMovD5L5UzI2H3FtY2WQ1jvKyq9qWUUOUlydFVSpGPB8HE7zApaCKiJiBhN~NU~UAMT6htR9DSfduC4Ou6ReWQRWBFyr-rwS7vn0SPXIFPAlw5ZDI9-PC6G~exufMt6evYpRXp2e-4OzGCt45CDKX3hxtThiAzKqO4MgkMSPaY23JF1kMx2Yj~4CYQDWWudDcaWmN4sCyBvl0JHjokK0FJ~Gpf43I2rTGM4p1GvGCjirZFRfFmCF4Zu9C5k6wlPzWty3xEZqsndEItUXrZGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      }}
                      rounded
                      size={!Speaker ? 100 : 130}
                    />
                  </View>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={require("../../assets/soundwaves.png")}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: Theme.THEME_COLOR
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {!Speaker ? "Speaker" : "Listener"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                  alignSelf: "center",
                  flexDirection: "row",
                  backgroundColor: "white",
                  padding: 10,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  shadowOffset: { x: 0, y: 10 },
                  shadowColor: "black",
                  shadowOpacity: 0.6,
                  shadowRadius: 5,
                  elevation: 1
                }}
              >
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 16 }}>Approved</Text>
                  <Text style={{ color: Theme.GRAY }}>
                    Jane approved your explanation, you are the speaker now!
                    Record your video and bring your word to the table!
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      width: 60,
                      height: 60,
                      right: 15,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("Camera")
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        backgroundColor: Theme.THEME_COLOR,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 20
                      }}
                    >
                      <View
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 100,
                          backgroundColor: "white",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      ></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.3, justifyContent: "center" }}>
              <TouchableOpacity style={ButtonStyle.button}>
                <Text style={{ color: "white" }}>Mark it as resolved</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
  renderItem = () => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 10,
          elevation: 4,
          height: 180,
          justifyContent: "space-evenly",
          backgroundColor: "white",
          marginHorizontal: 5,
          marginVertical: 5
          // height: 100
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
                  "https://s3-alpha-sig.figma.com/img/3c2f/1872/437fddc501ce01f3f7a70545c7daaa66?Expires=1633305600&Signature=DOzLldsYGkT06HECu5zulRNrf9rtoa~n62nG1fH3xsog6Qh6LfCMhlF3FBv6kmQnjL9oSTn1kI-kt~iTl8uDqwPgvjMFwrImrId-WkWQNAUABEkvHeetfr29pmGTQp6-l30rrcHkKha7geyjikuq2JNpzncskaqm0SMbF7CRNArXMWqIS29iP10QzRN-fDdMANmBcjbRDZd8v3PD~6v4MTQ8CoCa-vtZaOdGmvD~m3goTaRAmffLLA8Bf55YWhPqO66L5ngR68GC78xsWTDUHHotIXdddlYstNgqK2OwXysIqpfvc1rkoRc~W1h997HZoLsD0lGPlTRUoAZlOCz2RA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              }}
            ></Avatar>
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Video 1</Text>
            <Text
              style={{
                marginTop: 5,
                color: Theme.GRAY,
                fontSize: 12
              }}
            >
              Today, 11:12pm
            </Text>
            <Text
              style={{ color: Theme.THEME_COLOR, fontSize: 16, marginTop: 5 }}
            >
              Let's resolve this!
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
      </TouchableOpacity>
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
  },
  pickerContainerStyle: { marginVertical: 10 }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(SpeakerScreen)
