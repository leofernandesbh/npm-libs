import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  GestureResponderEvent,
  ImageProps,
  ImageSourcePropType,
  PressableProps,
  ScrollViewProps, TextInputProps,
  TextProps, TextStyle, TouchableOpacityProps, ViewProps, ViewStyle
} from 'react-native'
import { ActionSheetOptions } from "@expo/react-native-action-sheet"
import { INPUT_MASK_TYPES } from '../../util/util.masks'

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

export type FontWeightAcronymes =
  | 'normal'
  | 'lightBold'
  | 'semiBold'
  | 'bold'
  | 'extraBold'  

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

type ButtonVariants = 'normal' | 'outline' | 'danger' | 'inactive'

type AlignItemsAcronymes = 'flex-start' | 'center' | 'flex-end'

export interface CustomViewProps extends ViewProps {
  bg?: ColorValue
  position?: 'absolute' | 'relative'
  left?: DimensionValue
  top?: DimensionValue
  right?: DimensionValue
  bottom?: DimensionValue
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
  bLeftRounded?: BorderSizeAcronymes
  bRightRounded?: BorderSizeAcronymes
  opacity?: AnimatableNumericValue
  overflow?: 'visible' | 'hidden'
  zIndex?: number
  showShadow?: boolean
  shadowStyle?: {
    color?: ColorValue,
    wOffset?: number,
    hOffset?: number,
    opacity?: AnimatableNumericValue,
    radius?: number,
    elevation?: number,
  }  
  gap?: number  
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
  fWeight?: FontWeightAcronymes
  wordWrap?: boolean
  noAccessibility?: boolean
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'auto'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined
  w?: DimensionValue | 'full'
  m?: number
  mx?: number
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  opacity?: number
}

export interface CustomTextAreaProps extends TextInputProps {
  bg?: ColorValue
  fFamily?: string
  fWeight?: FontWeightAcronymes
  fSize?: FontSizeAcronymes | number
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
  fWeight?: FontWeightAcronymes
  fSize?: FontSizeAcronymes | number
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
  onClick?(event: GestureResponderEvent): void
  leftIcon?: {
    icon: CustomIconProps
    showOpacity?: boolean
    onClick?(): void
  }
  rightIcon?: {
    icon: CustomIconProps
    showOpacity?: boolean
    onClick?(): void
  }
}

export interface CustomTransparentTextInputProps extends TextInputProps {
  transparentColor: ColorValue
  fFamily?: string
  fWeight?: FontWeightAcronymes
  fSize?: FontSizeAcronymes | number
  fColor?: ColorValue
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  m?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  isUpperCase?: boolean
  isLowerCase?: boolean
  onlyNumbers?: boolean
  isDecimal?: boolean
  capitalizeWords?: boolean
  isPassword?: boolean
  isPhoneNumber?: boolean
  readOnly?: boolean
  disableOpacity?: boolean
  opacity?: AnimatableNumericValue
  defaultKeyboard?: boolean
  onClick?(event: GestureResponderEvent): void
}

export interface CustomMaskedInputProps extends CustomTextInputProps {
  maskType?: INPUT_MASK_TYPES
  onChangeValue?(value: string): void
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
  source: ImageSourcePropType
}

export interface CustomButtonProps extends PressableProps {
  variant?: ButtonVariants
  title?: string
  subtitle?: string
  titleStyle?: CustomTextProps
  subtitleStyle?: CustomTextProps
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
  isTablet?: boolean
  isDialog?: boolean
  leftIcon?: CustomIconProps
  rightIcon?: CustomIconProps
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

interface DecimalKeyboardFooterButtonProps extends TouchableOpacityProps {
  title: string
}

export interface CustomDecimalKeyboardProps {
  currentFieldValue?: string
  decimals?: number
  maxLength?: number  
  slim?: boolean
  footerButtonDisabled?: boolean
  aditionalButtonDisabled?: boolean
  noComma?: boolean
  readOnly?: boolean
  noMargim?: boolean
  isString?: boolean
  isTablet?: boolean
  footerButton?: DecimalKeyboardFooterButtonProps
  aditionalFooterButton?: DecimalKeyboardFooterButtonProps  
  onChangeFieldValue?(value: string): void
} 

export interface CustomPressableProps extends PressableProps {
  noPressEffect?: boolean
  position?: 'absolute' | 'relative'
  left?: DimensionValue
  top?: DimensionValue
  right?: DimensionValue
  bottom?: DimensionValue
  flex?: number
  justify?: JustifyContentAcronymes
  align?: AlignItemsAcronymes
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  m?: DimensionValue
  mx?: DimensionValue
  my?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  rounded?: BorderSizeAcronymes
  zIndex?: number
}

export interface CustomTouchableProps extends TouchableOpacityProps {
  noPressEffect?: boolean
  position?: 'absolute' | 'relative'
  left?: DimensionValue
  top?: DimensionValue
  right?: DimensionValue
  bottom?: DimensionValue
  flex?: number
  justify?: JustifyContentAcronymes
  align?: AlignItemsAcronymes
  w?: DimensionValue | 'full'
  h?: DimensionValue | 'full'
  m?: DimensionValue
  mx?: DimensionValue
  my?: DimensionValue
  mt?: DimensionValue
  mb?: DimensionValue
  ml?: DimensionValue
  mr?: DimensionValue
  rounded?: BorderSizeAcronymes
  zIndex?: number
}

export interface CustomActionSheetProps {
  title: string
  message?: string
  options: string[]
  destructiveButtonIndex?: number
  icons?: React.ReactNode[]
  children: React.ReactNode
  withSeparators?: boolean
  cancelButtonTintColor?: string
  textStyle?: TextStyle
  titleTextStyle?: TextStyle
  messageTextStyle?: TextStyle
  containerStyle?: ViewStyle
  useModal?: boolean
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (selectedIndex?: number) => void,
  ) => void
  onActionSelection: (index?: number) => void
}

export interface CustomActionSheetModalProps {
  mx?: DimensionValue
  rounded?: BorderSizeAcronymes
  bg?: ColorValue
  dividerColor?: ColorValue
  title?: string
  message?: string
  titleStyle?: TextStyle
  messageStyle?: TextStyle
  optionStyle?: TextStyle
  destructiveStyle?: TextStyle
  speed?: number
  show: boolean
  options: string[]
  onSelect: (index: number) => void
  onCancel: () => void
}