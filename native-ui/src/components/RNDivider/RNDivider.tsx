import { View } from 'react-native'

import { CustomDividerProps } from '../../styles/ui-components.types'
import { makeBaseDividerStyle } from '../../styles/styles'

const RNDivider = (props: CustomDividerProps) => {
  const dividerStyle = props.style ?? makeBaseDividerStyle(props)

  return <View style={dividerStyle} {...props}/>
}

export default RNDivider