import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  ImageProps,
  PressableProps,
  ScrollViewProps, TextInputProps,
  TextProps, ViewProps
} from 'react-native'

export type FontSizeAcronymes =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

export type BorderSizeAcronymes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full'

type JustifyContentAcronymes =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

type AlignItemsAcronymes = 'flex-start' | 'center' | 'flex-end'

export interface CustomViewProps extends ViewProps {
  bg?: ColorValue
  position?: 'absolute' | 'relative'
  left?: DimensionValue
  top?: DimensionValue
  flex?: number
  justify?: JustifyContentAcronymes
  align?: AlignItemsAcronymes
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  minW?: DimensionValue
  minH?: DimensionValue
  maxW?: DimensionValue
  maxH?: DimensionValue
  p?: DimensionValue
  px?: DimensionValue
  py?: DimensionValue
  pt?: DimensionValue
  pb?: DimensionValue
  pl?: DimensionValue
  pr?: DimensionValue
  m?: DimensionValue
  mx?: DimensionValue
  my?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  bColor?: ColorValue
  bWidth?: number
  bLeftColor?: ColorValue
  bLeftWidth?: number
  bTopColor?: ColorValue
  bTopWidth?: number
  bRightColor?: ColorValue
  bRightWidth?: number
  bBottomColor?: ColorValue
  bBottomWidth?: number
  rounded?: BorderSizeAcronymes
  opacity?: AnimatableNumericValue
  overflow?: 'visible' | 'hidden'
  zIndex?: number
  showShadow?: boolean  
}

export interface CustomDividerProps extends ViewProps {
  bg?: ColorValue
  w?: DimensionValue | 'full'
  m?: DimensionValue
  mx?: DimensionValue
  my?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
}

export interface CustomIconProps {
  as: any
  name: any
  color?: ColorValue
  size?: number
  m?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  opacity?: AnimatableNumericValue
}

export interface CustomTextProps extends TextProps {
  fSize?: FontSizeAcronymes | number
  fFamily?: string
  fColor?: ColorValue
  fWeight?: 'normal' | 'lightBold' | 'semiBold' | 'bold' | 'extraBold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  wordWrap?: boolean
  noAccessibility?: boolean
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'auto'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined
  w?: DimensionValue | 'full'
  m?: number
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  opacity?: number
}

export interface CustomTextAreaProps extends TextInputProps {
  bg?: ColorValue
  fFamily?: string
  fSize?: FontSizeAcronymes
  fColor?: ColorValue
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  px?: DimensionValue
  pt?: DimensionValue
  pb?: DimensionValue
  m?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  noBorder?: boolean
  bColor?: ColorValue
  rounded?: BorderSizeAcronymes
  readOnly?: boolean
  disableOpacity?: boolean
  opacity?: AnimatableNumericValue
}

export interface CustomTextInputProps extends TextInputProps {
  bg?: ColorValue
  fFamily?: string
  fSize?: FontSizeAcronymes
  fColor?: ColorValue
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  p?: DimensionValue
  px?: DimensionValue
  pt?: DimensionValue
  pb?: DimensionValue
  m?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  noBorder?: boolean
  bColor?: ColorValue
  isUpperCase?: boolean
  isLowerCase?: boolean
  onlyNumbers?: boolean
  isDecimal?: boolean
  noClear?: boolean
  capitalizeWords?: boolean
  isPassword?: boolean
  isPhoneNumber?: boolean
  readOnly?: boolean
  disableOpacity?: boolean
  opacity?: AnimatableNumericValue
  rounded?: BorderSizeAcronymes
  defaultKeyboard?: boolean
  rightIcon?: {
    icon: CustomIconProps
    showOpacity?: boolean
    onClick?(): void
  }
}

export interface CustomImageProps extends ImageProps {
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  bg?: ColorValue
  p?: DimensionValue
  px?: DimensionValue
  py?: DimensionValue
  pt?: DimensionValue
  pb?: DimensionValue
  pl?: DimensionValue
  pr?: DimensionValue
  m?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  bColor?: ColorValue
  bWidth?: number
  rounded?: BorderSizeAcronymes
  source: {
    uri: string
  }
}

export interface CustomButtonProps extends PressableProps {
  title?: string
  titleStyle?: CustomTextProps
  bg?: ColorValue
  position?: 'absolute' | 'relative'
  left?: DimensionValue
  top?: DimensionValue
  flex?: number
  justify?: JustifyContentAcronymes
  align?: AlignItemsAcronymes
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  minW?: DimensionValue
  minH?: DimensionValue
  maxW?: DimensionValue
  maxH?: DimensionValue
  p?: DimensionValue
  px?: DimensionValue
  py?: DimensionValue
  pt?: DimensionValue
  pb?: DimensionValue
  pl?: DimensionValue
  pr?: DimensionValue
  m?: DimensionValue
  mx?: DimensionValue
  my?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  bColor?: ColorValue
  bWidth?: number
  bLeftColor?: ColorValue
  bLeftWidth?: number
  bTopColor?: ColorValue
  bTopWidth?: number
  bRightColor?: ColorValue
  bRightWidth?: number
  bBottomColor?: ColorValue
  bBottomWidth?: number
  rounded?: BorderSizeAcronymes
  opacity?: AnimatableNumericValue
  overflow?: 'visible' | 'hidden'
  zIndex?: number  
  loading?: boolean
  loadingText?: string
  loadingTextColor?: ColorValue
  loadingSpinnerColor?: ColorValue
  noPressedEffect?: boolean  
}

export interface CustomScrollViewContainerProps extends ScrollViewProps {
  bg?: ColorValue
  align?: AlignItemsAcronymes
  justify?: JustifyContentAcronymes
  p?: DimensionValue
  px?: DimensionValue
  py?: DimensionValue
  pt?: DimensionValue
  pb?: DimensionValue
  pl?: DimensionValue
  pr?: DimensionValue
}
