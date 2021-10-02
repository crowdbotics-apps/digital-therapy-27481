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
import Theme from "../../../Styles/Theme"
import DropDownPicker from "react-native-dropdown-picker"
import HeaderWhite from "../../../Component/HeaderWhite"
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
              MOBILE APP TERMS AND CONDITIONS Effective date: November 1, 2021
              These terms and conditions apply to you (“the user” “You”) of this
              application, and the owner (“the Owner” “the operator” “we” “us”)
              of Resolve application (“the application” “application” “app”).
              PLEASE READ THE TERMS AND CONDITIONS CAREFULLY as they affect your
              legal right. 1. DEFINITIONS “Parties” means both you (the user of
              the Service) and the Owner of this Service. “Content” means any
              content, writing, images, audiovisual content or other information
              published on this Service. "Your content” means any audio, video,
              text, images or other material you choose to display on this
              application subject to the restrictions provided in this
              Agreement. Materials means any materials, information or
              documentation that we may provide to you in connection with your
              use of the app. Terms means these terms and conditions. Service
              means the application, which is known as Resolve app including all
              pages, subpages, all blogs, forums and other connected internet
              content whatsoever. 2. ABOUT THIS APPLICATION This Application is
              comprised of various pages operated by Kingene Holdings LLC. This
              Service is offered to you upon your acceptance of the Terms,
              conditions, notices hereinafter contained. Your use of this app
              constitutes your agreement to all the Terms contained herein. 3.
              AGREEMENT a. By using this Application, You acknowledge that you
              have reviewed and considered the Terms of this agreement and
              understand same and agree to be bound by it. If you do not agree
              with these Terms or do not intend to be bound by it, you must quit
              the use of this Application immediately. In addition, when using
              this app, you shall be subject to any posted guidelines or rules
              applicable to such services. Accordingly, any participation in
              this Service shall constitute acceptance of this Agreement. b. By
              using this Application and agreeing to these Terms, You represent
              and warrant that you have attained the age of 13 years. 4.
              ACCEPTABLE USE a. We hereby grant you the license to use this
              application for your personal, non-commercial use to retrieve,
              display and view the content on a computer screen or a mobile
              device. b. The license created under these Terms is limited, non-
              exclusive, non-transferable and revocable. You agree that you will
              not use the contents or materials for any other purpose which may
              be contrary to your license to use this Service. c. Any
              unauthorized use by you shall terminate the permission or license
              granted by this Application. 5. PROHIBITED USE a. You agree not to
              use the Service in the following manner: (i). to harass, abuse or
              threaten others or otherwise violate any person's legal rights;
              (ii). to perpetrate fraud; (iii). to create or transmit
              unnecessary spam to any person or URL; (iv). to post, transmit or
              cause to be posted or transmitted, any communication or
              solicitation designed to obtain password, account, or private
              information of other Users or persons; (v). to post copyrighted
              content which does not belong to you and without obtaining the
              prior consent of the author, (vi). to use robot, spider, scraper
              or other automated means to access this service without obtaining
              the prior consent of the Owner; (Vii). to engage in or create any
              unlawful gambling, sweepstakes, or scheme; (viii). publishing or
              distributing any obscene or defamatory material; (ix). using this
              Service in any way that impacts user access to the Application;
              (x). to engage in advertisement or solicit any user to buy or sell
              products or services without obtaining the prior consent of the
              Owner, (xi). disseminating computer viruses or other software;
              (xii). violating any intellectual property rights of the Owner or
              any third party; (xiii), to use the Application or any of the
              services for illegal spam activities, b. Additionally, you agree
              that you will not do as follows: (xiv). interfere or attempt to
              interfere with the proper working of this Application; or (xv).
              bypass any measures we may use to prevent or restrict access to
              this Application; (xvii). to interfere with or circumvent the
              security features of this Service; (xviii). to damage, disable,
              overburden or impair this Service or any other person's use of
              this Service (xix). to use this Service contrary to the applicable
              laws and regulations or in a way that causes, or cause harm to
              this Application, any person or business entity. c. The Owner has
              the authority to review all content posted by the users on this
              Application and we reserve the right to terminate your use of the
              Service for violating any of the prohibited uses. d. You
              acknowledge that the Application does not control the content or
              any information that may be posted by other users. Consequently,
              it is not responsible or liable for those contents or information.
              6. INTELLECTUAL PROPERTY OWNERSHIP a. You agree that we retain
              ownership of all content included on the Application (text,
              graphics, video, software, data, page layout, images, and any
              other information capable of being stored in a computer) other
              than the contents uploaded by users. b. You are granted a limited
              license only, subject to the restrictions provided in this Terms,
              nothing on this Application shall be construed as granting any
              license or right to use any trademark or logo displayed on the
              Application without obtaining the prior written consent of the
              Owner. c. You hereby agree not to reproduce or distribute the
              Owner's intellectual property or use the intellectual property for
              any unlawful purpose. 7. YOUR CONTENT a. You undertake that you
              retain the exclusive right and ownership of your content and you
              are not infringing on any third party rights. b. You retain all
              rights and ownership to your content. However, when You upload
              your content, You grant the Owner a worldwide license to
              communicate, distribute, host, make modification or derivative
              works (solely for the purpose of showcasing your work), reproduce,
              publicly display, publicly perform and use such content. The
              license granted by you is for the purposes of marketing,
              promoting, and improving our services. c. The Owner reserves the
              right to remove any of your content or any content that is
              unlawful, offensive, defamatory, or otherwise objectionable or
              violates any intellectual property rights or these Terms. d. You
              agree that the Owner has the right to retain only the latest three
              (3) videos per chat. e. You agree that the app will not retain
              more than the latest three (3) videos per chat on its server. 8.
              USER ACCOUNT a. You may be required to register with us to have
              access to this service. b. You will be required to provide certain
              personal information, which may include but not limited to your
              name, user name, email address and password. The information
              provided must be correct and accurate. c. This personal
              information must not be disseminated to anyone and when you
              discover that your information has been compromised, you agree to
              notify us immediately. You also acknowledge that you are
              responsible for the security of your personal information and that
              the Owner does not accept liability for the security of your
              account as you agree to be responsible for maintaining the
              confidentiality of your passwords or other account identifiers
              which you choose and all activities under your account. The Owner
              reserves the right to terminate your account where you have
              provided false inaccurate or incorrect information d. It is at the
              sole discretion of the Owner to terminate the account or refuse to
              provide Service to any User at any time and for any reason. 9.
              PRIVACY POLICY Our privacy policy explains how we treat your
              personal data and protect your privacy when you use our Service.
              By using our Service, you agree that the Owner can use such data
              in the manner described in our Privacy Policy. 10. ELECTRONIC
              COMMUNICATIONS You consent to receive electronic communications
              and you agree that all agreements, notices, disclosures and other
              communications we provide to you electronically, via email and on
              this Application, satisfy any legal requirements that
              communications must be in writing. 11. REVERSE ENGINEERING AND
              SECURITY You hereby agree as follows: (a). not to reverse engineer
              or permit the reverse engineering or dissemble any code or
              software from or on the Application or Services; and (b). not to
              violate the security of the Application or other Services through
              any unauthorized access, circumvention of encryption or other
              security tools, data mining or interference with any host or user
              or network. 12. CHANGE TO SERVICE (a). You accept that the Owner
              may vary, alter, amend, or update the content or service, at any
              time and without your consent. (b). You also agree that they may
              not be available at all times and this may be as a result of the
              maintenance or for any other reason and we shall not be held
              liable for the failure to provide this service. 13.
              INDEMNIFICATION You hereby agree to indemnify the Owner, its
              employees, agents; and third parties from and against all
              liabilities, cost, demands, cause of action, damages, and expenses
              (including reasonable attorney's fees) arising out of your use or
              inability to use, any uploads made by you, your violation of any
              rights of a third party and your violation of applicable laws,
              rules or regulation 14. NO WARRANTIES You agree that you use this
              Application solely at your risk as the Owner does not warrant the
              accuracy of the contents in this Application. You assume all the
              risk of using this Application. The Owner expressly disclaims all
              express and implied warranties such as implied warranty of
              merchantability as the Owner makes no warranties that the
              Application or other Services will be accurate, error free, secure
              or uninterrupted. The Owner makes no warranty about the
              suitability, reliability, availability, timeliness and accuracy of
              the information, contents, and other materials contained herein
              for any purpose. The Owner hereby disclaims all warranties and
              conditions with regard to the information, software, Products,
              related graphics and materials, including all implied warranties
              or conditions of merchantability, fitness for a particular
              purpose, title, and non-infringement. You also agree that the
              Owner and its affiliates shall not be liable for any direct,
              indirect, punitive and all consequential damages or any damages
              whatsoever including, but not limited to damages for loss of use,
              data or profits, the failure to provide services or for any
              information, software, products, services, related graphics and
              materials obtained through this Application, or otherwise arising
              out of the use of this Application, whether based on contract,
              negligence, strict liability, or otherwise. 15. SERVICE
              INTERRUPTIONS The Owner may from time to time interrupt your
              access or use of this Application to perform some maintenance or
              emergency services and you agree that the Owner shall not be held
              liable for any damage, loss which may arise thereof. The Owner
              reserves the right to, at its sole discretion, terminate your
              access to this Application and the related service or any part
              thereof at any time, for any reason and without notice. The Owner
              shall have the right to terminate or terminate/suspend your
              account for violating the Terms of this service. If you register
              with us, you may terminate this service at any time by issuing a
              prior notice to us. Once this is done, you will no longer be bound
              by the provisions of this Terms. 16. TERMS APPLICABLE TO APPLE AND
              ANDROID DEVICES The following terms apply when you use a mobile
              application obtained from either the Apple Store or Google Play to
              access the Resolve app. You acknowledge that this Agreement is
              concluded between you and Owner only, and not with Apple Inc. or
              Google, Inc. (each an “App Distributor”), and the Owner, not an
              App Distributor, is solely responsible for the Resolve application
              and the content thereof. (1) Scope Of License: The license granted
              to you for the use of the application is limited to a
              non-transferable license to use the application on a device that
              utilizes the Apple iOS or Android operating system, as applicable,
              and in accordance with the usage rules set forth in the applicable
              App Distributor terms of service. (2) Maintenance And Support: The
              Owner is solely responsible for providing any maintenance and
              support services with respect to the application, as specified in
              this Agreement, or as required under applicable law. You
              acknowledge that each App Distributor has no obligation whatsoever
              to furnish any maintenance and support services with respect to
              the application. (3) Warranty: The Owner is solely responsible for
              any product warranties, whether express or implied by law, to the
              extent not effectively disclaimed. In the event of any failure of
              the application to conform to any applicable warranty, you may
              notify an App Distributor, and the App Distributor, in accordance
              with its terms and policies, may refund the purchase price, if
              any, paid for the app, and to the maximum extent permitted by
              applicable law, an App Distributor will have no other warranty
              obligation whatsoever with respect to the application, and any
              other claims, losses, liabilities, damages, costs or expenses
              attributable to any failure to conform to any warranty will be the
              Owner’s sole responsibility. (4) Product Claims: You acknowledge
              that the Owner, not an App Distributor, is responsible for
              addressing any claims of yours or any third party relating to the
              application or your possession and/or use of the app, including,
              but not limited to: (i) product liability claims; (ii) any claim
              that the app fails to conform to any applicable legal or
              regulatory requirement; and (iii) claims arising under consumer
              protection or similar legislation. (5) Intellectual Property
              Rights: You acknowledge that, in the event of any third party
              claim that the app or your possession and use of the app infringes
              a third party’s intellectual property rights, the App Distributor
              will not be responsible for the investigation, defense, settlement
              and discharge of any such intellectual property infringement
              claim. (6) Legal Compliance: You represent and warrant that (i)
              you are not located in a country that is subject to a U.S.
              government embargo, or that has been designated by the U.S.
              government as a “terrorist supporting” country; and (ii) you are
              not listed on any U.S. government list of prohibited or restricted
              parties. (7) Third Party Terms Of Agreement: You must comply with
              applicable third party terms of agreement when using the Resolve
              application, e.g., if you have a VoIP application, then you must
              not be in violation of their wireless data service agreement when
              using the Resolve application. (8) Third Party Beneficiary: The
              Owner and you acknowledge and agree that the App Distributors, and
              their subsidiaries, are third party beneficiaries of this
              Agreement, and that, upon your acceptance of the terms and
              conditions of this Agreement, each App Distributor will have the
              right (and will be deemed to have accepted the right) to enforce
              this Agreement against you as a third party beneficiary thereof.
              17. TERM AND TERMINATION This Agreement shall remain in full force
              and effect while you use the app or are otherwise a user of the
              application. You may terminate your use or participation at any
              time, for any reason, by following the instructions for
              terminating user accounts in your account settings, or by
              contacting us using the contact information below. WITHOUT
              LIMITING ANY OTHER PROVISION OF THIS AGREEMENT, WE RESERVE THE
              RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY,
              DENY ACCESS TO AND USE OF THE SITES AND THE SERVICES, TO ANY
              PERSON FOR ANY REASON OR FOR NO REASON AT ALL, INCLUDING WITHOUT
              LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY OR COVENANT
              CONTAINED IN THIS AGREEMENT, OR OF ANY APPLICABLE LAW OR
              REGULATION, AND WE MAY TERMINATE YOUR USE OF THE APP, DELETE YOUR
              PROFILE AND ANY CONTENT OR INFORMATION THAT YOU HAVE POSTED AT ANY
              TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION. In order to protect
              the integrity of the app, we reserve the right at any time in our
              sole discretion to block certain IP addresses from accessing the
              app. Any provisions of this Agreement that, in order to fulfill
              the purposes of such provisions, need to survive the termination
              or expiration of this Agreement, shall be deemed to survive for as
              long as necessary to fulfill such purposes. 18. Dispute All
              questions of law, rights, and remedies regarding any act, event or
              occurrence undertaken pursuant or relating to application shall be
              governed and construed by the laws of the State of Texas,
              excluding such state’s conflicts of law rules. Any legal action of
              whatever nature by or against the Owner arising out of or related
              in any respect to the Resolve app shall be brought solely in
              either the applicable federal or state courts located in or with
              jurisdiction of the state of Texas, USA subject, however, to the
              right of Company, at the Company's sole discretion, to bring an
              action to seek injunctive relief to enforce this Terms or to stop
              or prevent an infringement of proprietary or other third party
              rights (or any similar cause of action) in any applicable court in
              any jurisdiction where jurisdiction exists with regard to a user.
              You hereby consent to (and waive any challenge or objection to)
              personal jurisdiction and venue in the above-referenced courts.
              Application of the United Nations Convention on Contracts for the
              International Sale of Goods is excluded from this Agreement.
              Additionally, application of the Uniform Computer Information
              Transaction Act (UCITA) is excluded from this Agreement. In no
              event shall any claim, action or proceeding by you related in any
              way to the app (including your use of the app) be instituted more
              than two (2) years after the cause of action arose. You will be
              liable for any attorneys' fees and costs if we have to take any
              legal action to enforce this Agreement. 19. GENERAL PROVISIONS a.
              Assignment: The Owner shall be permitted to assign, transfer its
              rights and/or obligations under these terms. However, you shall
              not be permitted to assign, transfer any rights and/or obligations
              under these terms. b. Entire Agreement: These Terms, disclaimers
              and any other agreement relating to the use of this Application
              constitutes the entire agreement and shall supersede any other
              agreement. c. Separate Agreements: You may have other legal
              agreements with us. Those agreements are separate from these
              Terms. These Terms are not intended to alter, amend, revise or
              replace the terms of the other agreement. d. Applicable law: These
              Terms may be governed and construed in accordance with the Laws,
              regulation or guidelines of the state of Texas, United States of
              America, and other treaties, or regulations which is applicable in
              United States of America.
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
