import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  DeviceEventEmitter, // android
  NativeAppEventEmitter, // ios
  NativeModules,
  Platform,
  StyleSheet,
  findNodeHandle,
  requireNativeComponent,
  ViewPropTypes,
  PermissionsAndroid,
  ActivityIndicator,
  View,
  Text,
  UIManager,
  NativeComponent,
} from 'react-native';
import {Constants} from './RNCamera';

const CameraManager = NativeModules.CameraManager || NativeModules.CameraModule;

function convertNativeProps(props) {
  const newProps = {...props};

  if (typeof props.aspect === 'string') {
    newProps.aspect = Camera.constants.Aspect[props.aspect];
  }

  if (typeof props.flashMode === 'string') {
    newProps.flashMode = Camera.constants.FlashMode[props.flashMode];
  }

  if (typeof props.zoom === 'string' || typeof props.zoom === 'number') {
    if (props.zoom >= 0 && props.zoom <= 100) {
      newProps.zoom = parseInt(props.zoom);
    }
  }

  if (typeof props.orientation === 'string') {
    newProps.orientation = Camera.constants.Orientation[props.orientation];
  }

  if (typeof props.torchMode === 'string') {
    newProps.torchMode = Camera.constants.TorchMode[props.torchMode];
  }

  if (typeof props.type === 'string') {
    newProps.type = Camera.constants.Type[props.type];
  }

  if (typeof props.captureQuality === 'string') {
    newProps.captureQuality =
      Camera.constants.CaptureQuality[props.captureQuality];
  }

  if (typeof props.captureMode === 'string') {
    newProps.captureMode = Camera.constants.CaptureMode[props.captureMode];
  }

  if (typeof props.captureTarget === 'string') {
    newProps.captureTarget =
      Camera.constants.CaptureTarget[props.captureTarget];
  }

  // do not register barCodeTypes if no barcode listener
  if (typeof props.onBarCodeRead !== 'function') {
    newProps.barCodeTypes = [];
  }

  newProps.barcodeScannerEnabled = typeof props.onBarCodeRead === 'function';

  return newProps;
}

export default class Camera extends Component {
  static constants = {
    Aspect: CameraManager.Aspect,
    BarCodeType: CameraManager.BarCodeType,
    Type: CameraManager.Type,
    CaptureMode: CameraManager.CaptureMode,
    CaptureTarget: CameraManager.CaptureTarget,
    CaptureQuality: CameraManager.CaptureQuality,
    Orientation: CameraManager.Orientation,
    FlashMode: CameraManager.FlashMode,
    Zoom: CameraManager.Zoom,
    TorchMode: CameraManager.TorchMode,
  };

  static propTypes = {
    ...ViewPropTypes,
    aspect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    captureAudio: PropTypes.bool,
    captureMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    captureQuality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    captureTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultOnFocusComponent: PropTypes.bool,
    flashMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zoom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    keepAwake: PropTypes.bool,
    onBarCodeRead: PropTypes.func,
    barcodeScannerEnabled: PropTypes.bool,
    cropToPreview: PropTypes.bool,
    clearWindowBackground: PropTypes.bool,
    onFocusChanged: PropTypes.func,
    onZoomChanged: PropTypes.func,
    mirrorImage: PropTypes.bool,
    fixOrientation: PropTypes.bool,
    barCodeTypes: PropTypes.array,
    orientation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    playSoundOnCapture: PropTypes.bool,
    torchMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    permissionDialogTitle: PropTypes.string,
    permissionDialogMessage: PropTypes.string,
    notAuthorizedView: PropTypes.element,
    pendingAuthorizationView: PropTypes.element,
  };

  static defaultProps = {
    aspect: CameraManager.Aspect.fill,
    type: CameraManager.Type.back,
    orientation: CameraManager.Orientation.auto,
    fixOrientation: false,
    captureAudio: false,
    captureMode: CameraManager.CaptureMode.still,
    captureTarget: CameraManager.CaptureTarget.cameraRoll,
    captureQuality: CameraManager.CaptureQuality.high,
    defaultOnFocusComponent: true,
    flashMode: CameraManager.FlashMode.off,
    zoom: 0,
    playSoundOnCapture: true,
    torchMode: CameraManager.TorchMode.off,
    mirrorImage: false,
    cropToPreview: false,
    clearWindowBackground: false,
    barCodeTypes: Object.values(CameraManager.BarCodeType),
    barcodeScannerEnabled: false,
    permissionDialogTitle: '',
    permissionDialogMessage: '',
    notAuthorizedView: (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
          }}>
          Camera not authorized
        </Text>
      </View>
    ),
    pendingAuthorizationView: (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="small" />
      </View>
    ),
  };

  static checkDeviceAuthorizationStatus =
    CameraManager.checkDeviceAuthorizationStatus;
  static checkVideoAuthorizationStatus =
    CameraManager.checkVideoAuthorizationStatus;
  static checkAudioAuthorizationStatus =
    CameraManager.checkAudioAuthorizationStatus;

  setNativeProps(props) {
    // eslint-disable-next-line
    this._cameraRef.setNativeProps(props);
  }

  constructor() {
    super();
    this.state = {
      isAuthorized: false,
      isAuthorizationChecked: false,
      isRecording: false,
      pausableRecordingStopped: false,
    };
    this._cameraRef = null;
    this._cameraHandle = null;
  }

  async componentWillMount() {
    //this._addOnBarCodeReadListener();

    let {captureMode} = convertNativeProps({
      captureMode: this.props.captureMode,
    });
    let hasVideoAndAudio =
      this.props.captureAudio &&
      captureMode === Camera.constants.CaptureMode.video;

    if (Platform.OS === 'ios') {
      let check = hasVideoAndAudio
        ? Camera.checkDeviceAuthorizationStatus
        : Camera.checkVideoAuthorizationStatus;

      if (check) {
        const isAuthorized = await check();
        this.setState({isAuthorized, isAuthorizationChecked: true});
      }
    } else if (Platform.OS === 'android') {
      const camera_granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: this.props.permissionDialogTitle,
          message: this.props.permissionDialogMessage,
        },
      );

      const audio_granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: this.props.permissionDialogTitle,
          message: this.props.permissionDialogMessage,
        },
      );

      const write_media = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: this.props.permissionDialogTitle,
          message: this.props.permissionDialogMessage,
        },
      );

      const granted = camera_granted && audio_granted && write_media;

      // On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest,
      // so check and request should always be true.
      // https://github.com/facebook/react-native-website/blob/master/docs/permissionsandroid.md
      const isAuthorized =
        Platform.Version >= 23
          ? granted === PermissionsAndroid.RESULTS.GRANTED
          : granted === true;

      this.setState({
        isAuthorized,
        isAuthorizationChecked: true,
      });
    } else {
      this.setState({isAuthorized: true, isAuthorizationChecked: true});
    }
  }

  unlock() {
    if (Platform.OS == 'android') {
      const props = convertNativeProps(this.props);
      CameraManager.unlock({type: props.type});
    }
  }

  componentWillUnmount() {
    //this._removeOnBarCodeReadListener();

    if (this.state.isRecording) {
      this.stopCapture();
    }
  }

  componentWillReceiveProps(newProps) {
    const {onBarCodeRead} = this.props;
    if (onBarCodeRead !== newProps.onBarCodeRead) {
      this._addOnBarCodeReadListener(newProps);
    }
  }

  _addOnBarCodeReadListener(props) {
    const {onBarCodeRead} = props || this.props;
    this._removeOnBarCodeReadListener();
    if (onBarCodeRead) {
      this.cameraBarCodeReadListener = Platform.select({
        ios: NativeAppEventEmitter.addListener(
          'CameraBarCodeRead',
          this._onBarCodeRead,
        ),
        android: DeviceEventEmitter.addListener(
          'CameraBarCodeReadAndroid',
          this._onBarCodeRead,
        ),
      });
    }
  }
  _removeOnBarCodeReadListener() {
    const listener = this.cameraBarCodeReadListener;
    if (listener) {
      listener.remove();
    }
  }

  _setReference = (ref) => {
    if (ref) {
      this._cameraRef = ref;
      this._cameraHandle = findNodeHandle(ref);
    } else {
      this._cameraRef = null;
      this._cameraHandle = null;
    }
  };

  render() {
    // TODO - style is not used, figure it out why
    // eslint-disable-next-line
    const style = [styles.base, this.props.style];
    const nativeProps = convertNativeProps(this.props);

    if (this.state.isAuthorized) {
      return <RCTCamera ref={this._setReference} {...nativeProps} />;
    } else if (!this.state.isAuthorizationChecked) {
      return this.props.pendingAuthorizationView;
    } else {
      return this.props.notAuthorizedView;
    }
  }

  _onBarCodeRead = (data) => {
    if (this.props.onBarCodeRead) {
      this.props.onBarCodeRead(data);
    }
  };

  savePicture() {
    if (Platform.OS === 'android') {
      return CameraManager.savePicture();
    }
  }

  saveCurrentClip() {
    if (Platform.OS === 'android') {
      return CameraManager.saveCurrentClip();
    }
  }

  getVideoClip() {
    if (Platform.OS === 'android') {
      return CameraManager.getVideoClip();
    }
  }

  deletePicture() {
    if (Platform.OS === 'android') {
      CameraManager.deletePicture();
    }
  }

  deleteVideoClip() {
    if (Platform.OS === 'android') {
      CameraManager.deleteVideoClip();
    }
  }

  clearVideoClips() {
    if (Platform.OS === 'android') {
      CameraManager.clearVideoClips();
    }
  }

  stitchVideoClips() {
    if (Platform.OS === 'android') {
      return CameraManager.stitchVideoClips();
    }
  }

  screenshot() {
    if (Platform.OS === 'android') {
      return CameraManager.takeScreenshot();
    }
  }

  startRecording(options) {
    return this.capture(options);
  }

  stopRecording() {
    return this.stopCapture();
  }

  capture(options) {
    const props = convertNativeProps(this.props);
    options = {
      audio: props.captureAudio,
      barCodeTypes: props.barCodeTypes,
      mode: props.captureMode,
      playSoundOnCapture: props.playSoundOnCapture,
      target: props.captureTarget,
      quality: props.captureQuality,
      type: props.type,
      title: '',
      description: '',
      mirrorImage: props.mirrorImage,
      fixOrientation: props.fixOrientation,
      cropToPreview: props.cropToPreview,
      WhiteBalance: props.WhiteBalance,
      ...options,
    };

    if (options.mode === Camera.constants.CaptureMode.video) {
      options.totalSeconds =
        options.totalSeconds > -1 ? options.totalSeconds : -1;
      options.preferredTimeScale = options.preferredTimeScale || 30;
      options.cropToPreview = false;
      this.setState({isRecording: true});
    }

    return CameraManager.capture(options);
  }

  startPreview() {
    if (Platform.OS === 'android') {
      const props = convertNativeProps(this.props);
      CameraManager.startPreview({
        type: props.type,
      });
    } else {
      CameraManager.startPreview();
    }
  }

  stopPreview() {
    if (Platform.OS === 'android') {
      const props = convertNativeProps(this.props);
      CameraManager.stopPreview({
        type: props.type,
      });
    } else {
      CameraManager.stopPreview();
    }
  }

  stopCapture() {
    if (this.state.isRecording) {
      this.setState({isRecording: false});
      return CameraManager.stopCapture();
    }
    return Promise.resolve('Not Recording.');
  }

  getFOV() {
    return CameraManager.getFOV();
  }

  hasFlash() {
    if (Platform.OS === 'android') {
      const props = convertNativeProps(this.props);
      return CameraManager.hasFlash({
        type: props.type,
      });
    }
    return CameraManager.hasFlash();
  }

  setZoom(zoom) {
    if (Platform.OS === 'android') {
      const props = convertNativeProps(this.props);
      return CameraManager.setZoom(
        {
          type: props.type,
        },
        zoom,
      );
    }

    return CameraManager.setZoom(zoom);
  }
}

export const constants = Camera.constants;

const RCTCamera = requireNativeComponent('RCTCamera', Camera, {
  nativeOnly: {
    testID: true,
    renderToHardwareTextureAndroid: true,
    accessibilityLabel: true,
    importantForAccessibility: true,
    accessibilityLiveRegion: true,
    accessibilityComponentType: true,
    onLayout: true,
  },
});

const styles = StyleSheet.create({
  base: {},
});
