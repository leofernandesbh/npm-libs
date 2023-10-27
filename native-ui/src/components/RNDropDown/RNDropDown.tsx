import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Feather } from "@expo/vector-icons"
import RNBox from "../RNBox"
import RNHStack from "../RNHStack"
import RNIcon from "../RNIcon"
import RNText from "../RNText"
import { Colors } from "../../theme"
import Consts from "../../styles/Consts"

interface RNDropDownProps extends TouchableOpacityProps {
  h?: number
  value?: string
  placeholder: string
  disabled?: boolean
  isTablet?: boolean  
}

const RNDropDown = ({
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
        bg={disabled ? 'light.200' : 'white'}
        bColor={Colors.gray[700]}
        bWidth={1}
        rounded='sm'
      >
        <RNBox>
          <RNText
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
            color={disabled ? Colors.light[400] : Colors.gray[800]}
            size={6}
          />
        </RNBox>
      </RNHStack>
    </TouchableOpacity>
  )
}

export default RNDropDown
