import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native'

import { CustomViewProps } from '../../styles/ui-components.types'
import { makeBaseViewStyle, styles } from '../../styles/styles'

const RNCenter = (props: CustomViewProps) => {
  let baseStyle: StyleProp<ViewStyle>

  if (props.style) {
    baseStyle = props.style
  } else {
    baseStyle = makeBaseViewStyle(props)
    baseStyle = StyleSheet.compose(baseStyle, styles.center)
  }

  return (
    <View
      {...props}
      style={baseStyle}
    >
      {props.children}
    </View>
  )
}

export default RNCenter