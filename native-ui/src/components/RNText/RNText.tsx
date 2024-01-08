import { Text } from 'react-native'
import { CustomTextProps } from '../../styles/Types/ui-components.types'
import { makeBaseTextStyle } from '../../styles/styles.factory'
import { forwardRef } from 'react'

const RNText = (props: CustomTextProps, ref: any) => {
  const baseStyle = props.style ?? makeBaseTextStyle(props)

  return (
      <Text
        ref={ref || undefined}
        maxFontSizeMultiplier={props.noAccessibility ? 1 : undefined}
        style={baseStyle}
        {...props}
        numberOfLines={props.wordWrap ? undefined : 1}
      >
        {props.children}
      </Text>
  )
}

export default forwardRef<Text, CustomTextProps>(RNText)