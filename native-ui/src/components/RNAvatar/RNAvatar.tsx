import { Image } from "react-native"
import { CustomImageProps } from "../../styles"
import { dimensionCalculate, convertBorderRadius } from "../../styles/styles.util"
import RNBox from "../RNBox"


const RNAvatar = ({
  bg,
  w,
  h,
  m,
  mt,
  mb,
  ml,
  mr,
  bColor,
  bWidth,
  rounded,
  alt,
  source,
  ...rest
}: CustomImageProps) => {
  return (
    <RNBox
      bg={bg}
      w={w}
      h={h}
      align='center'
      justify='center'
      m={m}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      bColor={bColor}
      bWidth={bWidth}
      rounded={rounded ?? 'full'}
    >
      <Image
        resizeMode='contain'
        style={{
          width: dimensionCalculate(w),
          height: dimensionCalculate(h),
          borderRadius: convertBorderRadius(rounded ?? 'full'),
        }}
        alt={alt}
        source={source}
        {...rest}
      />
    </RNBox>
  )
}

export default RNAvatar
