import { useCallback } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const RN_DEFAULT_COLOR_PICKER_COLORS = [
  'black',
  'black',
  'navy',
  'blue',
  'royalblue',
  'green',
  'seagreen',
  'teal',
  'brown',
  'brown',
  'red',
  'crimson',
  'orange',
  'goldenrod',
  'olive',
  'purple',
  'slateblue',
  'magenta',
  'salmon',
]

interface ColorPickerProps extends Partial<LinearGradientProps> {
  screenWidthPercentage?: number
  height?: number
  borderRadius?: number
  currentPosition?: number
  selectorWidth?: number
  selectorHeight?: number
  selectorBorderRadius?: number
  realTime?: boolean
  pickerIcon?: React.ReactNode
  onColorChanged?: (pickerPosition: number, colorValue: string) => void
}

const RNColorPicker = ({
  colors = RN_DEFAULT_COLOR_PICKER_COLORS,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  screenWidthPercentage,
  height,
  borderRadius,
  currentPosition,
  selectorWidth,
  selectorHeight,
  selectorBorderRadius,
  realTime,
  pickerIcon,
  onColorChanged,
}: ColorPickerProps) => {
  const SELECTOR_WIDTH = selectorWidth || 42
  const SELECTOR_HEIGHT = selectorHeight || 40
  const SELECTOR_BORDER_RADIUS =
    selectorBorderRadius || selectorBorderRadius === 0
      ? selectorBorderRadius
      : 6

  const { width } = Dimensions.get('window')

  const pickerStyle = {
    height: height || 28,
    width: width * (screenWidthPercentage || 1),
    borderRadius: borderRadius || 6,
  }

  const maxWidth = width * (screenWidthPercentage || 1)

  const translateX = useSharedValue(currentPosition || 0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), maxWidth - SELECTOR_WIDTH)
  })

  const inputRange = colors.map(
    (_, index) => (index / colors.length) * maxWidth,
  )

  const onFinish = useCallback(() => {
    'worklet'

    console.log('ON END')

    if (!realTime) {
      const pickerPosition = translateX.value

      translateY.value = withSpring(0)
      scale.value = withSpring(1)

      let selectedColor = interpolateColor(translateX.value, inputRange, colors)

      if (Number.isInteger(Number(selectedColor))) {
        const red = (Number(selectedColor) >> 16) & 255
        const green = (Number(selectedColor) >> 8) & 255
        const blue = Number(selectedColor) & 255
        const alpha = ((Number(selectedColor) >> 24) & 255) / 255

        selectedColor = `rgba(${red},${green},${blue},${alpha})`
      }

      onColorChanged?.(pickerPosition, selectedColor)
    } else {
      translateY.value = withSpring(0)
      scale.value = withSpring(1)
    }
  }, [])

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x
    },
    onFinish,
  })

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (event) => {
        scale.value = withSpring(1.1)
        translateX.value = withTiming(event.absoluteX - SELECTOR_WIDTH)
      },
      onEnd: onFinish,
    })

  const animatedPickerStyle = useAnimatedStyle(() => {
    let backgroundColor = interpolateColor(translateX.value, inputRange, colors)

    if (
      typeof backgroundColor === 'string' &&
      backgroundColor.includes('rgba')
    ) {
      onColorChanged?.(translateX.value, backgroundColor)
    }

    if (realTime && Number.isInteger(Number(backgroundColor))) {
      const red = (Number(backgroundColor) >> 16) & 255
      const green = (Number(backgroundColor) >> 8) & 255
      const blue = Number(backgroundColor) & 255
      const alpha = ((Number(backgroundColor) >> 24) & 255) / 255

      backgroundColor = `rgba(${red},${green},${blue},${alpha})`

      onColorChanged?.(translateX.value, backgroundColor)
    }

    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { scale: scale.value },
      ],
      backgroundColor,
    }
  })

  const styles = StyleSheet.create({
    picker: {
      position: 'absolute',
      width: SELECTOR_WIDTH,
      height: SELECTOR_HEIGHT,
      borderRadius: SELECTOR_BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={{ justifyContent: 'center' }}>
            <LinearGradient
              colors={colors}
              start={start}
              end={end}
              style={pickerStyle}
            />
            <Animated.View style={[styles.picker, animatedPickerStyle]}>
              {pickerIcon}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

export default RNColorPicker
