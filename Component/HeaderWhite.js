import React, { Component } from "react"
import { View, TouchableOpacity, Text, Image } from "react-native"
import { TouchableHighlight } from "react-native-gesture-handler"
import StyleMain from "../Styles/ButtonStyle"
import Theme from "../Styles/Theme"
// edited
export default class HeaderWhite extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View
        style={[
          StyleMain.headerStyleWhite,
          {
            justifyContent: "center",
            alignItems: "center",
            // elevation: 0,
            height: 50,
            width: "100%"
            // backgroundColor: "red"
          }
        ]}
      >
        {this.props.noBack ? (
          <View />
        ) : (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              marginLeft: 15,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99
            }}
            onPress={this.props.onPress}
          >
            {this.props.icon ? (
              this.props.icon
            ) : (
              <Image
                resizeMode={"contain"}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: Theme.THEME_COLOR
                }}
                tintColor={Theme.THEME_COLOR}
                source={require("../assets/nav_back.png")}
              />
            )}
          </TouchableOpacity>
        )}
        <Text
          style={[
            StyleMain.headerTextStyle,
            {
              textAlignVertical: "center",
              justifyContent: "center",
              alignSelf: "center",
              textAlign: "center",
              color: "black",
              fontSize: 16,
              flex: 1,
              marginLeft: -75,
              fontWeight: "bold"
            }
          ]}
        >
          {this.props.text}
        </Text>
        {this.props.hideIcon ? (
          <View />
        ) : this.props.showRecord ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              right: 15,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.props.onRecordPress}
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
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              right: 15,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.props.updateUser}
          >
            <View
              style={{
                // alignItems: "flex-start",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F74040",
                borderRadius: 25
              }}
            >
              {this.props.icon ? (
                this.props.icon
              ) : (
                <Image
                  resizeMode={"contain"}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "white"
                  }}
                  source={require("../assets/checkmark.png")}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
