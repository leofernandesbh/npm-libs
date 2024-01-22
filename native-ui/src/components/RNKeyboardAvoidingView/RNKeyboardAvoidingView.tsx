import { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface RNKeyboardAvoidingViewProps {
  enabled?: boolean
  targetInputHeight: number
  children: React.ReactNode
}

const RNKeyboardAvoidingView = ({
  enabled = true,
  targetInputHeight,
  children,
}: RNKeyboardAvoidingViewProps) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardVisible(true)
  })

  const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
    setKeyboardVisible(false)
  })

  let positionY = 0
  const keyboardMetrics = Keyboard.metrics()

  if (keyboardMetrics && enabled) {
    positionY = -(
      keyboardMetrics.screenY -
      keyboardMetrics.height -
      targetInputHeight
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      width: '100%',
    },
  })

  const contentVerticalPosition = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: contentVerticalPosition.value }],
    }
  })

  function contentAnimate() {
    contentVerticalPosition.value = withTiming(
      keyboardVisible ? positionY : 0,
      {
        duration: 200,
      },
    )
  }

  useEffect(() => {
    contentAnimate()
  }, [keyboardVisible])

  useEffect(() => {
    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  )
}

export default RNKeyboardAvoidingView
