import React, { useRef, useEffect } from "react"
import { ViewProps, DimensionValue, ColorValue, StyleProp, ViewStyle, Animated, View } from "react-native"
import { BorderSizeAcronymes } from "../../styles"
import { dimensionCalculate, marginCalculate, convertBorderRadius } from "../../styles/styles.util"
import { Colors } from "../../theme"
import { LinearGradient } from 'expo-linear-gradient'

export interface CustomSkeletonProps extends ViewProps {
  w: number
  h: number
  m?: DimensionValue
  mx?: DimensionValue
  my?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  rounded?: BorderSizeAcronymes
  bg?: ColorValue
  gradient_primary?: string
}

export function makeBaseRNSkeletonStyle(
  props: CustomSkeletonProps,
): StyleProp<ViewStyle> {
  return {
    width: dimensionCalculate(props.w),
    height: dimensionCalculate(props.h),
    marginTop: marginCalculate(props.m, props.my, props.mt),
    marginBottom: marginCalculate(props.m, props.my, props.mb),
    marginLeft: marginCalculate(props.m, props.mx, props.ml),
    marginRight: marginCalculate(props.m, props.mx, props.mr),
    borderRadius: props.rounded
      ? convertBorderRadius(props.rounded)
      : undefined,
    backgroundColor: props.bg || Colors.neutral[800],
    opacity: 0.6,
    overflow: 'hidden',
  }
}

const RNSkeleton = (props: CustomSkeletonProps) => {
  const baseStyle: StyleProp<ViewProps> =
    props.style || makeBaseRNSkeletonStyle(props)

  const transalateX = useRef(
    new Animated.Value(-(dimensionCalculate(props.w) || 0)),
  ).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(transalateX, {
        toValue: Number(dimensionCalculate(props.w)),
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start()
  }, [props.w])

  return (
    <View style={baseStyle}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [{ translateX: transalateX }],
        }}
      >
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={[
            'transparent',
            props.gradient_primary || 'rgba(255, 255, 255, 0.05)',
          ]}
        />
      </Animated.View>
    </View>
  )
}

export default RNSkeleton
