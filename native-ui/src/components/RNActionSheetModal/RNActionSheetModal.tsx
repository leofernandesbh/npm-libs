import { useEffect } from "react"
import { SafeAreaView, StyleSheet } from 'react-native'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated'
import { CustomActionSheetModalProps } from "../../styles"
import { dimensionCalculate } from "../../styles/styles.util"
import RNBox from "../RNBox"
import RNDivider from "../RNDivider"
import RNPressable from "../RNPressable"
import RNText from "../RNText"
import RNVStack from "../RNVStack"

const RNActionSheetModal = (props: CustomActionSheetModalProps) => {
  let topOffset = 0

  if (props.title) {
    topOffset += 40
  }

  if (props.message) {
    topOffset += 60
  }

  const defaultPositionY = -(props.options.length * 95 + topOffset)
  const positionY = useSharedValue(0)

  const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
    },
    container: {
      position: 'absolute',
      bottom: defaultPositionY,
      width: '100%',
      paddingHorizontal: dimensionCalculate(props.mx) || 9,
    },
    content: {
      flex: 1,
    },
    title: {
      color: '#5a5a5a',
    },
    message: {
      color: '#3d3d3d9f',
    },
    option: {
      color: '#007AFF',
      fontSize: 20,
    },
    destructiveOption: {
      color: '#ff493f',
      fontSize: 20,
    },
  })

  const actionSheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: positionY.value,
        },
      ],
      opacity: interpolate(positionY.value, [0, defaultPositionY], [0, 1]),
    }
  })

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(positionY.value, [0, defaultPositionY], [0, 0.3]),
    }
  })

  useEffect(() => {
    if (props.show) {
      positionY.value = withTiming(defaultPositionY, {
        duration: props.speed || 300,
        easing: Easing.linear,
      })
    } else {
      positionY.value = withTiming(0, {
        duration: props.speed || 300,
        easing: Easing.linear,
      })
    }
  }, [props.show])

  return (
    <>
      <Animated.View
        style={[
          styles.background,
          { display: props.show ? 'flex' : 'none' },
          backgroundAnimatedStyle,
        ]}
      >
        <RNPressable
          flex={1}
          onPress={props.onCancel}
        ></RNPressable>
      </Animated.View>
      <Animated.View style={[styles.container, actionSheetAnimatedStyle]}>
        <SafeAreaView style={styles.content}>
          <RNVStack
            flex={1}
            pt={props.title || props.message ? 6 : 3}
            pb={5}
            bg={props.bg || '#eff0f0'}
            rounded={props.rounded || 'xl'}
          >
            {props.title && (
              <RNBox align='center'>
                <RNText style={props.titleStyle || styles.title}>
                  {props.title}
                </RNText>
              </RNBox>
            )}
            {props.message && (
              <RNBox
                mt={3}
                mb={2}
                align='center'
              >
                <RNText style={props.messageStyle || styles.message}>
                  {props.message}
                </RNText>
              </RNBox>
            )}
            {props.options.map((option, index) => (
              <RNPressable
                key={index}
                onPress={() => props.onSelect(index)}
              >
                {(index > 0 || props.title || props.message) && (
                  <RNDivider
                    mt={4}
                    bg={props.dividerColor || '#d0d0d09c'}
                  />
                )}
                <RNBox
                  mt={4}
                  align='center'
                >
                  <RNText style={props.optionStyle || styles.option}>
                    {option}
                  </RNText>
                </RNBox>
              </RNPressable>
            ))}
            <RNPressable onPress={() => props.onCancel()}>
              <RNDivider
                mt={4}
                bg={props.dividerColor || '#d0d0d09c'}
              />
              <RNBox
                mt={4}
                align='center'
              >
                <RNText
                  style={props.destructiveStyle || styles.destructiveOption}
                >
                  Cancelar
                </RNText>
              </RNBox>
            </RNPressable>
          </RNVStack>
        </SafeAreaView>
      </Animated.View>
    </>
  )
}

export default RNActionSheetModal
