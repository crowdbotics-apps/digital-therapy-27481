import React, { Component } from "react"
import { View, TouchableOpacity, Text, Image } from "react-native"
import StyleMain from "../Styles/MainStyle"
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
            elevation: 0,
            height: 90
          }
        ]}
      >
        {this.props.noBack ? (
          <View />
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              left: 15
            }}
            onPress={this.props.onPress}
          >
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
                justifyContent: "center"
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
                    tintColor: "black"
                  }}
                  tintColor={"black"}
                  source={require("../assets/nav_back.png")}
                />
              )}
            </View>
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
              marginLeft: 0
            }
          ]}
        >
          {this.props.text}
        </Text>
        {this.props.noBack ? (
          <View />
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              right: 15
            }}
            onPress={this.props.onPress}
          >
            <View
              style={{
                // alignItems: "flex-start",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.props.icon ? (
                this.props.icon
              ) : (
                <Image
                  resizeMode={"contain"}
                  style={{
                    width: "90%",
                    height: "90%"
                  }}
                  source={require("../assets/btn.png")}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
