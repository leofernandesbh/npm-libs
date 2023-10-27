import React from "react"
import { Platform } from "react-native"
import AnimatedLottieView from 'lottie-react-native'
import { Colors } from "../../theme"
import RNText from "../RNText"
import RNVStack from "../RNVStack"

interface RNWaitProps {
  waitMessage: string
  subTitle?: string
  showAnimation?: boolean
}

const RNWait = ({ waitMessage, subTitle, showAnimation }: RNWaitProps) => {
  return (
    <RNVStack
      position='absolute'
      left={0}
      top={0}
      w='full'
      h='full'
      bg='rgba(0,0,0,0.7)'
      align='center'
      justify='center'
    >
      {showAnimation && (
        <AnimatedLottieView
          autoPlay
          loop
          style={{
            width: 100,
            height: 100,
          }}
          source={
            Platform.OS === 'android'
              ? require('../../assets/loading-cubes-droid.json')
              : require('../../assets/loading-cubes.json')
          }
        />
      )}
      <RNText fColor={Colors.white}>{waitMessage}</RNText>
      {subTitle && (
        <RNText
          mt={1}
          fColor={Colors.white}
        >
          {subTitle}
        </RNText>
      )}
    </RNVStack>
  )
}

export default RNWait
