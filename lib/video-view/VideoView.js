import React, { Component } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Text
} from "react-native"
import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Video, { FilterType } from "react-native-video"
import ToggleButton from "../toggle-button/ToggleButton"
import CaptionEditor from "../caption-editor/CaptionEditor"
import { Caption } from "../caption-editor/Caption"
import Theme from "../../Styles/Theme"
import Toast from "react-native-toast-message"

class VideoView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cEditorEnabled: false,
      mute: false,
      text: "",
      color: "#fff",
      disableSubmit: false,
      paused: true,
      playedOnce: false
    }
    this.caption = null
    this.finishEditingCaption = this.finishEditingCaption.bind(this)
  }

  onCancel() {
    this.setState({ text: "", color: "" })
    this.closeCaptionEditor()
    this.props.onCancel()
  }

  onLoad() {
    this.props.onLoad()
  }

  openCaptionEditor() {
    this.setState({ cEditorEnabled: true })
  }

  closeCaptionEditor() {
    this.setState({ cEditorEnabled: false })
  }

  finishEditingCaption(text, color) {
    this.closeCaptionEditor()
    this.setState({ text: text, color: color, cEditorEnabled: false })
    this.props.onFinishEditingCaption(text)
  }

  toggleMute() {
    this.setState({ mute: !this.state.mute })
  }

  onSave() {
    this.props
      .onSave()
      .then(() => {})
      .catch(error => {})
  }

  onMultiClipMode() {
    this.props.onMultiClipMode()
  }

  onBack() {
    this.props.onBack()
  }

  onSubmit() {
    if (this.state.playedOnce) {
      var caption = {
        text: this.state.text,
        color: this.state.color,
        offset: this.caption ? this.caption.getRelativeOffset() : 0.5
      }
      this.setState({ disableSubmit: true })
      this.props.onSubmit(caption, this.state.mute)
    } else {
      Toast.show({
        text1: "review video before sending",
        text2: "You must review the recorded video before sending to other",
        type: "error"
      })
    }
  }

  renderVideo() {
    return (
      <TouchableWithoutFeedback
        disabled={!this.props.multiClipMode}
        onPress={this.onBack.bind(this)}
        style={styles.container}
      >
        <Video
          resizeMode={Platform.OS == "ios" ? "stretch" : "cover"}
          ref={component => (this._video = component)}
          style={{ width: "100%", flex: 1 }}
          source={{ uri: this.props.data.uri }}
          muted={this.state.mute}
          repeat={false}
          type="mov"
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch={"obey"}
          filter={FilterType.NONE}
          filterEnable={true}
          fullscreen
          fullscreenOrientation="portrait"
          // source={this.props.source}
          // paused={this.props.pause}
          paused={this.state.paused}
          hideShutterView={false}
          onLoad={this.onLoad.bind(this)}
          selectedVideoTrack={{ type: "resolution", value: "360" }}
          onLayout={() => {
            this.setState({ text: "" })
          }}
          onEnd={() => {
            this.setState({ paused: true })
          }}
        ></Video>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    if (this.props.data && !this.props.multiClipMode) {
      return (
        <View style={this.props.style}>
          <TouchableOpacity
            style={[styles.iconButton, styles.floatingTopLeftButton]}
            onPress={this.onCancel.bind(this)}
          >
            <Icon name={"close"} size={34} color="#FFF" />
          </TouchableOpacity>
          {this.state.cEditorEnabled ? null : (
            <TouchableOpacity
              style={[styles.iconButton, styles.floatingBottomRightButton]}
              onPress={
                this.state.disableSubmit ? null : this.onSubmit.bind(this)
              }
            >
              {this.state.disableSubmit ? (
                <ActivityIndicator size="small" color={Theme.THEME_COLOR} />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 60
                  }}
                >
                  <Text style={{ fontSize: 25, color: "gray" }}>SEND</Text>
                  <Icon name="arrow-right" size={25} color="gray" />
                </View>
              )}
            </TouchableOpacity>
          )}

          <View style={styles.overlay}>
            <Caption
              ref={ref => {
                this.caption = ref
              }}
              onPress={this.openCaptionEditor.bind(this)}
              visible={!this.state.cEditorEnabled}
              lock={false}
              color={this.state.color}
              // text={this.state.text}
              text={
                this.props.data.caption != undefined
                  ? this.props.data.caption
                  : ""
              }
            />
            {!this.state.paused ? null : (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: "red",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    // position: "absolute",
                    // bottom: 0,
                    // top: 0,
                    // left: 0,
                    // right: 0,
                    elevation: 2,
                    justifyContent: "center",
                    alignItems: "center"
                  }
                ]}
                onPress={() => {
                  this._video && this._video.seek(0)
                  this.setState({ paused: false })
                  this.setState({ playedOnce: true })
                  // this.setState({ paused: !this.state.paused })
                }}
              >
                <Icon name="play" size={45} color="white" style={{}} />
              </TouchableOpacity>
            )}
          </View>

          {this.renderVideo()}
        </View>
      )
    } else {
      return null
    }
  }
}
const { width, height } = Dimensions.get("screen")
let aspectRatio = ""
if (width > height) {
  aspectRatio = width / height
} else {
  aspectRatio = height / width
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  video: {
    height,
    width,
    backgroundColor: "red"
  },
  toolBar: {
    position: "absolute",
    top: 70,
    right: 0,
    paddingTop: 15,
    width: 60,
    height: "25%",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2
  },
  iconButton: {
    height: 50,
    width: 50
  },
  floatingTopLeftButton: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 15,
    paddingTop: 15,
    marginTop: 40,
    marginLeft: 5,
    zIndex: 2
  },
  floatingBottomRightButton: {
    position: "absolute",
    bottom: 20,

    zIndex: 2,
    width: "90%",
    height: 60,
    alignSelf: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center"
  },
  floatingBottomLeftButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingLeft: 15,
    paddingBottom: 15,
    zIndex: 2
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

VideoView.propTypes = {
  style: PropTypes.obj,
  multiClipMode: PropTypes.bool,
  data: PropTypes.string,
  muted: PropTypes.bool,
  onCancel: PropTypes.func,
  onLoad: PropTypes.func,
  onSave: PropTypes.func,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func
}

VideoView.defaultProps = {
  multiClipMode: false,
  style: styles.container,
  data: null,
  muted: false,
  onCancel: () => {},
  onLoad: () => {},
  onSave: () => {},
  onBack: () => {},
  onSubmit: () => {}
}

export default VideoView
