import { TextInput } from 'react-native'
import { CustomTextAreaProps } from '../../styles/ui-components.types'
import { makeBaseTextAreaStyle } from '../../styles/styles'

const RNTextArea = (props: CustomTextAreaProps) => {
  const baseStyle = props.style ?? makeBaseTextAreaStyle(props)

  return (
    <TextInput
      style={baseStyle}
      {...props}
      multiline
    />
  )
}

export default RNTextArea