import { Pressable, StyleProp, ViewProps } from 'react-native'
import { makeBaseButtonStyle } from '../../styles/styles'
import { CustomButtonProps } from '../../styles/ui-components.types'
import RNBox from '../RNBox'
import RNText from '../RNText'
import RNSpinner from '../RNSpinner'
import { DEFAULT_OPACITY_CLICK, DISABLED_OPACITY } from '../../styles/ui-components.consts'
import { Colors } from 'react-native/Libraries/NewAppScreen'


const RNButton = (props: CustomButtonProps) => {
  const baseStyle: StyleProp<ViewProps> = makeBaseButtonStyle(props)  

  const loadingComponent = () => {
    return (
      <RNBox
        flex={1}
        align='center'
        justify='center'
        opacity={DEFAULT_OPACITY_CLICK}
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
    return <RNText 
      fSize={props.titleStyle?.fSize ?? 'md'}
      fColor={props.titleStyle?.fColor ?? Colors.white}
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
      opacity={props.titleStyle?.opacity}>{props.title}</RNText>  
  }

  return (
    <Pressable
      style={({ pressed }) => [
        baseStyle,
        {
          opacity: props.disabled 
            ? DISABLED_OPACITY 
            : props.loading || props.noPressedEffect
            ? 1
            : pressed
            ? DEFAULT_OPACITY_CLICK
            : 1,
        },
      ]}
      {...props}
      onPress={props.disabled || props.loading ? undefined : props.onPress}
      onPressIn={props.disabled || props.loading ? undefined : props.onPressIn}
      onPressOut={props.disabled || props.loading ? undefined : props.onPressOut}
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