import { View } from 'react-native'

import { CustomViewProps } from '../../styles/Types/ui-components.types'
import { makeBaseViewStyle } from '../../styles/styles.factory'

const RNBox = (props: CustomViewProps) => {
  const baseStyles = props.style ?? makeBaseViewStyle(props)

  return (
    <View
      style={[baseStyles, { flexDirection: 'column' }]}
    >
      {props.children}
    </View>
  )
}

export default RNBox