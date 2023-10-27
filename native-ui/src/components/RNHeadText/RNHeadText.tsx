import { TextProps, ColorValue } from "react-native"
import { Colors } from "../../theme"
import RNText from "../RNText"
import Consts from "../../styles/Consts"

interface RNHeadTextProps extends TextProps {
  fColor?: ColorValue
  textSize?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  noBold?: boolean
  m?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number
}

const RNHeadText = ({
  fColor,
  textSize,
  noBold,
  m,
  mt,
  mb,
  ml,
  mr,
  ...rest
}: RNHeadTextProps) => {
  return (
    <RNText
      m={m}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      fColor={fColor || Colors.gray[700]}
      fSize={textSize || 'md'}
      fWeight={noBold ? 'normal' : 'bold'}
      maxFontSizeMultiplier={Consts.MAX_ACCESSIBILITY_MULTIPLIER}
      numberOfLines={1}
      {...rest}
    />
  )
}

export default RNHeadText
