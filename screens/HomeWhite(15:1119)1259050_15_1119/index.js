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
import Icon from "react-native-vector-icons/FontAwesome"
import { CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
import { getNavigationScreen } from "@screens"
export class Blank extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render = () => (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_2} />
      <ImageBackground
        source={{
          uri:
            "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0967/c474/6346824f4de994056ec8981f057d1e3a"
        }}
        style={styles.ImageBackground_15_1120}
      />
      <View style={styles.View_15_1121}>
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/f26b/985c/7320bff419ccda99f534c9a4ce234cb6"
          }}
          style={styles.ImageBackground_15_1122}
        />
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/d01d/b4fc/f76cf59b607c9bcc502e48cf6e286df8"
          }}
          style={styles.ImageBackground_15_1126}
        />
        <View style={styles.View_15_1130}>
          <Text style={styles.Text_15_1130}>Account</Text>
        </View>
        <View style={styles.View_15_1131}>
          <Text style={styles.Text_15_1131}>Home</Text>
        </View>
        <TouchableOpacity
          style={styles.TouchableOpacity_15_1132}
          onPress={() =>
            this.props.navigation.navigate(getNavigationScreen("15_1313"))
          }
        >
          <Text style={styles.Text_15_1132}>Profile</Text>
        </TouchableOpacity>
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0a17/3fe5/0f09aed94cfa38a0ab775813bea33441"
          }}
          style={styles.ImageBackground_15_1133}
        />
        <View style={styles.View_15_1140}>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/f756/51d2/c9b9234108b5027158e26ed0a3d67912"
            }}
            style={styles.ImageBackground_15_1141}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/92ba/bc0e/5971872b538b5e14749ef403c16f9747"
            }}
            style={styles.ImageBackground_15_1144}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/92ba/bc0e/5971872b538b5e14749ef403c16f9747"
            }}
            style={styles.ImageBackground_15_1145}
          />
        </View>
        <TouchableOpacity
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/4d18/6114/a9206c5e485031ef72e3a4da174f1765"
          }}
          style={styles.TouchableOpacity_15_1146}
          onPress={() =>
            this.props.navigation.navigate(getNavigationScreen("15_1313"))
          }
        />
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/cb2a/e876/94427303747e711e9f444ba676737a0a"
          }}
          style={styles.ImageBackground_15_1151}
        />
      </View>
      <View style={styles.View_15_1152}>
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/ba20/cd72/94253adce862950928f1accbbaa787c4"
          }}
          style={styles.ImageBackground_15_1153}
        />
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/fb9d/cdc9/7800663ca43078e9b6a2fb25d8bd480b"
          }}
          style={styles.ImageBackground_15_1161}
        />
        <View style={styles.View_15_1163}>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/8ff1/919c/46aa328e398da467be5c28ffcde72079"
            }}
            style={styles.ImageBackground_15_1164}
          />
          <View style={styles.View_15_1165} />
        </View>
        <TouchableOpacity
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/8ff1/919c/46aa328e398da467be5c28ffcde72079"
          }}
          style={styles.TouchableOpacity_15_1166}
          onPress={() =>
            this.props.navigation.navigate(getNavigationScreen("57_2"))
          }
        />
        <View style={styles.View_15_1168}>
          <View style={styles.View_15_1169}>
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/da3f/93da/5d3fdd4fe2dd493c808358d9d6c1c85a"
              }}
              style={styles.ImageBackground_15_1170}
            />
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/9d2f/ec45/0e026f7a91ff20470ec32efa5566b4cc"
              }}
              style={styles.ImageBackground_15_1173}
            />
          </View>
        </View>
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/67fb/0862/3de1c2fcd75620ff27447316c1a389a6"
          }}
          style={styles.ImageBackground_15_1174}
        />
      </View>
      <View style={styles.View_15_1176}>
        <View style={styles.View_15_1177}>
          <View style={styles.View_15_1178}>
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/2c3c/88d7/6cb8622834099d5bfff803ef6d9707a6"
              }}
              style={styles.ImageBackground_15_1179}
            />
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/3b22/6fe0/8dc89b4b70d4e653f61b5f3ad2239972"
              }}
              style={styles.ImageBackground_15_1180}
            />
            <View style={styles.View_15_1181}>
              <View style={styles.View_15_1182} />
              <View style={styles.View_15_1183} />
              <View style={styles.View_15_1184} />
            </View>
          </View>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/d1bd/77aa/f05e0c3f767e6988d2cb5ded6a310817"
            }}
            style={styles.ImageBackground_15_1185}
          />
        </View>
      </View>
      <TouchableOpacity
        source={{
          uri:
            "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/729e/64c3/e8fb7b0fee40cfd1fd21f5c6a23c3264"
        }}
        style={styles.TouchableOpacity_15_1186}
        onPress={() =>
          this.props.navigation.navigate(getNavigationScreen("54_2"))
        }
      />
      <View style={styles.View_15_1187}>
        <View style={styles.View_15_1188}>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0de3/8e49/88480c45b11aad182512a603473bf20a"
            }}
            style={styles.ImageBackground_15_1189}
          />
          <View style={styles.View_15_1190}>
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/2b1c/e316/a5bf19a438316ff73bda3b45ad204d03"
              }}
              style={styles.ImageBackground_15_1191}
            />
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/b493/b379/016d68e327d9c564059396239eac04b0"
              }}
              style={styles.ImageBackground_15_1195}
            />
            <ImageBackground
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/38a6/3ffa/739dcf52443af61c0d4dd4c685c4a7bf"
              }}
              style={styles.ImageBackground_15_1196}
            />
          </View>
        </View>
        <View style={styles.View_15_1197}>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0de3/8e49/88480c45b11aad182512a603473bf20a"
            }}
            style={styles.ImageBackground_15_1198}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0abc/cf32/981de83bf594f8a6ba1289ea7fdd40f1"
            }}
            style={styles.ImageBackground_15_1199}
          />
        </View>
        <View style={styles.View_15_1203}>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/d484/014d/113e9868a0fb4748135cd1bbe547f031"
            }}
            style={styles.ImageBackground_15_1204}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/d1f4/26f0/f1698f9f80cc5a3a8d4192caf07a7ca4"
            }}
            style={styles.ImageBackground_15_1208}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/8f24/cbfe/22a7a4622848a41c0bba2e7445cb479d"
            }}
            style={styles.ImageBackground_15_1209}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/a0dc/7021/735d1ea1d0ccc9ce54aaf6cbf34b5bf0"
            }}
            style={styles.ImageBackground_15_1210}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/8f24/cbfe/22a7a4622848a41c0bba2e7445cb479d"
            }}
            style={styles.ImageBackground_15_1211}
          />
        </View>
      </View>
      <View style={styles.View_15_1212}>
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/b5e2/6c2f/33fed7e742043009ae48272880d959a2"
          }}
          style={styles.ImageBackground_15_1213}
        />
        <View style={styles.View_15_1214}>
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/7e3a/432d/5cc734f0050b1110a3e921adf172817a"
            }}
            style={styles.ImageBackground_15_1215}
          />
          <ImageBackground
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/1b7c/2213/879f555ad3a3a410f4ff4619d46615f6"
            }}
            style={styles.ImageBackground_15_1218}
          />
        </View>
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/e570/d43e/3eeb85abd6f091dcbc3dede53b75db11"
          }}
          style={styles.ImageBackground_15_1219}
        />
        <ImageBackground
          source={{
            uri:
              "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/4aff/639f/d99a586bc9ee97b42784de9d8aff287c"
          }}
          style={styles.ImageBackground_15_1223}
        />
        <View style={styles.View_15_1232}>
          <Text style={styles.Text_15_1232}>9:41</Text>
        </View>
      </View>
      <ImageBackground
        source={{
          uri:
            "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0d18/f4c5/cdfd51234f6cfe5def5677576841389b"
        }}
        style={styles.ImageBackground_15_1233}
      />
      <ImageBackground
        source={{
          uri:
            "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/b938/6f96/abd229e28206898e498110513679f806"
        }}
        style={styles.ImageBackground_15_1234}
      />
      <ImageBackground
        source={{
          uri:
            "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/3f8c/42cc/a29b65cf3639d5e6c13594b953008000"
        }}
        style={styles.ImageBackground_15_1237}
      />
      <ImageBackground
        source={{
          uri:
            "https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/770e/f790/ebf0d97fe1dad8a37c922885643c3431"
        }}
        style={styles.ImageBackground_15_1240}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  ScrollView_1: { backgroundColor: "rgba(240, 40, 40, 1)" },
  View_2: { height: hp("110.92896174863387%") },
  ImageBackground_15_1120: {
    width: wp("100%"),
    minWidth: wp("100%"),
    height: hp("110.92896174863387%"),
    minHeight: hp("110.92896174863387%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%"),
    top: hp("0%")
  },
  View_15_1121: {
    width: wp("89.33346354166667%"),
    height: hp("13.387968761673392%"),
    top: hp("96.17486338797814%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("5.333268229166667%")
  },
  ImageBackground_15_1122: {
    width: wp("89.33346354166667%"),
    height: hp("10.92894507236168%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1126: {
    width: wp("31.466727701822915%"),
    height: hp("10.92894507236168%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("29.066731770833332%")
  },
  View_15_1130: {
    width: wp("22.933333333333334%"),
    top: hp("7.10380846033982%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("63.20006510416666%"),
    justifyContent: "flex-start"
  },
  Text_15_1130: {
    color: "rgba(34, 34, 34, 1)",
    fontSize: 9.5,
    fontWeight: "700",
    textAlign: "center",
    fontStyle: "normal",
    letterSpacing: 1,
    textTransform: "none"
  },
  View_15_1131: {
    width: wp("23.466666666666665%"),
    top: hp("7.10380846033982%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("33.60006510416666%"),
    justifyContent: "flex-start"
  },
  Text_15_1131: {
    color: "rgba(34, 34, 34, 1)",
    fontSize: 9.5,
    fontWeight: "700",
    textAlign: "center",
    fontStyle: "normal",
    letterSpacing: 1,
    textTransform: "none"
  },
  TouchableOpacity_15_1132: {
    width: wp("19.733333333333334%"),
    top: hp("7.10380846033982%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("5.866731770833334%"),
    justifyContent: "flex-start"
  },
  Text_15_1132: {
    color: "rgba(34, 34, 34, 1)",
    fontSize: 9.5,
    fontWeight: "700",
    textAlign: "center",
    fontStyle: "normal",
    letterSpacing: 1,
    textTransform: "none"
  },
  ImageBackground_15_1133: {
    width: wp("5.333307393391927%"),
    height: hp("2.322388216446006%"),
    top: hp("3.0054644808743234%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("71.46679687500001%")
  },
  View_15_1140: {
    width: wp("6.9333740234375%"),
    height: hp("2.732234704689901%"),
    top: hp("2.868835782744199%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("41.333300781249996%")
  },
  ImageBackground_15_1141: {
    width: wp("3.961802164713542%"),
    height: hp("2.732234704689901%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("1.4859049479166728%")
  },
  ImageBackground_15_1144: {
    width: wp("7.733333333333333%"),
    height: hp("3.0054644808743167%"),
    top: hp("-0.13659534558571806%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.5332356770833329%")
  },
  ImageBackground_15_1145: {
    width: wp("7.733333333333333%"),
    height: hp("3.0054644808743167%"),
    top: hp("-0.13659534558571806%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.5332356770833329%")
  },
  TouchableOpacity_15_1146: {
    width: wp("5.333304341634115%"),
    height: hp("3.278674714552249%"),
    top: hp("2.5956117390283566%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("12.5333984375%")
  },
  ImageBackground_15_1151: {
    width: wp("37.06666666666666%"),
    height: hp("1.092896174863388%"),
    top: hp("12.295065290940911%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("26.1333984375%")
  },
  View_15_1152: {
    width: wp("63.999446614583334%"),
    height: hp("19.426804422680796%"),
    top: hp("72.26775956284153%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("18.133333333333333%")
  },
  ImageBackground_15_1153: {
    width: wp("63.999446614583334%"),
    height: hp("15.629535946038251%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1161: {
    width: wp("12%"),
    height: hp("6.0109289617486334%"),
    top: hp("13.415877545466188%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("25.866406250000004%")
  },
  View_15_1163: {
    width: wp("24.53333333333333%"),
    height: hp("12.568306010928962%"),
    top: hp("1.3940196219689227%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("36.53307291666667%")
  },
  ImageBackground_15_1164: {
    width: wp("24.53333333333333%"),
    height: hp("12.568306010928962%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  View_15_1165: {
    width: wp("0%"),
    height: hp("0%"),
    top: hp("-120.92953874765199%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("330.13359375%")
  },
  TouchableOpacity_15_1166: {
    width: wp("23.998824055989584%"),
    height: hp("12.29447953687991%"),
    top: hp("1.503024075200642%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("3.200585937499998%")
  },
  View_15_1168: {
    width: wp("7.466666666666668%"),
    height: hp("3.825136612021858%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("11.466666666666665%"),
    top: hp("5.601092896174862%"),
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  View_15_1169: {
    width: wp("6.222222391764324%"),
    minWidth: wp("6.222222391764324%"),
    height: hp("3.1876139302071325%"),
    minHeight: hp("3.1876139302071325%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0.6222330729166679%"),
    top: hp("0.31875860495645725%")
  },
  ImageBackground_15_1170: {
    width: wp("2.548148600260417%"),
    height: hp("1.3042916365659953%"),
    top: hp("0.9401415215163951%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("1.8370442708333314%")
  },
  ImageBackground_15_1173: {
    width: wp("6.222222391764324%"),
    height: hp("3.1876139302071325%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1174: {
    width: wp("7.200260416666667%"),
    height: hp("3.6886580003415297%"),
    top: hp("5.73770491803279%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("45.06666666666667%")
  },
  View_15_1176: {
    width: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    top: hp("18.989071038251364%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("15.2%")
  },
  View_15_1177: {
    width: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  View_15_1178: {
    width: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1179: {
    width: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1180: {
    width: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  View_15_1181: {
    width: wp("70.13333333333334%"),
    minWidth: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    minHeight: hp("49.45355191256831%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%"),
    top: hp("0%")
  },
  View_15_1182: {
    width: wp("102.4%"),
    height: hp("76.63934426229508%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  View_15_1183: {
    width: wp("102.4%"),
    height: hp("76.63934426229508%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  View_15_1184: {
    width: wp("102.4%"),
    height: hp("76.63934426229508%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%"),
    backgroundColor: "rgba(0, 0, 0, 1)",
    opacity: 0.00009999999747378752
  },
  ImageBackground_15_1185: {
    width: wp("70.13333333333334%"),
    height: hp("49.45355191256831%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  TouchableOpacity_15_1186: {
    width: wp("71.73333333333333%"),
    minWidth: wp("71.73333333333333%"),
    height: hp("50.58176843195014%"),
    minHeight: hp("50.58176843195014%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("14.133333333333335%"),
    top: hp("18.852459016393443%"),
    resizeMode: "cover"
  },
  View_15_1187: {
    width: wp("89.60000000000001%"),
    height: hp("6.692080680138426%"),
    top: hp("6.693989071038252%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("5.333333333333334%")
  },
  View_15_1188: {
    width: wp("12.266666666666666%"),
    height: hp("6.284153005464481%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("77.33333333333334%")
  },
  ImageBackground_15_1189: {
    width: wp("12.266666666666666%"),
    height: hp("6.284153005464481%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  View_15_1190: {
    width: wp("3.733368174235026%"),
    height: hp("2.595642485905215%"),
    top: hp("2.0491803278688527%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("4.2666666666666515%")
  },
  ImageBackground_15_1191: {
    width: wp("3.188822428385417%"),
    height: hp("1.8169356174156315%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0.27226562500000284%")
  },
  ImageBackground_15_1195: {
    width: wp("4.8%"),
    height: hp("3.0054644808743167%"),
    top: hp("-0.13661202185792476%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.5333333333333172%")
  },
  ImageBackground_15_1196: {
    width: wp("4.8%"),
    height: hp("3.0054644808743167%"),
    top: hp("-0.13661202185792476%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.5333333333333172%")
  },
  View_15_1197: {
    width: wp("11.733333333333333%"),
    height: hp("6.284153005464481%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1198: {
    width: wp("11.733333333333333%"),
    height: hp("6.284153005464481%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1199: {
    width: wp("5.866666666666666%"),
    height: hp("0.546448087431694%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("2.933333333333332%"),
    top: hp("2.8688524590163924%")
  },
  View_15_1203: {
    width: wp("26.65053507486979%"),
    height: hp("5.735308225037622%"),
    top: hp("0.9567719339672989%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("32.54026692708333%")
  },
  ImageBackground_15_1204: {
    width: wp("16.713255818684896%"),
    height: hp("5.4532666023963134%"),
    top: hp("0.28204162264130694%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%")
  },
  ImageBackground_15_1208: {
    width: wp("27.73333333333333%"),
    height: hp("6.284153005464481%"),
    top: hp("-0.2737118246776822%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.54026692708333%")
  },
  ImageBackground_15_1209: {
    width: wp("27.73333333333333%"),
    height: hp("6.284153005464481%"),
    top: hp("-0.2737118246776822%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.54026692708333%")
  },
  ImageBackground_15_1210: {
    width: wp("27.73333333333333%"),
    height: hp("6.284153005464481%"),
    top: hp("-0.2737118246776822%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.54026692708333%")
  },
  ImageBackground_15_1211: {
    width: wp("27.73333333333333%"),
    height: hp("6.284153005464481%"),
    top: hp("-0.2737118246776822%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.54026692708333%")
  },
  View_15_1212: {
    width: wp("87.02225748697917%"),
    height: hp("2.5956284153005464%"),
    top: hp("2.0491803278688523%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("9.066666666666666%")
  },
  ImageBackground_15_1213: {
    width: wp("6.666666666666667%"),
    height: hp("2.0491803278688523%"),
    top: hp("0%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("80.00000000000001%")
  },
  View_15_1214: {
    width: wp("6.133324178059896%"),
    height: hp("1.092842498112246%"),
    top: hp("0.5009593859396344%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("80.88893229166668%")
  },
  ImageBackground_15_1215: {
    width: wp("0.4445653279622396%"),
    height: hp("0.455416519133771%"),
    top: hp("0.3187127452079066%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("5.688769531249989%")
  },
  ImageBackground_15_1218: {
    width: wp("6.933333333333333%"),
    height: hp("1.5027322404371584%"),
    top: hp("-0.2277353422237871%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("-0.35559895833333144%")
  },
  ImageBackground_15_1219: {
    width: wp("3.8221529642740886%"),
    height: hp("1.3666960711036225%"),
    top: hp("0.3639929932974728%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("75.11106770833334%")
  },
  ImageBackground_15_1223: {
    width: wp("4.266554005940755%"),
    height: hp("1.3661366342846812%"),
    top: hp("0.36429316619706276%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("69.20009765625001%")
  },
  View_15_1232: {
    width: wp("16%"),
    top: hp("0.13661202185792387%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("0%"),
    justifyContent: "flex-start"
  },
  Text_15_1232: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "left",
    fontStyle: "normal",
    letterSpacing: 1,
    textTransform: "none"
  },
  ImageBackground_15_1233: {
    width: wp("4.8%"),
    height: hp("2.185792349726776%"),
    top: hp("87.56830601092896%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("47.733333333333334%")
  },
  ImageBackground_15_1234: {
    width: wp("1.4457532246907552%"),
    height: hp("0.9562865632479309%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("49.333333333333336%"),
    top: hp("88.11475409836066%")
  },
  ImageBackground_15_1237: {
    width: wp("2.204142761230469%"),
    height: hp("1.4450650397545652%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("65.75299479166667%"),
    top: hp("79.09150670786373%")
  },
  ImageBackground_15_1240: {
    width: wp("49.6%"),
    minWidth: wp("49.6%"),
    height: hp("8.19672131147541%"),
    minHeight: hp("8.19672131147541%"),
    marginLeft: 0,
    marginTop: 0,
    position: "absolute",
    left: wp("25.333333333333336%"),
    top: hp("5.737704918032787%"),
    resizeMode: "cover"
  }
})

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Blank)
