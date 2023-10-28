import { Colors } from "../../theme"
import RNVStack from "../RNVStack"

interface BackgroundProps {
  children: React.ReactNode
}

const RNBackground = ({ children }: BackgroundProps) => {
  return (
    <RNVStack
      flex={1}
      bg={Colors.slate[50]}
    >
      {children}
    </RNVStack>
  )
}

export default RNBackground