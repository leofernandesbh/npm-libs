import { Image, StyleSheet } from 'react-native'
import { Colors } from '../../theme'
import RNBox from '../RNBox'

type RNLogoProps = {
  size: number
  logoType?: 'blue' | 'white'
  logoBase64?: string | null
  m?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number
}

const RNLogo = (props: RNLogoProps) => {
  const styles = StyleSheet.create({
    logo: {
      width: 36,
      height: 36,
      resizeMode: 'contain',
    },
  })

  return (
    <RNBox
      w={props.size}
      h={props.size}
      align='center'
      justify='center'
      rounded='full'
      bWidth={1}
      bColor={Colors.gray[50]}
      {...props}
    >
      <Image
        alt='Logomarca'
        style={styles.logo}
        source={
          { uri: 'data:image/png;base64,' + props.logoBase64 }
        }
        defaultSource={
          { uri: 'data:image/png;base64,' + props.logoBase64 }
        }
      />
    </RNBox>
  )
}

export default RNLogo
