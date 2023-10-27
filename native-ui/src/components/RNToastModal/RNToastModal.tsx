import { useEffect } from "react"
import { Platform, StyleSheet } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import RNBox from "../RNBox"
import RNHStack from "../RNHStack"
import RNText from "../RNText"
import { Colors } from "../../theme"
import FontSizes from "../../theme/FontSizes"

interface RNToastModalProps {
  text: string
  variant: 'information' | 'error' | 'alert' | 'success'
  animate: boolean
  timeout?: number
  isTablet?: boolean
  closeToastController(): void
}

const RNToastModal = ({
  text,
  variant,
  animate,
  timeout,
  isTablet,
  closeToastController,
}: RNToastModalProps) => {
  const insets = useSafeAreaInsets()

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 2,
      width: '100%',
      paddingTop: insets.top,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    toast: {
      width: '100%',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 55,
      backgroundColor:
        variant === 'success'
          ? Colors.success[700]
          : variant === 'alert'
          ? Colors.warning[600]
          : variant === 'error'
          ? Colors.red[600]
          : Colors.info[700],
    },
  })

  const HIDE_POSITION = -(insets.top + 15 + 110)
  const positionTop = useSharedValue(HIDE_POSITION)
  const toastOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
    }
  })

  const toastEmoji =
    variant === 'success'
      ? '✓  '
      : variant === 'alert'
      ? '❕ '
      : variant === 'error'
      ? '❕ '
      : '💡  '

  useEffect(() => {
    if (animate) {
      const endPosition = Platform.OS === 'ios' ? 0 : -(insets.top - 12)

      positionTop.value = withTiming(endPosition, { duration: 350 })
      toastOpacity.value = withTiming(1, { duration: 450 })

      setTimeout(() => {
        toastOpacity.value = withTiming(0, { duration: 400 })
        positionTop.value = withTiming(HIDE_POSITION, { duration: 500 })
        setTimeout(() => closeToastController(), 500)
      }, timeout || 2500)
    }
  }, [animate])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <RNHStack style={styles.toast}>
        <RNHStack
          flex={1}
          align='center'
          px={3}
          py={3}
        >
          <RNBox flex={1}>
            <RNText
              fColor={Colors.white}
              fSize={isTablet ? FontSizes.toastTablet : FontSizes.toastPhone}
              maxFontSizeMultiplier={1}
              wordWrap
              numberOfLines={4}
            >
              {toastEmoji.concat(text)}
            </RNText>
          </RNBox>
        </RNHStack>
      </RNHStack>
    </Animated.View>
  )
}

export default RNToastModal
