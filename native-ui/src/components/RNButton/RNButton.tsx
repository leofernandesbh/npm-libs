import { Pressable, StyleProp, ViewProps } from 'react-native'
import { makeBaseEMCButtonStyle } from '../../styles/styles'
import { CustomButtonProps } from '../../styles/ui-components.types'
import Box from '../RNBox'
import EMCText from '../RNText'
import Spinner from '../RNSpinner'
import { DEFAULT_OPACITY_CLICK, DISABLED_OPACITY } from '../../styles/ui-components.consts'
import { Colors } from 'react-native/Libraries/NewAppScreen'


const RNButton = (props: CustomButtonProps) => {
  const baseStyle: StyleProp<ViewProps> = makeBaseEMCButtonStyle(props)  

  const loadingComponent = () => {
    return (
      <Box
        flex={1}
        align='center'
        justify='center'
        opacity={DEFAULT_OPACITY_CLICK}
      >
        {props.loadingText ? (
          <EMCText fWeight='bold'>{props.loadingText}</EMCText>
        ) : (
          <Spinner color={props.loadingSpinnerColor} />
        )}
      </Box>
    )
  }

  const textComponent = () => {
    return <EMCText 
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
      opacity={props.titleStyle?.opacity}>{props.title}</EMCText>  
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