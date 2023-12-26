import { Platform, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import {
  CustomDividerProps,
  CustomViewProps,
  CustomTextAreaProps,
  CustomButtonProps,
  CustomTextInputProps,
  CustomScrollViewContainerProps,
  CustomTextProps
} from './Types/ui-components.types'
import {
  dimensionCalculate,
  convertBorderRadius,
  convertFontSize,
  marginCalculate,
  getFontFamily,
} from './styles.util'
import { Colors } from '../theme'
import Consts from './Consts'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    right: props.right,
    bottom: props.bottom,
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
    shadowColor: props.showShadow ? props.shadowStyle?.color ?? Colors.black : undefined,
    shadowOffset: props.showShadow ? { 
      width: props.shadowStyle?.wOffset ?? -1, 
      height: props.shadowStyle?.hOffset ?? 5 
    } : undefined,
    shadowOpacity: props.showShadow ? (props.shadowStyle?.opacity ?? 0.4) : undefined,
    shadowRadius: props.showShadow ? (props.shadowStyle?.radius ?? 4) : undefined,
    elevation: props.showShadow ? (props.shadowStyle?.elevation ?? 5) : undefined,
    gap: props.gap ? props.gap * Consts.UI_SIZE_MULTIPLIER : undefined,
  }
}

export function makeBaseDividerStyle(props: CustomDividerProps): StyleProp<ViewStyle> {
  return {
    backgroundColor: props.bg ?? Colors.gray[200],
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: 1,
    marginTop: marginCalculate(props.m, props.my, props.mt),
    marginBottom: marginCalculate(props.m, props.my, props.mb),
    marginLeft: marginCalculate(props.m, props.mx, props.ml),
    marginRight: marginCalculate(props.m, props.mx, props.mr),
  }
}

export function makeBaseTextStyle(props: CustomTextProps): StyleProp<TextStyle> {
  const fontWeight = () => {
    if (!props.fFamily) {
      return undefined
    }

    switch (props.fWeight) {
      case 'normal':
        return '400'
      case 'lightBold':
        return '500'
      case 'semiBold':
        return '600'
      case 'bold':
        return '700'
      case 'extraBold':
        return '800'
      default:
        return undefined
    }
  }

  return {
    width: dimensionCalculate(props.w),
    fontSize: convertFontSize(props.fSize),
    fontFamily: getFontFamily(props.fFamily, props.fWeight),
    fontWeight: fontWeight(),    
    color: props.fColor ?? Colors.gray[700],
    textAlign: props.textAlign,
    margin: dimensionCalculate(props.m),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml ?? props.mx),
    marginRight: dimensionCalculate(props.mr ?? props.mx),
    textTransform: props.textTransform,
  }
}

export function makeBaseTextAreaStyle(props: CustomTextAreaProps): StyleProp<TextStyle> {
  return {
    fontSize: convertFontSize(props.fSize),
    color: props.fColor,
    fontFamily: getFontFamily(props.fFamily, props.fWeight),
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
      ? Colors.neutral[200]
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
      ? Consts.DISABLED_OPACITY
      : 1,
  }
}

export function makeBaseTextInputStyle(props: CustomTextInputProps): StyleProp<TextStyle> {
  const paddingLeftCalculate = () => {
    if (props.leftIcon) {
      const paddingLeft = 
        (props.leftIcon.icon.size ?? Consts.DEFAULT_ICON_SIZE) + 
        (props.px ? Number(props.px) : 3) + 1.5

      return dimensionCalculate(paddingLeft)
    } else {
      return dimensionCalculate(props.px ?? 3)
    }
  }

  const paddingRightCalculate = () => {
    if (props.rightIcon) {
      const paddingRight = 
        (props.rightIcon.icon.size ?? Consts.DEFAULT_ICON_SIZE) + 
        (props.px ? Number(props.px) : 3) + 1

      return dimensionCalculate(paddingRight)
    } else {
      return dimensionCalculate(props.px ?? 3)
    }
  }
  
  return {
    fontFamily: getFontFamily(props.fFamily, props.fWeight),
    fontSize: convertFontSize(props.fSize),
    color: props.fColor ? props.fColor : ((props.readOnly && Platform.OS === 'android') ? Colors.gray[700] : undefined),
    width: props.w ? dimensionCalculate(props.w) : '100%',
    height: dimensionCalculate(props.h ?? 12),
    margin: dimensionCalculate(props.m),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    marginLeft: dimensionCalculate(props.ml),
    marginRight: dimensionCalculate(props.mr),
    paddingLeft: paddingLeftCalculate(),
    paddingRight: paddingRightCalculate(),
    paddingTop: dimensionCalculate(props.pt ?? 3),
    paddingBottom: dimensionCalculate(props.pb ?? 3),
    backgroundColor: props.bg 
      ? props.bg
      : props.readOnly 
      ? Colors.neutral[200]
      : undefined,
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
      ? Consts.DISABLED_OPACITY
      : 1,
  }
}

export function makeBaseMaskedInputStyle(props: CustomTextInputProps): StyleProp<TextStyle> {
  return {
    fontFamily: getFontFamily(props.fFamily, props.fWeight),
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
      ? Colors.neutral[200]
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
      ? Consts.DISABLED_OPACITY
      : 1,
  }
}

export function makeBaseRNButtonStyle(props: CustomButtonProps): StyleProp<ViewStyle> {
  const variantBgColor = () => {
    if (!props.variant){
      return Colors.button
    }

    switch (props.variant) {
      case 'outline':
        return 'transparent'
      case 'inactive':
        return Colors.gray[200]
      case 'danger':
        return Colors.rose[600]
      default:
        return Colors.button
    }
  }

  const variantBorderColor = () => {
    if (!props.variant){
      return
    }

    switch (props.variant) {
      case 'outline':
        return Colors.button
      default:
        return
    }
  }

  const variantBorderWidth = () => {
    if (!props.variant){
      return 0
    }

    switch (props.variant) {
      case 'outline':
        return 2
      default:
        return 0
    }
  }

  const paddingButtonLeftCalculate = () => {
      if (props.leftIcon) {
        return dimensionCalculate(3)
      } else {
        return props.pl ? props.pl : props.px ?? 0
      }
    }    

    const paddingButtonRightCalculate = () => {
      if (props.rightIcon) {
        return dimensionCalculate(3)
      } else {
        return props.pr ? props.pr : (props.px ?? 0)
      }
    }

  return {
    position: props.position,
    left: props.left,
    top: props.top,
    flex: props.flex,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',    
    backgroundColor: props.variant === 'outline' ? 'transparent' : (props.bg ?? variantBgColor()),
    width: props.w ? dimensionCalculate(props.w) : props.isDialog ? (props.isTablet ? dimensionCalculate(30) : dimensionCalculate(23)) : '100%',
    height: props.h ? dimensionCalculate(props.h) : props.isDialog ? dimensionCalculate(12) : props.isTablet ? dimensionCalculate(15) : dimensionCalculate(14),
    minWidth: dimensionCalculate(props.minW),
    minHeight: dimensionCalculate(props.minH),
    maxWidth: dimensionCalculate(props.maxW),
    maxHeight: dimensionCalculate(props.maxH),
    padding: dimensionCalculate(props.p ?? 2),
    paddingVertical: dimensionCalculate(props.py),
    paddingTop: dimensionCalculate(props.pt),
    paddingBottom: dimensionCalculate(props.pb),
    paddingLeft: paddingButtonLeftCalculate(),
    paddingRight: paddingButtonRightCalculate(),
    margin: dimensionCalculate(props.m),
    marginHorizontal: dimensionCalculate(props.mx),
    marginVertical: dimensionCalculate(props.my),
    marginLeft: (props.ml || props.ml === 0) ? dimensionCalculate(props.ml) : props.isDialog ? dimensionCalculate(4) : undefined,
    marginRight: dimensionCalculate(props.mr),
    marginTop: dimensionCalculate(props.mt),
    marginBottom: dimensionCalculate(props.mb),
    borderWidth: (props.bWidth || props.bWidth === 0) ? props.bWidth : variantBorderWidth(),
    borderBottomWidth: props.bBottomWidth,
    borderTopWidth: props.bTopWidth,
    borderRightWidth: props.bRightWidth,
    borderLeftWidth: props.bLeftWidth,
    borderRadius: props.rounded ? convertBorderRadius(props.rounded) : convertBorderRadius('md'),
    borderColor: props.bColor ?? variantBorderColor(),
    borderBottomColor: props.bBottomColor,
    borderTopColor: props.bTopColor,
    borderRightColor: props.bRightColor,
    borderLeftColor: props.bLeftColor,
    opacity: props.opacity
      ? props.opacity 
      : props.disabled
      ? Consts.DISABLED_OPACITY 
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