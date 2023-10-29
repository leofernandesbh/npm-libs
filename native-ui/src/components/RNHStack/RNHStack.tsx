import { View, StyleSheet } from 'react-native'

import { CustomViewProps } from '../../styles/Types/ui-components.types'
import { makeBaseViewStyle, styles } from '../../styles/styles.factory'

const RNHStack = (props: CustomViewProps) => {
  let baseStyle = props.style
    ? StyleSheet.compose(props.style, styles.hstack)
    : StyleSheet.compose(makeBaseViewStyle(props), styles.hstack)

  return (
    <View
      {...props}
      style={props.align ? [baseStyle, { alignItems: props.align }] : baseStyle}
    >
      {props.children}
    </View>
  )
}

export default RNHStack