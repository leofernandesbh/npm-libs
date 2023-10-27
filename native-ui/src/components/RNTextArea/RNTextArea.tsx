import { TextInput } from 'react-native'
import { CustomTextAreaProps } from '../../styles/Types/ui-components.types'
import { makeBaseTextAreaStyle } from '../../styles/styles.factory'

const RNTextArea = (props: CustomTextAreaProps) => {
  const baseStyle = props.style ?? makeBaseTextAreaStyle(props)

  return (
    <TextInput
      style={baseStyle}
      {...props}
      multiline
      autoComplete='off'
    />
  )
}

export default RNTextArea