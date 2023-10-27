import { View } from 'react-native'

import { CustomDividerProps } from '../../styles/Types/ui-components.types'
import { makeBaseDividerStyle } from '../../styles/styles.factory'

const RNDivider = (props: CustomDividerProps) => {
  const dividerStyle = props.style ?? makeBaseDividerStyle(props)

  return (
    <View
      {...props}
      style={dividerStyle}
    />
  )
}

export default RNDivider