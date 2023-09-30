import { Pressable, StyleProp, ViewProps } from 'react-native'
import { makeBaseButtonStyle } from '../../styles/styles'
import { CustomButtonProps } from '../../styles/ui-components.types'
import RNBox from '../RNBox'
import RNText from '../RNText'
import RNSpinner from '../RNSpinner'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Consts } from '../../theme'


const RNButton = (props: CustomButtonProps) => {
  const baseStyle: StyleProp<ViewProps> = makeBaseButtonStyle(props)  

  const loadingComponent = () => {
    return (
      <RNBox
        flex={1}
        align='center'
        justify='center'
        opacity={Consts.DEFAULT_OPACITY_CLICK}
      >
        {props.loadingText ? (
          <RNText fWeight='bold'>{props.loadingText}</RNText>
        ) : (
          <RNSpinner color={props.loadingSpinnerColor} />
        )}
      </RNBox>
    )
  }

  const textComponent = () => {
    const variantFontColor = () => {
      if (!props.variant) {
        return Colors.white
      }

      switch (props.variant) {
        case 'outline':
          return Colors.button
        default:
          return Colors.white
      }
    }

    return (
      <RNText
        fSize={props.titleStyle?.fSize ?? 'md'}
        fColor={props.titleStyle?.fColor ?? variantFontColor()}
        fWeight={props.titleStyle?.fWeight ?? 'normal'}
        wordWrap={props.titleStyle?.wordWrap}
        noAccessibility={props.titleStyle?.noAccessibility}
        textAlign={props.titleStyle?.textAlign}
        textTransform={props.titleStyle?.textTransform}
        w={props.titleStyle?.w}
        m={props.titleStyle?.m}
        mt={props.titleStyle?.mt}
        mb={props.titleStyle?.mb}
        ml={props.titleStyle?.ml}
        mr={props.titleStyle?.mr}
        opacity={props.titleStyle?.opacity}
      >
        {props.title}
      </RNText>
    )  
  }

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        baseStyle,
        {
          opacity: props.disabled
            ? Consts.DISABLED_OPACITY
            : props.loading || props.noPressedEffect
            ? 1
            : pressed
            ? Consts.DEFAULT_OPACITY_CLICK
            : 1,
        },
      ]}
      onPress={props.disabled || props.loading ? undefined : props.onPress}
      onPressIn={props.disabled || props.loading ? undefined : props.onPressIn}
      onPressOut={
        props.disabled || props.loading ? undefined : props.onPressOut
      }
    >
      {props.loading
        ? loadingComponent()
        : props.title
        ? textComponent()
        : props.children}
    </Pressable>
  )
}

export default RNButton