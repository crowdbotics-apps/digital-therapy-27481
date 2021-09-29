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
function SelfVideos(props) {
  const [selfVideos] = useState([1, 2, 3, 4, 5])
  const renderItem = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 100,
          backgroundColor: "white",
          borderRadius: 15,
          elevation: 4,
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
            2h ago
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
          <Text style={{ color: Theme.THEME_COLOR }}>Send to</Text>
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      style={styles.ScrollView_1}
    >
      <View style={{ flex: 1 }}>
        <HeaderWhite
          text="Profile info"
          onPress={() => props.navigation.goBack()}
          showRecord
          navigation={props.navigation}
        />

        <View
          style={{
            flex: 1,
            width: "90%",
            alignSelf: "center"
          }}
        >
          <Text style={ButtonStyle.textStyleHeading}>Self Videos</Text>
          <FlatList
            data={selfVideos}
            renderItem={renderItem}
            extraData={selfVideos}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
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
export default connect(mapStateToProps, mapDispatchToProps)(SelfVideos)
