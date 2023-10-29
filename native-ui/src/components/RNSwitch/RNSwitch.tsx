import { ColorValue, Pressable, Switch, SwitchProps } from "react-native"
import { Colors } from "../../theme"
import { Ionicons } from "@expo/vector-icons"
import RNHStack from "../RNHStack"
import RNIcon from "../RNIcon"
import RNText from "../RNText"
import { FontSizeAcronymes, FontWeightAcronymes } from "../../styles"

interface RNSwitchProps extends SwitchProps {
  title: string
  fSize?: FontSizeAcronymes | number
  fFamily?: string
  fColor?: ColorValue
  fWeight?: FontWeightAcronymes
  onInformationPress?(): void
}

const RNSwitch = ({ title, fSize, fFamily, fColor, fWeight, onInformationPress, ...rest }: RNSwitchProps) => {
  return (
    <>
      <RNHStack align='center'>
        <RNText 
          mr={onInformationPress ? 1 : 2} 
          fSize={fSize} 
          fFamily={fFamily} 
          fColor={fColor} 
          fWeight={fWeight}
        >
          {title}
        </RNText>
        {onInformationPress && (
          <Pressable onPress={onInformationPress}>
            <RNIcon
              as={Ionicons}
              name='information-circle-outline'
              color={Colors.blue[400]}
              size={6}
            />
          </Pressable>
        )}
      </RNHStack>
      <Switch
        trackColor={{ false: Colors.gray[200], true: Colors.green[700] }}
        ios_backgroundColor={Colors.white}
        {...rest}
      />
    </>
  )
}

export default RNSwitch
