import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import {
  CustomDividerProps,
  CustomViewProps,
  CustomTextAreaProps,
  CustomButtonProps,
  CustomTextInputProps,
  CustomScrollViewContainerProps,
  CustomTextProps
} from './ui-components.types'
import {
  dimensionCalculate,
  convertBorderRadius,
  convertFontSize,
} from './ui-components.util'
import { useMemo } from 'react'
import { Colors } from '../theme'
import { DEFAULT_ICON_SIZE, DISABLED_OPACITY } from './ui-components.consts'
import FontSizes from '../theme/FontSizes'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hstack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  }
})

export function makeBaseViewStyle(props: CustomViewProps): StyleProp<ViewStyle> {
  return {
    position: props.position,
    left: props.left,
    top: props.top,
    flex: props.flex,
    justifyContent: props.justify,
    alignItems: props.align,
    backgroundColor: props.bg,
    width: dimensionCalculate(props.w),
    height: dimensionCalculate(props.h),
    minWidth: dimensionCalculate(props.minW),
    minHeight: dimensionCalculate(props.minH),
    maxWidth: dimensionCalculate(props.maxW),
    maxHeight: dimensionCalculate(props.maxH),
    padding: dimensionCalculate(props.p),
    paddingHorizontal: dimensionCalculate(props.px),
    paddingVertical: dimensionCalculate(props.py),
    paddingTop: dimensionCalculate(props.pt),
    paddingBottom: dimensionCalculate(props.pb),
    paddingLeft: dimensionCalculate(props.pl),
    paddingRight: dimensionCalculate(props.pr),
    margin: dimensionCalculate(props.m),
    marginHorizontal: dimensionCalculate(props.mx),
    marginVertical: dimensionCalculate(props.my),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    borderWidth: props.bWidth,
    borderBottomWidth: props.bBottomWidth,
    borderTopWidth: props.bTopWidth,
    borderRightWidth: props.bRightWidth,
    borderLeftWidth: props.bLeftWidth,
    borderRadius: props.rounded ? convertBorderRadius(props.rounded) : undefined,
    borderColor: props.bColor,
    borderBottomColor: props.bBottomColor,
    borderTopColor: props.bTopColor,
    borderRightColor: props.bRightColor,
    borderLeftColor: props.bLeftColor,
    opacity: props.opacity,
    overflow: props.overflow,
    zIndex: props.zIndex,
  }
}

export function makeBaseDividerStyle(props: CustomDividerProps): StyleProp<ViewStyle> {
  return {
    backgroundColor: props.bg ?? Colors.gray[200],
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: 1,
    margin: dimensionCalculate(props.m),
    marginHorizontal: dimensionCalculate(props.mx),
    marginVertical: props.my ? dimensionCalculate(props.my) : 16,
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
  }
}

export function makeBaseTextStyle(props: CustomTextProps): StyleProp<TextStyle> {
  function getFontSize() {
    if (!props.fSize) {
      return FontSizes.md
    }

    if (typeof props.fSize === 'number') {
      return props.fSize
    }

    return convertFontSize(props.fSize)
  }

  function getFontWeight() {
    if (!props.fWeight || props.fWeight === 'normal') {
      return 'normal'
    }

    switch (props.fWeight) {
      case 'lightBold':
        return '500'
      case 'semiBold':
        return '600'
      case 'bold':
        return '700'
      case 'extraBold':
        return '800'
      default:
        return props.fWeight 
    }
  }

  const fontSizeNumber = useMemo(() => {
    return getFontSize()
  }, [props.fSize])

  const fontWeight = useMemo(() => {
    return getFontWeight()    
  }, [props.fWeight])

  return {
    width: dimensionCalculate(props.w),
    fontSize: fontSizeNumber,
    fontFamily: props.fFamily,
    fontWeight: fontWeight,    
    color: props.fColor ?? Colors.gray[800],
    textAlign: props.textAlign,
    margin: dimensionCalculate(props.m),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    textTransform: props.textTransform,
  }
}

export function makeBaseTextAreaStyle(props: CustomTextAreaProps): StyleProp<TextStyle> {
  return {
    fontSize: convertFontSize(props.fSize),
    color: props.fColor,
    fontFamily: props.fFamily,
    textAlignVertical: props.textAlignVertical ?? 'top',
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: dimensionCalculate(props.h ?? 24),
    margin: dimensionCalculate(props.m),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    paddingHorizontal: dimensionCalculate(props.px ?? 2),
    paddingTop: dimensionCalculate(props.pt ?? 2),
    paddingBottom: dimensionCalculate(props.pb ?? 2),
    backgroundColor: props.bg 
      ? props.bg
      : props.readOnly 
      ? Colors.muted[200]
      : Colors.white,
    borderColor: props.noBorder
      ? undefined
      : props.bColor
      ? props.bColor
      : Colors.gray[500],      
    borderWidth: props.noBorder ? 0 : 1,
    borderRadius: convertBorderRadius(props.rounded),
    opacity: props.disableOpacity
      ? 1 
      : props.opacity 
      ? props.opacity
      : props.readOnly
      ? DISABLED_OPACITY
      : 1,
  }
}

export function makeBaseTextInputStyle(props: CustomTextInputProps): StyleProp<TextStyle> {
  const paddingRightCalculate = useMemo(() => {
    if (props.rightIcon) {
      const paddingRight = 
        (props.rightIcon.icon.size ?? DEFAULT_ICON_SIZE) + 
        (props.px ? Number(props.px) : 3) + 1

      return dimensionCalculate(paddingRight)
    } else {
      return dimensionCalculate(props.px ?? 3)
    }
  },[props.px, props.rightIcon])
  
  return {
    fontFamily: props.fFamily,
    fontSize: convertFontSize(props.fSize),
    color: props.fColor,
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: dimensionCalculate(props.h ?? 12),
    margin: dimensionCalculate(props.m),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    paddingLeft: dimensionCalculate(props.px ?? 3),
    paddingRight: paddingRightCalculate,
    paddingTop: dimensionCalculate(props.pt ?? 3),
    paddingBottom: dimensionCalculate(props.pb ?? 3),
    backgroundColor: props.bg 
      ? props.bg
      : props.readOnly 
      ? Colors.muted[200]
      : Colors.white,
    borderColor: props.noBorder
      ? undefined
      : props.bColor
      ? props.bColor
      : Colors.gray[500],      
    borderWidth: props.noBorder ? 0 : 1,
    borderRadius: convertBorderRadius(props.rounded),
    opacity: props.disableOpacity
      ? 1 
      : props.opacity 
      ? props.opacity
      : props.readOnly
      ? DISABLED_OPACITY
      : 1,
  }
}

export function makeBaseMaskedInputStyle(props: CustomTextInputProps): StyleProp<TextStyle> {
  return {
    fontFamily: props.fFamily,
    fontSize: convertFontSize(props.fSize),
    color: props.fColor,
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: dimensionCalculate(props.h ?? 12),
    margin: dimensionCalculate(props.m),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    paddingHorizontal: dimensionCalculate(props.px ?? 3),
    paddingTop: dimensionCalculate(props.pt ?? 3),
    paddingBottom: dimensionCalculate(props.pb ?? 3),
    backgroundColor: props.bg 
      ? props.bg
      : props.readOnly 
      ? Colors.muted[200]
      : Colors.white,
    borderColor: props.noBorder
      ? undefined
      : props.bColor
      ? props.bColor
      : Colors.gray[500],      
    borderWidth: props.noBorder ? 0 : 1,
    borderRadius: convertBorderRadius(props.rounded),
    opacity: props.disableOpacity
      ? 1 
      : props.opacity 
      ? props.opacity
      : props.readOnly
      ? DISABLED_OPACITY
      : 1,
  }
}

export function makeBaseEMCButtonStyle(props: CustomButtonProps): StyleProp<ViewStyle> {
  return {
    position: props.position,
    left: props.left,
    top: props.top,
    flex: props.flex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',    
    backgroundColor: props.bg ?? Colors.blue[400],
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: dimensionCalculate(props.h ?? 14),
    minWidth: dimensionCalculate(props.minW),
    minHeight: dimensionCalculate(props.minH),
    maxWidth: dimensionCalculate(props.maxW),
    maxHeight: dimensionCalculate(props.maxH),
    padding: dimensionCalculate(props.p ?? 2),
    paddingHorizontal: dimensionCalculate(props.px),
    paddingVertical: dimensionCalculate(props.py),
    paddingTop: dimensionCalculate(props.pt),
    paddingBottom: dimensionCalculate(props.pb),
    paddingLeft: dimensionCalculate(props.pl),
    paddingRight: dimensionCalculate(props.pr),
    margin: dimensionCalculate(props.m),
    marginHorizontal: dimensionCalculate(props.mx),
    marginVertical: dimensionCalculate(props.my),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    borderWidth: props.bWidth,
    borderBottomWidth: props.bBottomWidth,
    borderTopWidth: props.bTopWidth,
    borderRightWidth: props.bRightWidth,
    borderLeftWidth: props.bLeftWidth,
    borderRadius: props.rounded ? convertBorderRadius(props.rounded) : convertBorderRadius('md'),
    borderColor: props.bColor,
    borderBottomColor: props.bBottomColor,
    borderTopColor: props.bTopColor,
    borderRightColor: props.bRightColor,
    borderLeftColor: props.bLeftColor,
    opacity: props.opacity
      ? props.opacity 
      : props.disabled
      ? DISABLED_OPACITY 
      : 1,
    overflow: props.overflow,
    zIndex: props.zIndex,
  }
}

export function makeBaseScrollViewContainerStyle(props: CustomScrollViewContainerProps): StyleProp<ViewStyle> {
  return {
    backgroundColor: props.bg,
    alignItems: props.align,
    justifyContent: props.justify,
    padding: dimensionCalculate(props.p),
    paddingHorizontal: dimensionCalculate(props.px),
    paddingVertical: dimensionCalculate(props.py),
    paddingTop: dimensionCalculate(props.pt),
    paddingBottom: dimensionCalculate(props.pb),
    paddingLeft: dimensionCalculate(props.pl),
    paddingRight: dimensionCalculate(props.pr),
  }
}
