import { StyleSheet } from "react-native"
import theme from "./Theme"
import Theme from "./Theme"

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  cardStyle: {
    // backgroundColor: 'white',

    padding: 5,
    borderRadius: 1,
    elevation: 0,
    flex: 1,
    margin: 5
  },
  button: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: theme.FONT_WEIGHT_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Theme.THEME_COLOR,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    padding: 5,
    elevation: 3,
    height: 50,
    width: "90%",
    marginVertical: 20
  },
  inputStyle: {
    width: 200,
    height: 40,
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 15,
    color: theme.THEME_TEXT_COLOR,
    backgroundColor: theme.INPUT_BACKGROUND,
    elevation: 2,
    paddingLeft: 15,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 15
  },
  textStyle: {
    fontSize: 14,
    color: "black"
  },
  hollowButtonStyle: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: theme.FONT_WEIGHT_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: theme.THEME_COLOR,
    borderWidth: 1,
    backgroundColor: "white",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    padding: 5,
    elevation: 3,
    height: 50,
    width: 250,
    marginTop: 15
  },
  textStyleBlackBold: {
    color: "#3F3F41",
    width: 300,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },

  textStyleBlack_simple: {
    color: "#3F3F41",
    fontWeight: "300",
    width: 300,
    marginTop: 5,
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Roboto-Medium"
  },
  textStyleGray_simple: {
    color: "gray",
    fontWeight: "300",
    marginTop: 5,
    fontSize: 13,
    textAlign: "center"
  },
  textStyleHeading: {
    fontSize: 26,
    fontWeight: "800",
    color: Theme.THEME_TEXT,
    marginVertical: 10
  },
  textStyleBlack: {
    color: "#3F3F41",
    fontWeight: "300",
    width: 300,
    marginTop: 5,
    fontSize: 13,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  textInputHelperText: {
    color: "#3F3F41",
    fontWeight: "300",
    width: 300,
    marginTop: 5,
    fontSize: 16
  },
  headerTextStyle: {
    textAlignVertical: "center",
    textAlign: "left",
    marginLeft: 20,
    color: "#000",
    fontWeight: "100",
    fontSize: 18
  },
  headerPageNoStyle: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "#3F3F41",
    fontWeight: "500",
    fontSize: 14
  },
  headerStyleWhite: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 1
  },
  pickerStyle: {
    width: 300,
    height: 50,
    alignSelf: "center",
    marginTop: 5,
    color: theme.THEME_TEXT_COLOR,
    backgroundColor: theme.PICKER_BACKGROUND,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: theme.INPUT_BORDERCOLOR,
    paddingLeft: 15,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 15
  },
  dashboardTileStyle: {
    margin: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.THEME_COLOR,
    padding: 10,
    width: 145,
    height: 160,
    elevation: 5,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowColor: "black"
  },
  tabTextStyle: { alignSelf: "center", fontSize: 10, color: theme.THEME_COLOR }
})
