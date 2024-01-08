import { Feather } from "@expo/vector-icons"
import { TouchableOpacityProps, TouchableOpacity } from "react-native"
import Consts from "../../styles/Consts"
import RNBox from "../RNBox"
import RNHStack from "../RNHStack"
import RNIcon from "../RNIcon"
import RNText from "../RNText"
import { Colors } from "../../theme"

interface RNDropDownProps extends TouchableOpacityProps {
  fFamily?: string
  h?: number
  value?: string
  placeholder: string
  disabled?: boolean
  isTablet?: boolean
}

const RNDropDown = ({
  fFamily,
  h,
  value,
  placeholder,
  disabled,
  isTablet,
  ...rest
}: RNDropDownProps) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : Consts.DEFAULT_OPACITY_CLICK}
      {...rest}
    >
      <RNHStack
        w='full'
        h={h || 12}
        align='center'
        justify='space-between'
        px={2}
        bg={Colors.white}
        opacity={disabled ? Consts.DISABLED_OPACITY : 1}
        bColor={Colors.gray[700]}
        bWidth={1}
        rounded='sm'
      >
        <RNBox>
          <RNText
            fFamily={fFamily}
            fSize={isTablet ? 'lg' : 'md'}
            fColor={value ? undefined : Colors.gray[500]}
          >
            {value || placeholder}
          </RNText>
        </RNBox>
        <RNBox>
          <RNIcon
            as={Feather}
            name='chevron-down'
            color={Colors.gray[700]}
            opacity={disabled ? Consts.DISABLED_OPACITY : 1}
            size={6}
          />
        </RNBox>
      </RNHStack>
    </TouchableOpacity>
  )
}

export default RNDropDown
