import { View, StyleSheet } from 'react-native'

import { CustomViewProps } from '../../styles/ui-components.types'
import { makeBaseViewStyle, styles } from '../../styles/styles'

const RNHStack = (props: CustomViewProps) => {
  let baseStyle = props.style ?? StyleSheet.compose(makeBaseViewStyle(props), styles.hstack)

  if (props.style) {
    baseStyle = StyleSheet.compose(baseStyle, props.style)
  }

  return <View style={baseStyle} {...props}>{props.children}</View>
}

export default RNHStack