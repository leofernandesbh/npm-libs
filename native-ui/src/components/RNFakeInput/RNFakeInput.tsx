import { ColorValue, DimensionValue } from "react-native"
import { CustomViewProps } from "../../styles"
import { Colors } from "../../theme"
import RNBox from "../RNBox"
import RNText from "../RNText"

interface RNFakeInputProps extends CustomViewProps {
  inputText: string
  isBold?: boolean
  textStyle?: {
    fColor?: ColorValue
    fSize?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    textAlign?: 'left' | 'center' | 'right' | 'justify' | 'auto'
    w?: DimensionValue | 'full'
    h?: DimensionValue | 'full'
    m?: number
    mt?: number
    mb?: number
    ml?: number
    mr?: number
  }
}

const RNFakeInput = ({
  inputText,
  textStyle,
  isBold,
  align,
  justify,
  bg,
  w,
  h,
  px,
  ...rest
}: RNFakeInputProps) => {
  return (
    <RNBox
      w={w || 'full'}
      h={h || 12}
      px={px || 2}
      bg={bg || Colors.white}
      rounded='sm'
      align={align || 'center'}
      justify={justify || 'center'}
      bColor={Colors.gray[700]}
      bWidth={1}
      {...rest}
    >
      <RNText
        fColor={textStyle?.fColor}
        fSize={textStyle?.fSize}
        textAlign={textStyle?.textAlign}
        fWeight={isBold ? 'bold' : 'normal'}
        w={textStyle?.w}
        m={textStyle?.m}
        mt={textStyle?.mt}
        mb={textStyle?.mb}
        ml={textStyle?.ml}
        mr={textStyle?.mr}
      >
        {inputText}
      </RNText>
    </RNBox>
  )
}

export default RNFakeInput
