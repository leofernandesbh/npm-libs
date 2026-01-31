import { useCallback } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  runOnJS,
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

interface ColorPickerProps
  extends Omit<Partial<LinearGradientProps>, 'colors'> {
  colors?: string[]
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

  const handleColorChanged = useCallback((position: number, color: string) => {
    onColorChanged?.(position, color)
  }, [onColorChanged])

  const onFinish = useCallback(() => {
    'worklet'

    translateY.value = withSpring(0)
    scale.value = withSpring(1)

    if (!realTime) {
      const pickerPosition = translateX.value
      let selectedColor: string | number = interpolateColor(
        translateX.value,
        inputRange,
        colors as readonly string[],
      )

      if (Number.isInteger(Number(selectedColor))) {
        const red = (Number(selectedColor) >> 16) & 255
        const green = (Number(selectedColor) >> 8) & 255
        const blue = Number(selectedColor) & 255
        const alpha = ((Number(selectedColor) >> 24) & 255) / 255

        selectedColor = `rgba(${red},${green},${blue},${alpha})`
      }

      const colorStr: string =
        typeof selectedColor === 'string'
          ? selectedColor
          : `rgba(${(Number(selectedColor) >> 16) & 255},${(Number(selectedColor) >> 8) & 255},${Number(selectedColor) & 255},${((Number(selectedColor) >> 24) & 255) / 255})`

      if (onColorChanged) {
        runOnJS(handleColorChanged)(pickerPosition, colorStr)
      }
    }
  }, [realTime, inputRange, colors, handleColorChanged])

  const startX = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = adjustedTranslateX.value
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + startX.value
    })
    .onEnd(() => {
      onFinish()
    })

  const tapGesture = Gesture.Tap()
    .onStart((event) => {
      scale.value = withSpring(1.1)
      translateX.value = withTiming(event.absoluteX - SELECTOR_WIDTH)
    })
    .onEnd(() => {
      onFinish()
    })

  const composedGesture = Gesture.Race(tapGesture, panGesture)

  const animatedPickerStyle = useAnimatedStyle(() => {
    let backgroundColor: string | number = interpolateColor(
      translateX.value,
      inputRange,
      colors as readonly string[],
    )

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
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={{ justifyContent: 'center' }}>
        <LinearGradient
          colors={colors as LinearGradientProps['colors']}
          start={start}
          end={end}
          style={pickerStyle}
        />
        <Animated.View style={[styles.picker, animatedPickerStyle]}>
          {pickerIcon}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}

export default RNColorPicker
