import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Text,
  Pressable,
  NativeModules,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { PanGestureHandler, ScrollView, Swipeable } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const BlurGradient = (props) => {
  return (

    <BlurView
      blurType="light"
      blurAmount={10}
      style={props.style}
    >
      <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        <LinearGradient
          colors={[props.colorA, props.colorB]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          useAngle
          angle={110}
          style={{ ...styles.card, ...props.extrastyle, }}
        >
          {props.children}
        </LinearGradient>
      </Pressable>
    </BlurView>
  )
}





const App = () => {
  const [width, setWidth] = React.useState('44%');
  const [height, setHeight] = React.useState(150);

  const [subwidth, setSubWidth] = React.useState(0);
  const [subheight, setSubHeight] = React.useState(0);

  const [pressCount, setPressCount] = React.useState(1);
  const [longPressCount, setLongPressCount] = React.useState(1);
  const [bluetoothActive, setBluetoothActive] = React.useState(true);
  const [airdropSubActive, setAirdropSubActive] = React.useState(false);
  const [musicActive, setMusicActive] = React.useState(false);
  const [rotationActive, setRotationActive] = React.useState(false);
  const [multiTaskActive, setMultiTaskActive] = React.useState(false);
  const [focusActive, setFocusActive] = React.useState(false);
  const [brightnessActive, setBrightnessActive] = React.useState(false);
  const [volumeActive, setVolumeActive] = React.useState(false);
  const [torchActive, setTorchActive] = React.useState(false);
  const [cameraActive, setCameraActive] = React.useState(false);
  const [calculatorActive, setCalculatorActive] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(1)).current


  const GastureView = (props) => {
    const translateY = React.useRef(new Animated.Value(100)).current;

    const onPanGestureEvent =
      Animated.event(
        [
          {
            nativeEvent: {
              translationY: translateY,
            },
          },
        ],
        { useNativeDriver: false }
      );

    return (
      <View style={styles.flashViewContainer}>
        {props.icon}
        <BlurGradient
          style={styles.flashView}
          colorA={'rgba(0,0,0,0.6)'}
          colorB={'rgba(0,0,0,0.6)'}
        >


          <PanGestureHandler onGestureEvent={(e) => { console.log('112321321', e.nativeEvent.translationY); onPanGestureEvent(e) }}>
            <Animated.View
              style={[
                styles.square,
                {
                  transform: [
                    {
                      translateY: translateY,
                    },
                  ],
                },
              ]}
            />
          </PanGestureHandler>

        </BlurGradient>
      </View >

    )
  }

  const _onPressOutside = () => {
    LayoutAnimation.spring();

    if (torchActive) {
      setTorchActive(false);
    } else if (brightnessActive) {
      setBrightnessActive(false)
    }
    else if (volumeActive) {
      setVolumeActive(false)
    }
    else {
      return
    }
  }

  const _onPress = (prevHeight, newHeight, prevWidth, newWidth) => {
    setPressCount(pressCount + 1);

    LayoutAnimation.easeInEaseOut();
    if (pressCount % 2 == 0) {
      setHeight(prevHeight);
      setWidth(prevWidth);
    }
    else {
      setHeight(newHeight);
      setWidth(newWidth);
    }


  }



  const _onPressLargeMenu = (menu) => {
    LayoutAnimation.linear();

    if (menu == 'torch') {
      setTorchActive(!torchActive);
    } else if (menu == 'brightness') {
      setBrightnessActive(!brightnessActive)
    }
    else if (menu == 'volume') {
      setVolumeActive(!volumeActive)
    }

  }


  const _onLongPress = (prevHeight, newHeight, prevWidth, newWidth, prevSubHeight, newSubHeight, prevSubWidth, newSubWidth) => {
    setLongPressCount(longPressCount + 1);

    LayoutAnimation.easeInEaseOut();
    if (longPressCount % 2 !== 0) {
      setHeight(newHeight);
      setWidth(newWidth);
      setSubHeight(newSubHeight);
      setSubWidth(newSubWidth);
    }
    else {
      setHeight(prevHeight);
      setWidth(prevWidth);
      setSubHeight(prevSubHeight);
      setSubWidth(prevSubWidth);
    }

    // this.setState({w: this.state.w + 15, h: this.state.h + 15})
  }

  return (
    <>
      <StatusBar hidden />
      <Image
        style={styles.backgroundImage}
        source={require('./assets/bg1.jpeg')}
      />
      <Image
        style={styles.backgroundAbstractImage}
        source={require('./assets/abstract.png')}
      />


      <View style={styles.contentContainer}>

        <BlurGradient
          style={styles.cardContainer}
          colorA={'rgba(0,0,0,0.1)'}
          colorB={'rgba(0,0,0,0.2)'}
          onPress={_onPressOutside}
        >

          {torchActive || brightnessActive || volumeActive ?

            <GastureView icon={
              torchActive ?
                <MaterialCommunityIcons name={'flashlight'} color={'#fff'} size={40} />
                :
                (brightnessActive
                  ?
                  <Ionicon name={'ios-sunny-sharp'} color={'#fff'} size={40} />
                  :
                  <Ionicon name={'volume-medium-sharp'} color={'#fff'} size={40} />

                )
            } />
            :

            <View style={styles.contolCenterContainer}>
              <View style={styles.row}>
                {/* <Animated.View
                style={{
                  opacity: fadeAnim, // Binds directly
                  ...styles.wifiCardContainer,
                  width: width,
                  height: height,
                  zIndex: pressCount % 2 == 0 ? 100 : 200,
                }}> */}

                <BlurGradient
                  style={{
                    ...styles.wifiCardContainer,
                    width: width,
                    height: height,
                  }}
                  colorA={'rgba(0,0,0,0.5)'}
                  colorB={'rgba(0,0,0,0.5)'}
                  onPress={() => { _onPress(150, 400, '42%', '90%') }}
                >

                  <View style={styles.row}>
                    <View style={{ ...styles.verticalCenteredView, marginTop: pressCount % 2 == 0 ? 10 : 0, marginBottom: pressCount % 2 == 0 ? 20 : 0 }}>
                      <BlurGradient
                        style={styles.iconContainer}
                        colorA={'rgba(0,0,0,0.5)'}
                        colorB={'rgba(0,0,0,0.5)'}
                        extrastyle={{ justifyContent: 'center' }}
                      >
                        <Ionicon name={'ios-airplane'} color={'#fff'} size={30} />
                      </BlurGradient>
                      {
                        pressCount % 2 == 0
                          ?
                          <>
                            <Text style={styles.smallText}>
                              {`Airplane Mode`}
                            </Text>
                            <Text style={styles.smallText}>
                              {`Off`}
                            </Text>
                          </>
                          :
                          null
                      }

                    </View>
                    <View style={{ ...styles.verticalCenteredView, marginTop: pressCount % 2 == 0 ? 10 : 0, marginBottom: pressCount % 2 == 0 ? 20 : 0 }}>

                      <BlurGradient
                        style={styles.iconContainer}
                        colorA={'rgba(0,0,0,0.5)'}
                        colorB={'rgba(0,0,0,0.5)'}
                        extrastyle={{ justifyContent: 'center' }}
                      >
                        <MaterialCommunityIcons name={'antenna'} color={'#fff'} size={30} />
                      </BlurGradient>
                      {
                        pressCount % 2 == 0
                          ?
                          <>
                            <Text style={styles.smallText}>
                              {`Mobile data`}
                            </Text>
                            <Text style={styles.smallText}>
                              {`Off`}
                            </Text>
                          </>
                          :
                          null
                      }
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={{ ...styles.verticalCenteredView, marginBottom: pressCount % 2 == 0 ? 20 : 0 }}>

                      <BlurGradient
                        style={styles.iconContainer}
                        colorA={'rgba(256,256,256,0.8)'}
                        colorB={'rgba(256,256,256,0.8)'}
                        extrastyle={{ justifyContent: 'center' }}
                      >
                        <Ionicon name={'ios-wifi-sharp'} color={'#4d4c4c'} size={30} />
                      </BlurGradient>
                      {
                        pressCount % 2 == 0
                          ?
                          <>
                            <Text style={styles.smallText}>
                              {`Wi-fi`}
                            </Text>
                            <Text style={styles.smallText}>
                              {`Not Connected`}
                            </Text>
                          </>
                          :
                          null
                      }
                    </View>
                    <View style={{ ...styles.verticalCenteredView, marginBottom: pressCount % 2 == 0 ? 20 : 0 }}>

                      <BlurGradient
                        style={styles.iconContainer}
                        colorA={'rgba(256,256,256,0.8)'}
                        colorB={'rgba(256,256,256,0.8)'}
                        extrastyle={{ justifyContent: 'center' }}
                      >
                        <Ionicon name={'ios-bluetooth-sharp'} color={'#4d4c4c'} size={30} />
                      </BlurGradient>
                      {
                        pressCount % 2 == 0
                          ?
                          <>
                            <Text style={styles.smallText}>
                              {`Bluetooth`}
                            </Text>
                            <Text style={styles.smallText}>
                              {`Not Connected`}
                            </Text>
                          </>
                          :
                          null
                      }
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={{ ...styles.verticalCenteredView, marginBottom: pressCount % 2 == 0 ? 20 : 0 }}>

                      <BlurGradient
                        style={styles.iconContainer}
                        colorA={'rgba(0,0,0,0.5)'}
                        colorB={'rgba(0,0,0,0.5)'}
                        extrastyle={{ justifyContent: 'center' }}
                        onLongPress={() => {
                          _onLongPress(
                            400,
                            0,
                            '80%',
                            0,
                            0,
                            240,
                            0,
                            '80%'
                          )
                        }}
                      >
                        <MaterialIcons name={'settings-input-antenna'} color={'#fff'} size={30} />
                      </BlurGradient>
                      {
                        pressCount % 2 == 0
                          ?
                          <>
                            <Text style={styles.smallText}>
                              {`Air Drop`}
                            </Text>
                            <Text style={styles.smallText}>
                              {`Receiving Off`}
                            </Text>
                          </>
                          :
                          null
                      }
                    </View>

                    <View style={{ ...styles.verticalCenteredView, marginBottom: pressCount % 2 == 0 ? 20 : 0 }}>
                      <BlurGradient
                        style={styles.iconContainer}
                        colorA={'rgba(0,0,0,0.5)'}
                        colorB={'rgba(0,0,0,0.5)'}
                        extrastyle={{ justifyContent: 'center' }}
                      >
                        <MaterialCommunityIcons name={'link-variant'} color={'#fff'} size={30} />
                      </BlurGradient>
                      {
                        pressCount % 2 == 0
                          ?
                          <>
                            <Text style={styles.smallText}>
                              {`Personal Hotspot`}
                            </Text>
                            <Text style={styles.smallText}>
                              {`Off`}
                            </Text>
                          </>
                          :
                          null
                      }
                    </View>
                  </View>


                </BlurGradient>
                {/* </Animated.View> */}

                {
                  longPressCount % 2 === 0 ?
                    <BlurGradient
                      style={{ ...styles.subContainer, width: subwidth, height: subheight }}
                      colorA={'rgba(0,0,0,0.5)'}
                      colorB={'rgba(0,0,0,0.5)'}
                      extrastyle={{ justifyContent: 'center' }}
                      onPress={() => {
                        _onLongPress(
                          400,
                          0,
                          '80%',
                          0,
                          0,
                          250,
                          0,
                          '80%'
                        )
                      }}
                    >
                      <MaterialIcons name={'settings-input-antenna'} color={'#fff'} size={30} />
                      <Text style={{ ...styles.smallText, marginTop: 10, marginBottom: 15 }}>
                        Air Drop
                      </Text>
                      <BlurGradient
                        style={{ ...styles.subContainerItem, }}
                        colorA={'rgba(0,0,0,0.52)'}
                        colorB={'rgba(0,0,0,0.52)'}
                      >
                        <View style={{ ...styles.row, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                          <Text style={styles.smallText}>
                            Receiving Off
                          </Text>
                          <Ionicon name={'ios-checkmark'} color={'#fff'} size={20} />
                        </View>
                        <View style={styles.divider} />

                        <View style={{ ...styles.row, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                          <Text style={styles.smallText}>
                            Contacts Only
                          </Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={{ ...styles.row, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                          <Text style={styles.smallText}>
                            Everyone
                          </Text>
                        </View>

                      </BlurGradient>

                    </BlurGradient>
                    :
                    null
                }




                {/* ////////////////   MUSIC SECTION////////////////////// */}
                {pressCount % 2 !== 0 ?
                  <BlurGradient
                    style={styles.wifiCardContainer}
                    extrastyle={styles.musicContainer}
                    colorA={'rgba(0,0,0,0.5)'}
                    colorB={'rgba(0,0,0,0.5)'}
                  >
                    <MaterialIcons name={'settings-input-antenna'} color={'rgba(256,256,256,0.8)'} size={20} style={styles.antenaIcon} />

                    <Text style={styles.textColor}>
                      Now Playing
                    </Text>
                    <View style={styles.row}>
                      <Ionicon name={'ios-play-back-sharp'} color={'rgba(194, 190, 190,0.7)'} size={30} />
                      <Ionicon name={'ios-play-sharp'} color={'#fff'} size={30} />
                      <Ionicon name={'ios-play-forward-sharp'} color={'rgba(194, 190, 190,0.7)'} size={30} />
                    </View>

                  </BlurGradient>
                  : null
                }
              </View>


              <View style={styles.row}>

                <View style={{ width: '50%', alignItems: 'center' }}>
                  <View style={styles.row}>

                    {/* ////////////////   ORIENTATION SECTION////////////////////// */}
                    {pressCount % 2 !== 0 ?

                      <BlurGradient
                        style={styles.smallCardContainer}
                        colorA={'rgba(256,256,256,0.7)'}
                        colorB={'rgba(256,256,256,0.7)'}
                        extrastyle={{ justifyContent: 'center' }}
                      >
                        <MaterialIcons name={'screen-lock-rotation'} color={'#f40'} size={30} />
                      </BlurGradient>
                      : null
                    }

                    {/* ////////////////   ORIENTATION SECTION////////////////////// */}
                    {pressCount % 2 !== 0 ?

                      <BlurGradient
                        style={styles.smallCardContainer}
                        colorA={'rgba(0,0,0,0.6)'}
                        colorB={'rgba(0,0,0,0.6)'}
                        extrastyle={{ justifyContent: 'center' }}

                      >
                        <MaterialCommunityIcons name={'checkbox-multiple-blank-outline'} color={'#fff'} size={30} />
                      </BlurGradient>
                      : null
                    }
                  </View>




                  {/* ////////////////   Focus SECTION////////////////////// */}
                  {pressCount % 2 !== 0 ?

                    <BlurGradient
                      style={styles.focusContainer}
                      colorA={'rgba(0,0,0,0.6)'}
                      colorB={'rgba(0,0,0,0.6)'}

                    >
                      <View style={{ ...styles.row, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
                        <BlurGradient
                          style={styles.iconContainer}
                          colorA={'rgba(0,0,0,0.6)'}
                          colorB={'rgba(0,0,0,0.6)'}
                          extrastyle={{ justifyContent: 'center' }}

                        >
                          <Ionicon name={'ios-moon-sharp'} color={'#fff'} size={25} />
                        </BlurGradient>
                        <Text style={styles.focusText}>
                          Focus
                        </Text>
                      </View>
                    </BlurGradient>
                    : null
                  }
                </View>

                <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                  {/* ////////////////   Brightness SECTION////////////////////// */}
                  {pressCount % 2 !== 0 ?

                    <BlurGradient
                      style={styles.longCardContainer}
                      colorA={'rgba(0,0,0,0.6)'}
                      colorB={'rgba(0,0,0,0.6)'}
                      extrastyle={{ justifyContent: 'flex-end' }}
                      onPress={() => { _onPressLargeMenu('brightness') }}
                    >
                      <View style={{ backgroundColor: 'rgba(256,256,256,0.6)', height: '60%', width: '100%', alignItems: 'center', alignSelf: 'flex-end' }}>

                        <Ionicon name={'ios-sunny-sharp'} color={'rgba(61, 45, 45,0.7)'} size={30} style={styles.absoluteIcon} />
                      </View>
                    </BlurGradient>

                    : null}


                  {/* ////////////////   VOLUME SECTION////////////////////// */}
                  {pressCount % 2 !== 0 ?

                    <BlurGradient
                      style={{ ...styles.longCardContainer }}
                      colorA={'rgba(0,0,0,0.6)'}
                      colorB={'rgba(0,0,0,0.6)'}
                      extrastyle={{ justifyContent: 'flex-end' }}
                      onPress={() => { _onPressLargeMenu('volume') }}
                    >
                      <View style={{ backgroundColor: 'rgba(256,256,256,0.6)', height: '40%', width: '100%', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <Ionicon name={'volume-medium-sharp'} color={'rgba(61, 45, 45,0.7)'} size={30} style={styles.absoluteIcon} />

                      </View>
                    </BlurGradient>
                    :
                    null
                  }
                </View>
              </View>


              <View style={styles.row}>
                {/* ////////////////   flash SECTION////////////////////// */}
                {pressCount % 2 !== 0 ?
                  <BlurGradient
                    style={styles.smallCardContainer}
                    colorA={'rgba(0,0,0,0.6)'}
                    colorB={'rgba(0,0,0,0.6)'}
                    extrastyle={{ justifyContent: 'center' }}
                    onPress={() => { _onPressLargeMenu('torch') }}
                  >
                    <MaterialCommunityIcons name={'flashlight'} color={'#fff'} size={30} />
                  </BlurGradient>

                  : null
                }
                {/* ////////////////   calculator SECTION////////////////////// */}
                {pressCount % 2 !== 0 ?
                  <BlurGradient
                    style={styles.smallCardContainer}
                    colorA={'rgba(0,0,0,0.6)'}
                    colorB={'rgba(0,0,0,0.6)'}
                    extrastyle={{ justifyContent: 'center' }}
                  >
                    <Ionicon name={'calculator'} color={'#fff'} size={30} />
                  </BlurGradient>
                  :
                  null
                }

                {/* ////////////////   camera SECTION////////////////////// */}
                {pressCount % 2 !== 0 ?
                  <BlurGradient
                    style={styles.smallCardContainer}
                    colorA={'rgba(0,0,0,0.6)'}
                    colorB={'rgba(0,0,0,0.6)'}
                    extrastyle={{ justifyContent: 'center' }}
                  >
                    <Ionicon name={'camera'} color={'#fff'} size={30} />
                  </BlurGradient>
                  : null
                }

                {/* ////////////////   record SECTION////////////////////// */}
                {pressCount % 2 !== 0 ?
                  <BlurGradient
                    style={styles.smallCardContainer}
                    colorA={'rgba(256,256,256,0.7)'}
                    colorB={'rgba(256,256,256,0.7)'}
                    extrastyle={{ justifyContent: 'center' }}
                  >
                    <MaterialCommunityIcons name={'record-circle-outline'} color={'#f40'} size={40} />
                  </BlurGradient>
                  :
                  null
                }
              </View>

            </View>
          }
        </BlurGradient>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: undefined,
    // aspectRatio: 1,
    zIndex: 1,
  },
  backgroundAbstractImage: {
    position: 'absolute',
    height: undefined,
    width: '100%',
    aspectRatio: 1,
    zIndex: 5,
    transform: [{ translateY: 200 }, { rotateZ: '-55deg' }, { scale: 1.5 }],
  },
  contentContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  contolCenterContainer: {
    position: 'absolute',
    bottom: 20,
    width: '95%',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    marginVertical: 10,
    borderRadius: 20,
  },
  wifiCardContainer: {
    width: '42%',
    height: 150,
    marginVertical: 10,
    borderRadius: 20,
  },
  card: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textColor: {
    color: "#ccc",
    fontSize: 16
  },
  musicContainer: {
    justifyContent: 'space-evenly'
  },
  antenaIcon: {
    alignSelf: 'flex-end',
    marginRight: 10
  },
  smallCardContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  longCardContainer: {
    width: 70,
    height: 150,
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  focusContainer: {
    width: '90%',
    height: 70,
    borderRadius: 20,
  },
  focusText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600'
  },
  absoluteIcon: {
    position: 'absolute',
    bottom: 30
  },
  verticalCenteredView: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  smallText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    marginTop: 5,
  },
  subContainer: {
    borderRadius: 25,
  },
  subContainerItem: {
    width: '100%',
    height: 125,
  },
  divider: {
    width: '94%',
    height: 1,
    backgroundColor: 'rgba(256,256,256,0.2)',
  },
  flashViewContainer: {
    position: 'absolute',
    top: 200,
    height: 350,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  flashView: {
    width: 100,
    height: 250,
    borderRadius: 20,
  },
  square: {
    width: 150,
    height: 1000,
    backgroundColor: 'rgba(256,256,256,0.8)',
    marginTop: 22,
  }
});

export default App;