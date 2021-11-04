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
import Theme from "../../Styles/Theme"

class VideoView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cEditorEnabled: false,
      mute: false,
      text: "",
      color: "#fff",
      disableSubmit: false,
      paused: true
    }
  }

  onCancel() {
    this.setState({ text: "", color: "" })

    this.props.onCancel()
  }

  onLoad() {
    this.props.onLoad()
  }

  onBack() {
    this.props.navigation.goBack()
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
          style={{ width: "100%", flex: 1 }}
          source={{ uri: this.props.route.params.data.uri }}
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
    console.warn(this.props.route.params.data)
    if (this.props.route.params.data) {
      return (
        <View style={this.props.style}>
          <TouchableOpacity
            style={[styles.iconButton, styles.floatingTopLeftButton]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name={"close"} size={34} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.overlay}>
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
                    alignItems: "center",
                    shadowColor: "black",
                    shadowRadius: 3,
                    shadowOffset: { x: 3, y: 3 },
                    shadowOpacity: 0.2
                  }
                ]}
                onPress={() => {
                  this.setState({ paused: !this.state.paused })
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
    borderTopRightRadius: 25
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
