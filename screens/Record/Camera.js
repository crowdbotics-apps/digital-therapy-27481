import React, { Component } from "react"
import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Text,
  Modal,
  FlatList,
  PermissionsAndroid,
  Alert,
  BackHandler
} from "react-native"
// import RNCamera from './lib/react-native-camera';
import { RNCamera } from "react-native-camera"
import CaptureButton from "../../lib/capture-button/CaptureButton"
import PictureView from "../../lib/picture-view/PictureView"
import VideoView from "../../lib/video-view/VideoView"
import ToggleButton from "../../lib/toggle-button/ToggleButton"
import MultiClipManager from "../../lib/multiclip-manager/MultiClipManager"
import RNFS from "react-native-fs"
import { Header, BaseURL } from "../../Connection/index"
import axios from "axios"
import Theme from "../../Styles/Theme"
import Icon from "react-native-vector-icons/MaterialIcons"
import {} from "../../Actions/index"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Slider from "@ptomasroos/react-native-multi-slider"
import Toast from "react-native-toast-message"
var results = []

class CameraView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameraOn: true,
      multiClipMode: false,
      flash: false,
      facing: "back",
      torch: "off",
      recording: false,
      video: null,
      videoProcessing: false,
      picture: null,
      loading_status: false,
      showFilter: false,
      filter: "auto",
      videoSubmitting: false,
      videoSubmitted: false,
      currentVideoIndex: 0, //For Multiple video tracking
      showExposure: false,
      exposureValue: [0],
      uploadedValue: "",
      totalValue: "",
      totalVideosCount: "",
      currentVideoCount: 0,
      percentCompleted: 0,
      disableSubmit: false
    }

    this.RNCamera = null
    this.captureButton = null
    this.mcManager = null
    this.fullsreenClip = this.fullsreenClip.bind(this)
    this.popVideoClip = this.popVideoClip.bind(this)
    this.submitVideo = this.submitVideo.bind(this)
    this.submitPicture = this.submitPicture.bind(this)
    this.upload = this.upload.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }
  async componentWillMount() {
    results = []

    if (Platform.OS === "ios") {
      // let check = hasVideoAndAudio
      //   ? Camera.checkDeviceAuthorizationStatus
      //   : Camera.checkVideoAuthorizationStatus;
      // if (check) {
      //   const isAuthorized = await check();
      //   this.setState({isAuthorized, isAuthorizationChecked: true});
      // }
    } else if (Platform.OS === "android") {
      const camera_granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: this.props.permissionDialogTitle,
          message: this.props.permissionDialogMessage
        }
      )

      const audio_granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: this.props.permissionDialogTitle,
          message: this.props.permissionDialogMessage
        }
      )

      const write_media = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: this.props.permissionDialogTitle,
          message: this.props.permissionDialogMessage
        }
      )

      const granted = camera_granted && audio_granted && write_media

      // On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest,
      // so check and request should always be true.
      // https://github.com/facebook/react-native-website/blob/master/docs/permissionsandroid.md
      const isAuthorized =
        Platform.Version >= 23
          ? granted === PermissionsAndroid.RESULTS.GRANTED
          : granted === true

      this.setState({
        isAuthorized,
        isAuthorizationChecked: true
      })
    } else {
      this.setState({ isAuthorized: true, isAuthorizationChecked: true })
    }
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    )
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    )
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null)
    // return true
  }
  deleteListing() {}
  toggleFlash() {
    this.setState({ flash: !this.state.flash })
  }
  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter })
  }
  toggleExposure() {
    this.setState({ showExposure: !this.state.showExposure })
  }

  switchFacing() {
    this.setState({ facing: this.state.facing == "back" ? "front" : "back" })
  }

  startRecording() {
    var self = this
    if (this.state.multiClipMode && this.mcManager != null) {
      if (this.mcManager.getClips().length < 6) {
        this.record()
      } else {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Cannot upload more than 6 videos",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          onPress: () => {},
          props: {} // any custom props passed to the Toast component
        })
      }
    } else {
      this.record()
    }
  }
  record() {
    var self = this
    if (this.RNCamera != null) {
      var capture = () => {
        this.RNCamera.recordAsync({ codec: "H264" })
          .then(data => {
            if (this.state.multiClipMode && this.mcManager != null) {
              this.setState({
                video: data,
                currentVideoIndex: this.mcManager.pushClip(data)
              })
            } else {
              this.setState({ video: data })
            }
            results.push(data)
          })
          .catch(error => {
            if (this.captureButton) {
              this.captureButton.resetTimer(30000)
            }
          })
          .finally(() => {
            self.setState({ videoProcessing: false })
          })
      }
      if (this.state.flash) {
        this.setState({ recording: true, torch: "on" })
        setTimeout(capture, 600)
      } else {
        this.setState({ recording: true })
        capture()
      }
    }
  }
  stopRecording() {
    if (this.RNCamera != null) {
      this.RNCamera.stopRecording()
      this.setState({ recording: false, torch: "off" })
      this.captureButton.resetTimer(30000)
    }

    this.setState({ videoProcessing: false })
  }

  stitchClips() {
    var that = this
    that.setState({
      multiClipMode: false,
      video: data,
      videoProcessing: false
    })
    return new Promise(function (resolve, reject) {
      if (that.state.multiClipMode && that.RNCamera) {
        that.RNCamera.stitchVideoClips()
          .then(data => {
            that.setState({
              multiClipMode: false,
              video: data,
              videoProcessing: false
            })
            resolve()
          })
          .catch(error => {
            reject()
          })
      } else {
        reject()
      }
    })
  }

  clearClips() {
    results = []
    if (this.state.multiClipMode || this.RNCamera) {
      this.RNCamera.clearVideoClips()
      this.setState({ multiClipMode: false })
    }
  }

  cancelVideo() {
    if (results.length > 0) {
      results.pop()
    }
    if (this.captureButton) {
      this.captureButton.resetTimer()
    }
    this.deleteVideoFile(this.state.video.uri)
    this.setState({ video: null })
  }

  popVideoClip(clip, empty) {
    if (this.captureButton) {
      this.captureButton.resetTimer(clip.duration)
    }
    if (empty) {
      //no more clips in stack, revert to default mode
      this.setState({ multiClipMode: false })
      results = []
    }
    this.deleteVideoFile(clip.uri)
    // this.RNCamera.deleteVideoClip();
  }

  cancelPicture() {
    this.RNCamera.startPreview()
    this.RNCamera.deletePicture()
    this.setState({ picture: null })
  }

  saveVideo() {
    // return this.RNCamera.saveCurrentClip();
  }

  savePicture() {
    return this.RNCamera.savePicture()
  }

  fullsreenClip(clip, index) {
    this.setState({ video: clip, currentVideoIndex: index })
  }

  exitFullscreen() {
    this.setState({ video: null })
  }

  enableMultiClipMode() {
    var data = this.state.video
    this.setState({ video: null, multiClipMode: true }, () => {
      if (this.mcManager != null) {
        this.mcManager.pushClip(data)
      }
    })
  }

  submitVideo(caption, muted) {
    var self = this
    if (caption.text == undefined) {
      caption.text = ""
    }
    this.setState({ disableSubmit: true })
    if (this.state.video != null && this.mcManager == null) {
      //@TODO submit to backend & navigate
      const filename = Date.now().toString()
      if (Platform.OS == "ios") {
        //here you can upload the video...
        const file = {
          uri: self.state.video.uri,
          type: "video/mp4",
          name: "filename"
        }

        self.uploadAsyncAxios(
          file,
          0,
          1,
          self.state.video.caption != undefined ? self.state.video.caption : ""
        )
      } else {
        const file = {
          uri: self.state.video.uri,
          type: "video/mp4",
          name: "filename"
        }
        console.warn("called no mp4")
        self.uploadAsyncAxios(
          file,
          0,
          1,
          self.state.video.caption != undefined ? self.state.video.caption : ""
        )
      }
    } else if (self.mcManager != null && self.mcManager.getClips().length > 0) {
      var count = 0
      const filename = Date.now().toString()
      if (Platform.OS == "ios") {
        const file = {
          uri: self.mcManager.getClips()[count].uri,
          type: "video/mp4",
          name: "filename"
        }

        self.uploadAsyncAxios(
          file,
          0,
          self.mcManager.getClips().length,
          self.mcManager.getClips()[count].caption != undefined
            ? self.mcManager.getClips()[count].caption
            : ""
        )
      } else {
        const file = {
          uri: self.mcManager.getClips()[count].uri,
          type: "video/mp4",
          name: "filename"
        }

        self.uploadAsyncAxios(
          file,
          0,
          self.mcManager.getClips().length,
          self.mcManager.getClips()[count].caption != undefined
            ? self.mcManager.getClips()[count].caption
            : ""
        )
      }
    }
  }
  uploadAsyncAxios(file, count, total, annotation) {
    var self = this
    self.setState({
      videoSubmitting: true,
      percentCompleted: 0,
      currentVideoCount: count
    })

    const formData = new FormData()
    formData.append("file", file)
    // formData.append(
    //   "listing_id",
    //   "" + self.props.addListingReducer.addedListingID
    // )
    formData.append("annotation", annotation == undefined ? "" : annotation)
    formData.append("sequence_id", count)

    axios.defaults.timeout = 300000
    const filename = Date.now().toString()

    axios({
      method: "post",
      url: BaseURL.concat("/api/upload"),
      data: formData,
      headers: Header,

      onUploadProgress: progressEvent => {
        if (progressEvent.lengthComputable) {
          console.log(progressEvent.loaded + " " + progressEvent.total)
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          self.updateProgressBarValue(
            progressEvent,
            count,
            total,
            percentCompleted
          )
        }
      }
    })
      .then(response => {
        if (count == total - 1) {
          // alert('Video Uploaded Successfully');
          self.setState({
            videoSubmitting: false,
            videoSubmitted: true,
            currentVideoCount: 0,
            totalVideosCount: 0,
            disableSubmit: false
          })
          // self.props.navigation.replace('UploadedListingDetail');
        } else {
          if (self.mcManager != null) {
            count = count + 1
            if (Platform.OS == "ios") {
              const file = {
                uri: self.mcManager.getClips()[count].uri,
                type: "video/mp4",
                name: "filename"
              }
              self.uploadAsyncAxios(
                file,
                count,
                total,
                self.mcManager.getClips()[count].caption
              )
            } else {
              const file = {
                uri: self.mcManager.getClips()[count].uri,
                type: "video/mp4",
                name: "filename"
              }
              self.uploadAsyncAxios(
                file,
                count,
                total,
                self.mcManager.getClips()[count].caption
              )
            }
          }
        }
      })

      .catch(error => {
        console.error(error)
        self.setState({ videoSubmitting: false, videoSubmitted: false })
      })
  }

  submitPicture(caption) {
    if (this.state.picture) {
      //@TODO submit to backend & navigate
    }
  }
  renderCamera() {
    if (this.state.cameraOn) {
      if (Platform.OS === "android") {
        return (
          <RNCamera
            ref={cam => {
              this.RNCamera = cam
            }}
            style={styles.RNCamera}
            type={this.state.facing}
            flashMode={this.state.flash ? "torch" : "off"}
            captureAudio={true}
            exposure={this.state.exposureValue[0]}
            // defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
            captureMode={"video"}
            whiteBalance={this.state.filter}
            // playSoundOnCapture={false}
            onRecordingEnd={data => {
              this.setState({ videoProcessing: false })
            }}
          ></RNCamera>
        )
      }
      return (
        <RNCamera
          ref={cam => {
            this.RNCamera = cam
          }}
          style={styles.RNCamera}
          type={this.state.facing}
          flashMode={this.state.flash ? "torch" : "off"}
          captureAudio={true}
          // exposure={this.state.exposureValue[0]}
          whiteBalance={this.state.filter}
          autoExposure={true}
          autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
          zoom={0.0}
          autoFocus={"on"}
          videoStabilizationMode={3} //auto
          onRecordingEnd={data => {
            this.setState({ videoProcessing: false })
          }}
        ></RNCamera>
      )
    } else {
      return null
    }
  }

  renderRightCameraControl(hide, opacity) {
    if (this.state.multiClipMode) {
      return (
        // <LoaderButton
        //   disabled={hide}
        //   style={styles.iconButton}
        //   iconStyle={opacity}
        //   iconSize={34}
        //   color="#FFF"
        //   icon={'stop-circle-outline'}
        //   onPress={this.stitchClips.bind(this)}
        // />
        <TouchableOpacity
          style={[styles.iconButton, styles.floatingBottomRightButton]}
          onPress={this.state.disableSubmit ? null : this.submitVideo}
        >
          {this.state.disableSubmit ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            <Icon name={"send"} size={34} color="#FFF" />
          )}
        </TouchableOpacity>
      )
    } else {
      return (
        <ToggleButton
          disabled={hide}
          style={styles.iconButton}
          iconSize={34}
          color="#FFF"
          icon={"camera-party-mode"}
          toggledIcon={"emoticon-tongue"}
          forceDefault={this.state.facing == "front"}
          onPress={this.switchFacing.bind(this)}
        />
      )
    }
  }
  renderExposureSlider() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <Icon
          name="brightness-low"
          size={20}
          color="white"
          style={{ color: "white" }}
        />
        <Slider
          containerStyle={{ alignSelf: "center" }}
          values={this.state.exposureValue}
          min={-1}
          max={1}
          step={0.1}
          selectedStyle={{ backgroundColor: "white" }}
          markerStyle={{ backgroundColor: "white" }}
          unselectedStyle={{ backgroundColor: "gray" }}
          onValuesChangeFinish={value => {
            this.setState({ exposureValue: value })
          }}
          customMarkerLeft={() => (
            <View style={{ marginTop: 20, height: 50 }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  elevation: 1,
                  backgroundColor: "white"
                }}
              />
              <Text style={{ color: "white", marginVertical: 5 }}>
                {this.state.exposureValue}
              </Text>
            </View>
          )}
        />
        <Icon
          name="brightness-high"
          size={20}
          color="white"
          style={{ color: "white" }}
        />
      </View>
    )
  }
  renderCameraControls() {
    const overlay = this.state.picture != null || this.state.video != null
    const hide = this.state.recording || overlay

    const opacity = { opacity: hide == true ? 0 : 1 }
    const opacity2 = { opacity: overlay == true ? 0 : 1 }

    return (
      <View style={{ flex: 0.28 }}>
        {/* {this.state.showExposure ? this.renderExposureSlider() : <View />} */}
        {/* {this.renderFilter()} */}
        <View style={styles.bottomControls}>
          {/* <ToggleButton
            disabled={hide}
            style={styles.iconButton}
            iconSize={34}
            color="#FFF"
            icon={this.state.flash ? "flash" : "flash-off"}
            toggledIcon={this.state.flash ? "flash" : "flash-off"}
            onPress={this.toggleFlash.bind(this)}
          /> */}

          <CaptureButton
            style={opacity2}
            disabled={overlay}
            ref={ref => {
              this.captureButton = ref
            }}
            onTimerEnd={this.stopRecording.bind(this)}
            onLongPressOut={this.stopRecording.bind(this)}
            onLongPressIn={this.startRecording.bind(this)}
            maxTimerDuration={30000}
          />
          {/* {this.renderRightCameraControl(hide, opacity)} */}
        </View>
      </View>
    )
  }
  renderFilter() {
    if (this.state.showFilter) {
      return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ width: "80%", alignSelf: "center" }}
          data={[
            "auto",
            "sunny",
            "cloudy",
            "shadow",
            "incandescent",
            "fluorescent"
          ]}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 10 }}></View>
          )}
          renderItem={({ item, index }) => {
            if (item === this.state.filter) {
              return (
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 35,
                    backgroundColor: Theme.Theme_PURPLE,
                    borderWidth: 0.5,
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={() => {
                    this.setState({ filter: item })
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 8, textAlign: "center" }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            }
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 35,
                  backgroundColor: "black",
                  borderWidth: 0.5,
                  borderColor: "gray",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.setState({ filter: item })
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 6, textAlign: "center" }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          }}
        ></FlatList>
      )
    }
  }
  renderMultiClipManager() {
    if (this.state.multiClipMode) {
      return (
        <View style={styles.mcManager}>
          <MultiClipManager
            ref={ref => (this.mcManager = ref)}
            style={{ flex: 1 }}
            onClearClips={this.clearClips.bind(this)}
            onPopClip={(data, empty) => {
              this.popVideoClip(data, empty)
            }}
            onFullScreen={(clip, index) => {
              this.fullsreenClip(clip, index)
            }}
          />
        </View>
      )
    } else {
      return null
    }
  }
  render() {
    // if (this.state.videoProcessing) {
    //   return (
    //     <ActivityIndicator
    //       style={{alignSelf: 'center'}}
    //       size="small"
    //       color="white"
    //     />
    //   );
    // }

    if (this.state.videoSubmitted) {
      setTimeout(() => {
        this.setState({ videoSubmitted: false })
        this.props.navigation.replace("ImageSelection")
        // this.props.navigation.replace('UploadedListingDetail');
      }, 3000)
      return (
        <Modal transparent visible={this.state.videoSubmitted}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                padding: 10,
                height: 150,
                borderRadius: 5,
                width: "80%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={[styles.progressHeader, { fontSize: 16 }]}>
                Video Uploaded Successfully
              </Text>
              <Icon
                name="check-circle"
                style={{ fontSize: 70 }}
                size="large"
                color={Theme.THEME_COLOR}
              />
            </View>
          </View>
        </Modal>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderCamera()}
        {/* <View
          style={{
            position: "absolute",
            top: 70,
            right: 20,
            elevation: 0,
            zIndex: 2
          }}
        >
          <ToggleButton
            style={styles.iconButton}
            iconSize={34}
            color={this.state.showFilter ? Theme.Theme_PURPLE : "#fff"}
            icon={"filter"}
            toggledIcon={"filter"}
            onPress={this.toggleFilter.bind(this)}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 140,
            right: 20,
            elevation: 0,
            zIndex: 2
          }}
        >
          <ToggleButton
            style={[styles.iconButton]}
            color={this.state.showFilter ? Theme.Theme_PURPLE : "#fff"}
            iconSize={34}
            icon={"white-balance-incandescent"}
            toggledIcon={"white-balance-sunny"}
            onPress={this.toggleExposure.bind(this)}
          />
        </View>
       
        <View
          style={{
            position: "absolute",
            top: 210,
            right: 20,
            elevation: 0,
            zIndex: 2
          }}
        ></View>
        */}
        <View style={styles.uiContainer}>
          {/* {this.state.videoProcessing ? (
            <View />
          ) : ( */}
          {this.renderMultiClipManager()}
          {/* )} */}
          {this.state.videoProcessing && this.mcManager == null ? (
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator
                style={{ alignSelf: "center" }}
                size="small"
                color="white"
              />
            </View>
          ) : (
            this.renderCameraControls()
          )}
        </View>

        <VideoView
          style={styles.overlay}
          onSave={this.saveVideo.bind(this)}
          onCancel={this.cancelVideo.bind(this)}
          onBack={this.exitFullscreen.bind(this)}
          onSubmit={this.submitVideo}
          onMultiClipMode={this.enableMultiClipMode.bind(this)}
          multiClipMode={this.state.multiClipMode}
          data={this.state.video}
          onFinishEditingCaption={this.onFinishEditingCaption.bind(this)}
          captionText={{}}
          pause={this.state.videoSubmitting}
        />
        {this.renderProgressLoader()}
      </View>
    )
  }

  renderProgressLoader() {
    return (
      <Modal visible={this.state.videoSubmitting}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000020",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              width: "80%",
              alignItems: "center"
            }}
          >
            <Text style={styles.progressHeader}>
              Uploading {this.state.currentVideoCount + 1} of{" "}
              {this.mcManager != null && this.mcManager != undefined
                ? this.mcManager.getClips().length
                : "1"}
            </Text>
            {/* <Container>
                <Content>
                  <ProgressBar progress={this.state.percentCompleted} />
                </Content>
              </Container> */}

            <ActivityIndicator size="large" color="#f35588" />
            {/* <Text>{this.state.percentCompleted}</Text> */}
          </View>
        </View>
      </Modal>
    )
  }
  onFinishEditingCaption(text) {
    if (this.mcManager === null) {
      var temp = {
        caption: text
      }
      this.setState(prevState => ({
        video: { ...prevState.video, ...temp }
      }))
    } else if (this.mcManager !== null) {
      var temp = {
        caption: text
      }
      var multivideo = this.mcManager.getClips()
      var tempClip = multivideo[this.state.currentVideoIndex]
      tempClip.caption = text
    }
  }
  deleteVideoFile(filepath) {
    var self = this
    RNFS.exists(filepath)
      .then(result => {
        if (result) {
          return (
            RNFS.unlink(filepath)
              .then(() => {
                console.warn("FILE DELETED")
                self.setState({ videoProcessing: false })
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch(err => {
                console.warn(err.message)
              })
          )
        }
      })
      .catch(err => {
        console.warn(err.message)
      })
  }

  upload(file, annotation) {
    var self = this
    this.setState({ videoSubmitting: true })

    const formData = new FormData()
    formData.append("file", file)
    // formData.append(
    //   "listing_id",
    //   "" + self.props.addListingReducer.addedListingID
    // )
    formData.append("annotation", annotation)
    fetch(BaseURL.concat.concat("/api/upload"), {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        response.json()
      })
      .then(responseJson => {
        self.props.navigation.replace("UploadedListingDetail")
      })
      .catch(error => {
        console.warn(error)
        // alert('Upload unsuccessful');
      })
      .finally(() => {
        self.setState({ videoSubmitting: false })
      })
  }

  updateProgressBarValue(value, count, total, percentCompleted) {
    this.setState({
      uploadedValue: value.loaded,
      totalValue: value.total,
      currentVideoCount: count,
      totalVideosCount: total,
      percentCompleted: percentCompleted
    })
  }

  async convertGalleryObjectName(item) {
    results.push({
      uri: item.path
    })
    return results
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  },
  uiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end"
    // zIndex: 0,
  },
  mcManager: {
    flex: 0.15,
    width: "100%"
  },
  bottomControls: {
    flex: 1,

    paddingBottom: "8%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  iconButton: {
    height: 50,
    width: 50
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    width: "100%",
    height: "100%"
  },
  RNCamera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
})
const mapStateToProps = state => {
  const {} = state
  return {}
}
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CameraView)
