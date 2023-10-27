import { Image } from 'react-native'
import RNBox from '../RNBox/RNBox'
import { CustomImageProps } from '../../styles/Types/ui-components.types'
import { convertBorderRadius, dimensionCalculate } from '../../styles/styles.util'

const RNAvatar = (props: CustomImageProps) => {
  return (
    <RNBox 
      bg={props.bg}
      w={props.w}
      h={props.h}
      align='center'
      justify='center'
      m={props.m}  
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
      bColor={props.bColor}
      bWidth={props.bWidth}
      rounded={props.rounded ?? 'full'}
    >
      <Image
        resizeMode='contain'
        style={{
            width: dimensionCalculate(props.w), 
            height: dimensionCalculate(props.h), 
            borderRadius: convertBorderRadius(props.rounded ?? 'full')
        }}
        alt={props.alt}
        source={{ uri: props.source.uri }}
      />
    </RNBox>
  )
}

export default RNAvatar