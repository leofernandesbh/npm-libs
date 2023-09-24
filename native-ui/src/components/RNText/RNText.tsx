import { Text } from 'react-native'
import { CustomTextProps } from '../../styles/ui-components.types'
import { makeBaseTextStyle } from '../../styles/styles'

const RNText = (props: CustomTextProps) => {
  const baseStyle = props.style ?? makeBaseTextStyle(props)

  return (
    <Text
      style={baseStyle}
      maxFontSizeMultiplier={props.noAccessibility ? 1 : undefined}
      numberOfLines={props.wordWrap ? undefined : 1}
      {...props}
    >
      {props.children}
    </Text>
  )
}

export default RNText