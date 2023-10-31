import { View } from 'react-native'

import { CustomViewProps } from '../../styles/Types/ui-components.types'
import { makeBaseViewStyle } from '../../styles/styles.factory'

const RNHStack = (props: CustomViewProps) => {
  const baseStyle = props.style ?? makeBaseViewStyle(props)

  return (
    <View
      style={
        props.align
          ? [baseStyle, { flexDirection: 'row' }]
          : [baseStyle, { flexDirection: 'row', alignItems: 'center' }]
      }
    >
      {props.children}
    </View>
  )
}

export default RNHStack