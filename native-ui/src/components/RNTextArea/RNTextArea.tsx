import { TextInput } from 'react-native'
import { CustomTextAreaProps } from '../../styles/Types/ui-components.types'
import { makeBaseTextAreaStyle } from '../../styles/styles.factory'
import { forwardRef } from 'react'

const RNTextArea = (props: CustomTextAreaProps, ref: any) => {
  const baseStyle = props.style ?? makeBaseTextAreaStyle(props)

  return (
    <TextInput
      ref={ref || undefined}
      style={baseStyle}
      {...props}
      multiline
      autoComplete='off'
    />
  )
}

export default forwardRef<TextInput, CustomTextAreaProps>(RNTextArea)