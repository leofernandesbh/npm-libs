import { View } from 'react-native'

import { CustomViewProps } from '../../styles/ui-components.types'
import { makeBaseViewStyle } from '../../styles/styles'

const RNVStack = (props: CustomViewProps) => {
  let baseStyle = props.style ?? makeBaseViewStyle(props)

  return (
    <View
      {...props}
      style={[baseStyle, { flexDirection: 'column' }]}
    >
      {props.children}
    </View>
  )
}

export default RNVStack
