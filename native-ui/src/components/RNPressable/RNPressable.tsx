import { Pressable } from 'react-native'
import { CustomPressableProps } from '../../styles'
import { dimensionCalculate } from '../../styles/styles.util'

import Consts from '../../styles/Consts'

const RNPressable = (props: CustomPressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: props.noPressEffect
            ? 1
            : pressed
            ? Consts.DEFAULT_OPACITY_CLICK
            : 1,
          position: props.position,
          left: props.left,
          top: props.top,
          right: props.right,
          bottom: props.bottom,
          flex: props.flex,
          justifyContent: props.justify,
          alignItems: props.align,
          width: dimensionCalculate(props.w),
          height: dimensionCalculate(props.h),
          margin: dimensionCalculate(props.m),
          marginHorizontal: dimensionCalculate(props.mx),
          marginVertical: dimensionCalculate(props.my),
          marginLeft: dimensionCalculate(props.ml),
          marginRight: dimensionCalculate(props.mr),
          marginTop: dimensionCalculate(props.mt),
          marginBottom: dimensionCalculate(props.mb),
          zIndex: props.zIndex,
        },
      ]}
      {...props}
    >
      {props.children}
    </Pressable>
  )
}

export default RNPressable