import React, { useEffect, useState, Component } from "react"
import {
  View,
  PlatView,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  TextInput as Input
} from "react-native"
import MainStyle from "../../../Styles/ButtonStyle"
// import Button from '../../src/component/Button';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import axios from "axios"

import Theme from "../../../Styles/Theme"
import strings from "../../../Localization"
import { actionSignup } from "../../../Actions/index"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  BaseURL,
  GET_HEADER,
  Header,
  SET_TOKEN
} from "../../../Connection/index"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"
import Toast from "react-native-toast-message"
import HeaderWhite from "../../../Component/HeaderWhite"
import TextInputMask from "react-native-text-input-mask"
import DropDownPicker from "react-native-dropdown-picker"
import { update } from "../../../features/user"
import { useSelector, useDispatch } from "react-redux"
import {
  requestOneTimePayment,
  requestBillingAgreement
} from "react-native-paypal"
function Membership(props) {
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [paymentOption, setPaymentOption] = useState([
    { label: "Mastercard", value: "Mastercard" },
    { label: "Visa", value: "Visa" }
    // { label: "Paypal", value: "Paypal" }
  ])
  const [paymentOptionValue, setPaymentOptionValue] = useState("")
  const [paymentOptionOpen, setPaymentOptionOpen] = useState(false)
  const [cardHolderName, setCardHolderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    // checkLoggedin()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-evenly",
        backgroundColor: Theme.THEME_WHITE
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <HeaderWhite
          text="Upgrade to premium"
          hideIcon
          onPress={() => props.navigation.goBack()}
        />

        <View
          style={[
            Styles.ViewStyle,
            {
              justifyContent: "flex-start",
              flex: 1
            }
          ]}
        >
          <View style={Styles.pickerContainerStyle}>
            <Text style={{ color: Theme.GRAY }}>Payment Option</Text>
            <DropDownPicker
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "white",
                borderWidth: 0,
                marginTop: 10,
                elevation: 4,
                borderRadius: 3,
                shadowColor: "black",
                shadowRadius: 3,
                shadowOffset: { x: 3, y: 3 },
                shadowOpacity: 0.2
              }}
              textStyle={{ color: Theme.THEME_COLOR }}
              ArrowDownIconComponent={() => (
                <Icon
                  name="keyboard-arrow-down"
                  color={Theme.THEME_COLOR}
                  size={25}
                />
              )}
              ArrowUpIconComponent={() => (
                <Icon
                  name="keyboard-arrow-up"
                  color={Theme.THEME_COLOR}
                  size={25}
                />
              )}
              placeholder="Payment option"
              open={paymentOptionOpen}
              value={paymentOptionValue}
              items={paymentOption}
              setValue={setPaymentOptionValue}
              setItems={setPaymentOption}
              setOpen={setPaymentOptionOpen}
              listMode="MODAL"
            />
          </View>
          {paymentOptionValue == "Paypal" ? null : (
            <View>
              <View>
                <Text style={{ color: Theme.GRAY }}>Card holder name</Text>
                <View style={Styles.inputStyle}>
                  <Input
                    style={[
                      Styles.textInputStyle,
                      { color: Theme.THEME_COLOR }
                    ]}
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={text => {
                      setCardHolderName(text)
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={{ color: Theme.GRAY }}>Card number</Text>
                <View style={Styles.inputStyle}>
                  <TextInputMask
                    style={[
                      Styles.textInputStyle,
                      { color: Theme.THEME_COLOR }
                    ]}
                    keyboardType="phone-pad"
                    onChangeText={(formatted, extracted) => {
                      console.log(formatted) // +1 (123) 456-78-90
                      console.log(extracted) // 1234567890
                      setCardNumber(extracted)
                    }}
                    mask={" [0000] [0000] [0000] [0000]"}
                  />
                  {/* <Input
                style={[Styles.textInputStyle, { color: Theme.THEME_COLOR }]}
                placeholder=""
                autoCapitalize="none"
                onChangeText={text => {
                  setEmail(text)
                }}
                maxLength={16}
                keyboardType="phone-pad"
              /> */}
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View style={{ flex: 0.47 }}>
                  <Text style={{ color: Theme.GRAY }}>Expiration date</Text>
                  <View style={Styles.inputStyle}>
                    <TextInputMask
                      style={[
                        Styles.textInputStyle,
                        { color: Theme.THEME_COLOR }
                      ]}
                      keyboardType="phone-pad"
                      onChangeText={(formatted, extracted) => {
                        console.log(formatted) // +1 (123) 456-78-90
                        console.log(extracted) // 12345678
                        if (formatted.includes("/")) {
                          console.warn(formatted.split("/")[0] > 12)
                          if (formatted.split("/")[0] > 12) {
                            setCardExpiry("")
                          } else {
                            setCardExpiry(formatted)
                          }
                        } else {
                          setCardExpiry(formatted)
                        }
                      }}
                      value={cardExpiry}
                      mask={"[00]/[00]"}
                    />
                  </View>
                </View>
                <View style={{ flex: 0.47 }}>
                  <Text style={{ color: Theme.GRAY }}>Cvv</Text>
                  <View style={Styles.inputStyle}>
                    <Input
                      style={[
                        Styles.textInputStyle,
                        { color: Theme.THEME_COLOR }
                      ]}
                      placeholder=""
                      autoCapitalize="none"
                      onChangeText={text => {
                        setCvv(text)
                      }}
                      maxLength={3}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                elevation: 3,
                shadowColor: "black",
                shadowRadius: 3,
                shadowOffset: { x: 3, y: 3 },
                shadowOpacity: 0.2
              }}
            >
              <Image
                style={{ width: "60%", height: "60%" }}
                resizeMode="contain"
                source={require("../../../assets/crown.png")}
              />
            </View>
            <Text
              style={{
                color: Theme.THEME_COLOR,
                fontSize: 28,
                fontWeight: "bold"
              }}
            >
              Amount : $ 50.00
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 0.2
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (paymentOptionValue == "Paypal") {
                  GetPaypalRequestToken()
                } else {
                  if (ValidateForm()) {
                    ApplyMembership()
                  }
                }
              }}
              info
              style={MainStyle.button}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ textAlign: "center", color: "white" }}>
                  Upgrade
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
  function ValidateForm() {
    if (paymentOptionValue != "") {
      if (cardHolderName != "") {
        if (cardNumber != "") {
          if (
            (paymentOptionValue == "Mastercard" &&
              ValidateMastercard(cardNumber)) ||
            (paymentOptionValue == "Visa" && ValidateVisa(cardNumber))
          ) {
            if (cardExpiry.includes("/")) {
              if (cardExpiry.split("/").length == 2) {
                if (cvv != "") {
                  return true
                } else {
                  // Enter cvv
                  Toast.show({
                    type: "error",
                    text2: "Input Cvv",
                    text1: "Missing card details",
                    position: "bottom",
                    visibilityTime: 3000
                  })
                }
                return false
              } else {
                Toast.show({
                  type: "error",
                  text2: "Enter valid card expiration date",
                  text1: "Missing card details",
                  position: "bottom",
                  visibilityTime: 3000
                })
                // Enter valid expiry
                return false
              }
            } else {
              Toast.show({
                type: "error",
                text2: "Input expiration date",
                text1: "Missing card details",
                position: "bottom",
                visibilityTime: 3000
              })
              return false
              //enter expiry
            }
          } else {
            Toast.show({
              type: "error",
              text2: "Input valid card number",
              text1: "Missing card details",
              position: "bottom",
              visibilityTime: 3000
            })
            return false
            //invalid card number
          }
        } else {
          Toast.show({
            type: "error",
            text2: "Input card number",
            text1: "Missing card details",
            position: "bottom",
            visibilityTime: 3000
          })
          return false
          //enter card number
        }
      } else {
        Toast.show({
          type: "error",
          text2: "Input card holder name",
          text1: "Missing card details",
          position: "bottom",
          visibilityTime: 3000
        })
        return false
        //enter card holder name
      }
    } else {
      Toast.show({
        type: "error",
        text2: "Select payment method",
        text1: "Missing card details",
        position: "bottom",
        visibilityTime: 3000
      })
      return false
      //select payment method
    }
  }
  async function ApplyMembership() {
    var self = this
    console.log("card details")
    console.log({
      card_number: parseInt(cardNumber),
      exp_month: cardExpiry.split("/")[0],
      exp_year: parseInt("20" + cardExpiry.split("/")[1]),
      cvc: cvv,
      card_holder_name: cardHolderName
    })
    setSubmitting(true)
    axios({
      method: "post",
      url: BaseURL.concat("/payment/stripe/"),
      data: {
        card_number: parseInt(cardNumber),
        exp_month: cardExpiry.split("/")[0],
        exp_year: parseInt("20" + cardExpiry.split("/")[1]),
        cvc: cvv,
        card_holder_name: cardHolderName
      },
      headers: await GET_HEADER()
    })
      .then(res => {
        console.warn(res)
        if (res.data.success) {
          Toast.show({
            type: "success",
            text1: "Payment successful",
            text2: "We welcome you as a member to Digital Therapy.",
            position: "bottom",
            visibilityTime: 3000
          })
          dispatch(update(res.data.result))
          setTimeout(() => {
            props.navigation.goBack()
          }, 1000)
        } else {
          console.warn(res)
          Toast.show({
            type: "error",
            text1: "Payment not successful",
            text2: "Something went wrong",
            position: "bottom",
            visibilityTime: 3000
          })
        }
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: "Payment not successful",
          text2: "Something went wrong",
          position: "bottom",
          visibilityTime: 3000
        })
        console.warn(error.response)

        setLoading(false)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  function ValidateVisa(inputtxt) {
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    if (cardno.test(inputtxt)) {
      return true
    } else {
      alert("Not a valid Visa credit card number!")
      return false
    }
  }
  function ValidateMastercard(inputtxt) {
    var cardno = /^(?:5[1-5][0-9]{14})$/
    if (cardno.test(inputtxt)) {
      return true
    } else {
      alert("Not a valid Mastercard credit card number!")
      return false
    }
  }
  async function GetPaypalRequestToken() {
    axios({
      method: "GET",
      url: BaseURL.concat("/braintree/token"),

      headers: await GET_HEADER()
    })
      .then(async res => {
        var Token =
          "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTXpnNE9EQXhNamtzSW1wMGFTSTZJalV4TVRSak1tVTBMV00yWVRZdE5HSXdNaTFpWW1FM0xUSmxabU00WkdWbE9UTmlZaUlzSW5OMVlpSTZJbVJqY0hOd2VUSmljbmRrYW5JemNXNGlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pWkdOd2MzQjVNbUp5ZDJScWNqTnhiaUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENKZExDSnZjSFJwYjI1eklqcDdmWDAuVHhPWDc5a254Q0dGTHVUSHNiQnVwR193R3c3bXlzeFB6X3dwR1FKbUJ0UVhhVzlmbUtQbkJVRzNEZm9SUVg5YkpMS3ZGX2o0UnJvaU1yUzdOaWQ3S1EiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9kY3BzcHkyYnJ3ZGpyM3FuL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmZsaW5lIiwiY2hhbGxlbmdlcyI6WyJjdnYiLCJwb3N0YWxfY29kZSJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9kY3BzcHkyYnJ3ZGpyM3FuIn0sImFwcGxlUGF5Ijp7ImNvdW50cnlDb2RlIjoiVVMiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJtZXJjaGFudElkZW50aWZpZXIiOiJtZXJjaGFudC5jb20uYnJhaW50cmVlcGF5bWVudHMuYXBwbGUtcGF5LWRlbW8uQnJhaW50cmVlLURlbW8iLCJzdGF0dXMiOiJtb2NrIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4IiwiZGlzY292ZXIiLCJtYWVzdHJvIl19LCJwYXlwYWxFbmFibGVkIjp0cnVlLCJicmFpbnRyZWVfYXBpIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbSIsImFjY2Vzc190b2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSkZVekkxTmlJc0ltdHBaQ0k2SWpJd01UZ3dOREkyTVRZdGMyRnVaR0p2ZUNJc0ltbHpjeUk2SW1oMGRIQnpPaTh2WVhCcExuTmhibVJpYjNndVluSmhhVzUwY21WbFoyRjBaWGRoZVM1amIyMGlmUS5leUpsZUhBaU9qRTJNemc0TnprNU9EY3NJbXAwYVNJNklqTmlPR1F5TnprNExUWmpaakV0TkRKaE9DMDRNR05sTFRoaFltWTRPR0l4WWpSbE5TSXNJbk4xWWlJNkltUmpjSE53ZVRKaWNuZGthbkl6Y1c0aUxDSnBjM01pT2lKb2RIUndjem92TDJGd2FTNXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRJaXdpYldWeVkyaGhiblFpT25zaWNIVmliR2xqWDJsa0lqb2laR053YzNCNU1tSnlkMlJxY2pOeGJpSXNJblpsY21sbWVWOWpZWEprWDJKNVgyUmxabUYxYkhRaU9uUnlkV1Y5TENKeWFXZG9kSE1pT2xzaWRHOXJaVzVwZW1VaUxDSnRZVzVoWjJWZmRtRjFiSFFpWFN3aWMyTnZjR1VpT2xzaVFuSmhhVzUwY21WbE9sWmhkV3gwSWwwc0ltOXdkR2x2Ym5NaU9udDlmUS5JVlBndzkzZF9pS0xwN2lNdnZ4U21FN1FUaVpYZndFQlBSR3dCRG1hZTJFb3ByRThJb2QtOU40bENQcF8wN081TFRhajVmZEF0UU1VU1ZlVzlXWUlLQSJ9LCJwYXlwYWwiOnsiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJBY21lIFdpZGdldHMsIEx0ZC4gKFNhbmRib3gpIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoic3RjaDJuZmRmd3N6eXR3NSIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ=="
        Token = "sandbox_9dbg82cq_dcpspy2brwdjr3qn"
        const { nonce } = await requestOneTimePayment(Token, {
          amount: "50", // required
          // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
          currency: "USD",
          // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
          localeCode: "en_US",
          shippingAddressRequired: false,
          userAction: "commit", // display 'Pay Now' on the PayPal review page
          // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
          intent: "authorize"
        })
        console.warn(nonce)
      })
      .catch(function (error) {
        console.warn(error)
        console.log("error" + JSON.stringify(error))
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: "Something went wrong",
          position: "bottom",
          visibilityTime: 3000
        })
        console.warn(error.response)

        setLoading(false)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
}

const Styles = StyleSheet.create({
  ImageContainer: { flex: 0.3, justifyContent: "center", alignItems: "center" },
  logoStyle: { width: 100, height: 100 },
  ViewStyle: {
    justifyContent: "center",
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  inputStyle: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: Theme.TEXTINPUT_BORDER_COLOR,
    // borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: "center",
    width: "100%",
    alignSelf: "flex-start",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { x: 3, y: 3 },
    shadowOpacity: 0.2
  },
  textInputStyle: { flex: 1, paddingLeft: 15, minHeight: 50 },
  lineStyle: {
    flex: 1,
    backgroundColor: "black",
    height: 1,
    width: "100%"
  },
  socialButton: {
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10
  },
  pickerContainerStyle: { marginVertical: 10 }
})
const mapStateToProps = state => {
  const { MainReducer } = state
  return { MainReducer }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      actionSignup
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(Membership)
