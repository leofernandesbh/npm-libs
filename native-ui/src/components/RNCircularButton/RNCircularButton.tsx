import { TouchableOpacityProps, StyleSheet, TouchableOpacity, AnimatableNumericValue, ColorValue } from 'react-native'
import RNIcon from '../RNIcon'
import RNVStack from '../RNVStack'
import { Colors } from '../../theme'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { CustomIconProps } from '../../styles'

interface CircularButtonProps extends TouchableOpacityProps {
  bg?: ColorValue
  icon: CustomIconProps
  size?: number
  left?: number
  top?: number
  right?: number
  bottom?: number
  isTablet?: boolean
  showShadow?: boolean
  shadowStyle?: {
    color?: ColorValue
    wOffset?: number
    hOffset?: number
    opacity?: AnimatableNumericValue
    radius?: number
    elevation?: number
  }
}

const RNCircularButton = ({
  bg,
  icon,
  size,
  left,
  top,
  right,
  bottom,
  isTablet,
  showShadow,
  shadowStyle,
  ...rest
}: CircularButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
    }    
  })

  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    }
  })

  return (
    <Animated.View
      style={[styles.container, { left, top, right, bottom }, animatedStyle]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => {
          scale.value = withSpring(1.15, { mass: 0.1 })
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { mass: 0.1 })
        }}
        {...rest}
      >
        <RNVStack
          w={size ?? isTablet ? 18 : 16}
          h={size ?? isTablet ? 18 : 16}
          rounded='full'
          align='center'
          justify='center'
          bg={bg ?? Colors.emerald[700]}
          showShadow={showShadow}
          shadowStyle={shadowStyle}
        >
          <RNIcon
            as={icon.as}
            name={icon.name}
            size={icon.size ?? isTablet ? 9 : 8}
            color={icon.color ?? Colors.slate[50]}
          />
        </RNVStack>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default RNCircularButton
