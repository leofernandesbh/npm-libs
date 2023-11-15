import { Pressable, PressableProps } from 'react-native'

import Consts from '../../styles/Consts'

const RNPressable = (props: PressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? Consts.DEFAULT_OPACITY_CLICK : 1,
        },
      ]}
      {...props}
    >
      {props.children}
    </Pressable>
  )
}

export default RNPressable