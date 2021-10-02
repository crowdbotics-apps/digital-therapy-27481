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
import Theme from "../../../Styles/Theme"
import DropDownPicker from "react-native-dropdown-picker"
import HeaderWhite from "../../../Component/HeaderWhite"
import ButtonStyle from "../../../Styles/ButtonStyle"
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
              Privacy policy
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
              PRIVACY POLICY FOR RESOLVE APP Last updated November 1, 2021
              KINGENE Holdings LLC (KGH) (“we” or “us” or “our”) respects the
              privacy of our users (“user” or “you”). This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our mobile application (“Resolve App”
              “the Application”). Please read this Privacy Policy carefully. IF
              YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO
              NOT ACCESS THE APPLICATION. We reserve the right to make changes
              to this Privacy Policy at any time and for any reason. We will
              alert you about any changes by updating the “Last updated” date of
              this Privacy Policy. You are encouraged to periodically review
              this Privacy Policy to stay informed of updates. You will be
              deemed to have been made aware of, will be subject to, and will be
              deemed to have accepted the changes in any revised Privacy Policy
              by your continued use of the Application after the date such
              revised Privacy Policy is posted. This Privacy Policy does not
              apply to the third-party online/mobile store from which you
              install the Application or make payments, including any in-game
              virtual items, which may also collect and use data about you. We
              are not responsible for any of the data collected by any such
              third party. COLLECTION OF YOUR INFORMATION We may collect
              information about you in a variety of ways. The information we may
              collect via the Application depends on the content and materials
              you use, and includes: Personal Data Demographic and other
              personally identifiable information that you voluntarily give to
              us when choosing to use the Application. If you choose to share
              data about yourself via your profile, or other interactive areas
              of the Application, please be advised that all data you disclose
              in these areas is public and your data will be accessible to
              anyone who accesses the Application. Derivative Data Information
              our servers automatically collect when you access the Application,
              such as your native actions that are integral to the Application,
              as well as other interactions with the Application and other users
              via server log files. Financial Data Financial information, such
              as data related to your payment method (e.g. valid credit card
              number, card brand, expiration date) that we may collect when you
              purchase the Application. We store only very limited, if any,
              financial information that we collect. Otherwise, all financial
              information is stored by our payment processor, and you are
              encouraged to review their privacy policy and contact them
              directly for responses to your questions. Geo-Location Information
              We may request access or permission to and track location-based
              information from your device, either continuously or while you are
              using the Application, to provide location-based services. If you
              wish to change our access or permissions, you may do so in your
              device’s settings. Device Access We may request access or
              permission to certain features from your mobile device, including
              your mobile device’s, calendar, camera, contacts, microphone,
              reminders, storage and other features. If you wish to change our
              access or permissions, you may do so in your device’s settings.
              Mobile Device Data Device information such as your mobile device
              ID number, model, and manufacturer, version of your operating
              system, phone number, country, location, and any other data you
              choose to provide. Push Notifications We may request to send you
              push notifications regarding your account or the Application. If
              you wish to opt-out from receiving these types of communications,
              you may turn them off in your device’s settings. Third-Party Data
              Information from third parties, such as personal information or
              network friends, if you connect your account to the third party
              and grant the Application permission to access this information.
              USE OF YOUR INFORMATION Having accurate information about you
              permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about
              you via the Application to: 1. Assist law enforcement and respond
              to subpoena. 2. Compile anonymous statistical data and analysis
              for use internally or with third parties. 3. Create and manage
              your account. 4. Deliver targeted advertising, coupons,
              newsletters, and other information regarding promotions and the
              Application to you. 5. Email you regarding your account. 6. Enable
              user-to-user communications. 7. Fulfill and manage purchases,
              payments, and other transactions related to the Application. 8.
              Generate a personal profile about you to make future visits to the
              Application more personalized. 9. Increase the efficiency and
              operation of the Application. 10. Monitor and analyze usage and
              trends to improve your experience with the Application. 11.Notify
              you of updates to the Application. 12.Offer new products,
              services, mobile applications, and/or recommendations to you.
              13.Perform other business activities as needed. 14.Prevent
              fraudulent transactions, monitor against theft, and protect
              against criminal activity. 15.Process payments and refunds.
              16.Request feedback and contact you about your use of the
              Application. 17.Resolve disputes and troubleshoot problems.
              18.Respond to product and customer service requests. 19.Send you a
              newsletter. 20.Solicit support for the Application. DISCLOSURE OF
              YOUR INFORMATION We may share information we have collected about
              you in certain situations. Your information may be disclosed as
              follows: ● By Law or to Protect Rights If we believe the release
              of information about you is necessary to respond to legal process,
              to investigate or remedy potential violations of our policies, or
              to protect the rights, property, and safety of others, we may
              share your information as permitted or required by any applicable
              law, rule, or regulation. This includes exchanging information
              with other entities for fraud protection and credit risk
              reduction. ● Third-Party Service Providers We may share your
              information with third parties that perform services for us or on
              our behalf, including payment processing, data analysis, email
              delivery, hosting services, customer service, and marketing
              assistance. ● Marketing Communications With your consent, or with
              an opportunity for you to withdraw consent, we may share your
              information with third parties for marketing purposes, as
              permitted by law. ● Third-Party Advertisers We may use third-party
              advertising companies to serve ads when you visit the Application.
              These companies may use information about your visits to the
              Application and other websites that are contained in web cookies
              in order to provide advertisements about goods and services of
              interest to you. ● Affiliates We may share your information with
              our affiliates, in which case we will require those affiliates to
              honor this Privacy Policy. Affiliates include our parent company
              and any subsidiaries, joint venture partners or other companies
              that we control or that are under common control with us. ●
              Business Partners We may share your information with our business
              partners to offer you certain products, services or promotions. ●
              Other Third Parties We may share your information with advertisers
              and investors for the purpose of conducting general business
              analysis. We may also share your information with such third
              parties for marketing purposes, as permitted by law. ● Sale or
              Bankruptcy If we reorganize or sell all or a portion of our
              assets, undergo a merger, or are acquired by another entity, we
              may transfer your information to the successor entity. If we go
              out of business or enter bankruptcy, your information would be an
              asset transferred or acquired by a third party. You acknowledge
              that such transfers may occur and that the transferee may decline
              honor commitments we made in this Privacy Policy. We are not
              responsible for the actions of third parties with whom you share
              personal or sensitive data, and we have no authority to manage or
              control third-party solicitations. If you no longer wish to
              receive correspondence, emails or other communications from third
              parties, you are responsible for contacting the third party
              directly. TRACKING TECHNOLOGIES Cookies and Web Beacons We may use
              cookies, web beacons, tracking pixels, and other tracking
              technologies on the Application to help customize the Application
              and improve your experience. When you access the Application, your
              personal information is not collected through the use of tracking
              technology. Most browsers are set to accept cookies by default.
              You can remove or reject cookies, but be aware that such action
              could affect the availability and functionality of the
              Application. You may not decline web beacons. However, they can be
              rendered ineffective by declining all cookies or by modifying your
              web browser’s settings to notify you each time a cookie is
              tendered, permitting you to accept or decline cookies on an
              individual basis. Internet-Based Advertising Additionally, we may
              use third-party software to serve ads on the Application,
              implement email marketing campaigns, and manage other interactive
              marketing initiatives. This third-party software may use cookies
              or similar tracking technology to help manage and optimize your
              online experience with us. For more information about opting-out
              of interest-based ads, visit the Network Advertising Initiative
              Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool. Website
              Analytics We may also partner with selected third-party vendors to
              allow tracking technologies and remarketing services on the
              Application through the use of first party cookies and third-party
              cookies, to, among other things, analyze and track users’ use of
              the Application, determine the popularity of certain content, and
              better understand online activity. By accessing the Application,
              you consent to the collection and use of your information by
              third- party vendors. We do not transfer personal information to
              these third-party vendors. THIRD-PARTY WEBSITES The Application
              may contain links to third-party websites and applications of
              interest, including advertisements and external services that are
              not affiliated with us. Once you have used these links to leave
              the Application, any information you provide to these third
              parties is not covered by this Privacy Policy, and we cannot
              guarantee the safety and privacy of your information. Before
              visiting and providing any information to any third-party
              websites, you should inform yourself of the privacy policies and
              practices (if any) of the third party responsible for that
              website, and should take those steps necessary to, in your
              discretion, protect the privacy of your information. We are not
              responsible for the content or privacy and security practices and
              policies of any third parties, including other sites, services or
              applications that may be linked to or from the Application.
              SECURITY OF YOUR INFORMATION We use administrative, technical, and
              physical security measures to help protect your personal
              information. While we have taken reasonable steps to secure the
              personal information you provide to us, please be aware that
              despite our efforts, no security measures are perfect or
              impenetrable, and no method of data transmission can be guaranteed
              against any interception or other type of misuse. Any information
              disclosed online is vulnerable to interception and misuse by
              unauthorized parties. Therefore, we cannot guarantee complete
              security if you provide personal information. POLICY FOR CHILDREN
              We do not knowingly solicit information from or market to children
              under the age of 13. If you become aware of any data we have
              collected from children under age 13, please contact us using the
              contact information provided below. CONTROLS FOR DO-NOT-TRACK
              FEATURES Most web browsers and some mobile operating systems [and
              our mobile applications] include a Do-Not-Track (“DNT”) feature or
              setting you can activate to signal your privacy preference not to
              have data about your online browsing activities monitored and
              collected. No uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not
              currently respond to DNT browser signals or any other mechanism
              that automatically communicates your choice not to be tracked
              online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a
              revised version of this Privacy Policy. OPTIONS REGARDING YOUR
              INFORMATION You may at any time review or change the information
              in your account or terminate your account by: ● Logging into your
              account settings and updating your account, or ● Contacting us
              using the contact information provided below Upon your request to
              terminate your account, we will deactivate or delete your account
              and information from our active databases. However, some
              information may be retained in our files to prevent fraud,
              troubleshoot problems, assist with any investigations, enforce our
              Terms of Use and/or comply with legal requirements. Emails and
              Communications If you no longer wish to receive correspondence,
              emails, or other communications from us, you may opt-out by: ●
              Noting your preferences at the time you register your account with
              the Application, or ● Logging into your account settings and
              updating your preferences, or ● Contacting us using the contact
              information provided below If you no longer wish to receive
              correspondence, emails, or other communications from third
              parties, you are responsible for contacting the third party
              directly. CALIFORNIA PRIVACY RIGHTS California Civil Code Section
              1798.83, also known as the “Shine The Light” law, permits our
              users who are California residents to request and obtain from us,
              once a year and free of charge, information about categories of
              personal information (if any) we disclosed to third parties for
              direct marketing purposes and the names and addresses of all third
              parties with which we shared personal information in the
              immediately preceding calendar year. If you are a California
              resident and would like to make such a request, please submit your
              request in writing to us using the contact information provided
              below. If you are under 18 years of age, reside in California, and
              have a registered account with the Application, you have the right
              to request removal of unwanted data that you publicly post on the
              Application. To request removal of such data, please contact us
              using the contact information provided below, and include the
              email address associated with your account and a statement that
              you reside in California. We will make sure the data is not
              publicly displayed on the Application, but please be aware that
              the data may not be completely or comprehensively removed from our
              systems. CONTACT US If you have questions or comments about this
              Privacy Policy, please contact us at: KINGENE Holdings LLC 815
              BRAZOS ST STE 500, AUSTIN, TX 78701 USA Email: Ekmackjr@gmai l.com
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
