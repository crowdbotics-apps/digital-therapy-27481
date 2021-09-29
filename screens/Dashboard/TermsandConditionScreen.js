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
import DropDownPicker from "react-native-dropdown-picker"
import HeaderWhite from "../../Component/HeaderWhite"
import ButtonStyle from "../../Styles/ButtonStyle"
// edited
export class GuideScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      value: null,
      items: [],
      home: false,
      account: false,
      profile: false
    }

    // this.setValue = this.setValue.bind(this)
  }
  //   setOpen(open) {
  //     this.setState({
  //       open
  //     })
  //   }

  //   setValue(callback) {
  //     this.setState(state => ({
  //       value: callback(state.value)
  //     }))
  //   }

  //   setItems(callback) {
  //     this.setState(state => ({
  //       items: callback(state.items)
  //     }))
  //   }

  render() {
    const { home, account, profile } = this.state
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
        style={styles.ScrollView_1}
      >
        <View style={{ flex: 1 }}>
          <HeaderWhite
            text="Guide Screen"
            onPress={() => this.props.navigation.goBack()}
            hideIcon
            navigation={this.props.navigation}
          />
          <View
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: Theme.THEME_COLOR
              }}
            >
              Terms and conditions
            </Text>
          </View>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 40,
                color: Theme.THEME_COLOR,
                textAlignVertical: "top"
              }}
            >
              -
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              width: "95%"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlignVertical: "top",
                textAlign: "center"
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              facilisis vehicula nisl in condimentum. Nullam ante diam, aliquam
              sit amet convallis vel, lacinia quis lorem. Suspendisse enim est,
              iaculis eget interdum id, accumsan quis est. Sed eu efficitur dui.
              Aenean dictum faucibus diam eget ultrices. Suspendisse elementum
              tortor ornare, placerat sapien ac, elementum quam. Proin
              tincidunt, turpis vitae placerat ornare, elit nunc malesuada diam,
              eu facilisis odio lacus id quam. Proin a magna fringilla, auctor
              eros eget, pharetra velit. In hac habitasse platea dictumst.
              Vestibulum sollicitudin purus in libero dignissim semper. Aliquam
              eleifend, nunc id egestas aliquam, elit sapien sodales urna, sit
              amet vehicula turpis sapien vel elit. Donec at Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Maecenas facilisis vehicula
              nisl in condimentum. Nullam ante diam, aliquam sit amet convallis
              vel, lacinia quis lorem. Suspendisse enim est, iaculis eget
              interdum id, accumsan quis est. Sed eu efficitur dui. Aenean
              dictum faucibus diam eget ultrices. Suspendisse elementum tortor
              ornare, placerat sapien ac, elementum quam. Proin tincidunt,
              turpis vitae placerat ornare, elit nunc malesuada diam, eu
              facilisis odio lacus id quam. Proin a magna fringilla, auctor eros
              eget, pharetra velit. In hac habitasse platea dictumst. Vestibulum
              sollicitudin purus in libero dignissim semper. Aliquam eleifend,
              nunc id egestas aliquam, elit sapien sodales urna, sit amet
              vehicula turpis sapien vel elit. Donec at placerat
            </Text>
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
  },
  pickerContainerStyle: { marginVertical: 10 }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(GuideScreen)
