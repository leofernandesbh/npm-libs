import { ColorValue, Platform } from "react-native"
import { Colors } from "../../theme"
import { FontSizeAcronymes, FontWeightAcronymes, CustomIconProps } from "../../styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import RNBox from "../RNBox"
import RNHStack from "../RNHStack"
import RNIcon from "../RNIcon"
import RNPressable from "../RNPressable"
import RNSpinner from "../RNSpinner"
import React from "react"
import RNText from "../RNText"

type RNHeaderProps = {
  centerTitle?: {
    title: string
    fSize?: FontSizeAcronymes | number
    fColor?: ColorValue
    fWeight?: FontWeightAcronymes
  }
  centerSubTitle?: {
    title: string
    fSize?: FontSizeAcronymes | number
    fColor?: ColorValue
    fWeight?: FontWeightAcronymes
  }
  leftOption?: {
    icon: CustomIconProps
    loading?: boolean
    disabled?: boolean
    onPress(): void
  }
  rightOption?: {
    icon: CustomIconProps
    loading?: boolean
    disabled?: boolean
    onPress(): void
  }
  bg?: ColorValue
  isModal?: boolean
}

const RNHeader = (props: RNHeaderProps) => {
  const { top } = useSafeAreaInsets()

  return (
    <RNHStack
      zIndex={1}
      pt={
        props.isModal && Platform.OS === 'android'
          ? 1
          : top / 4 + (Platform.OS === 'android' ? 1 : 0)
      }
      pb={3}
      px={2}
      mb={4}
      bg={props.bg || Colors.emerald[700]}
      h={22}
      w='full'
      justify='center'
    >
      <RNBox
        w={10}
        align='center'
        justify='center'
      >
        {props.leftOption &&
          (props.leftOption.loading ? (
            <RNSpinner
              color={Colors.white}
              size='sm'
            />
          ) : (
            <RNPressable onPress={props.leftOption.onPress}>
              <RNIcon
                as={props.leftOption.icon.as}
                name={props.leftOption.icon.name}
                size={props.leftOption.icon.size || 6}
                color={props.leftOption.icon.color || Colors.white}
              />
            </RNPressable>
          ))}
      </RNBox>
      <RNBox
        flex={1}
        align='center'
      >
        {props.centerTitle && (
          <RNText
            fSize={props.centerTitle.fSize || 'lg'}
            fColor={props.centerTitle.fColor || Colors.white}
            fWeight={
              props.centerTitle.fWeight ||
              (props.centerSubTitle ? 'semiBold' : 'lightBold')
            }
          >
            {props.centerTitle.title}
          </RNText>
        )}
        {props.centerSubTitle && (
          <RNText
            fSize={props.centerSubTitle.fSize || 'xs'}
            fColor={props.centerSubTitle.fColor || Colors.white}
            fWeight={props.centerSubTitle.fWeight || 'normal'}
          >
            {props.centerSubTitle.title}
          </RNText>
        )}
      </RNBox>
      <RNBox
        w={10}
        align='center'
        justify='center'
      >
        {props.rightOption &&
          (props.rightOption.loading ? (
            <RNSpinner
              color={Colors.white}
              size='sm'
            />
          ) : (
            <RNPressable onPress={props.rightOption.onPress}>
              <RNIcon
                as={props.rightOption.icon.as}
                name={props.rightOption.icon.name}
                size={props.rightOption.icon.size || 6}
                color={props.rightOption.icon.color || Colors.white}
              />
            </RNPressable>
          ))}
      </RNBox>
    </RNHStack>
  )
}

export default RNHeader
