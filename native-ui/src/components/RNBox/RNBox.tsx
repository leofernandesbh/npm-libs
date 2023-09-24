import { View } from 'react-native'

import { CustomViewProps } from '../../styles/ui-components.types'
import { makeBaseViewStyle } from '../../styles/styles'

const RNBox = (props: CustomViewProps) => {
  const baseStyles = props.style ?? makeBaseViewStyle(props)

  return <View style={baseStyles} {...props}>{props.children}</View>
}

export default RNBox