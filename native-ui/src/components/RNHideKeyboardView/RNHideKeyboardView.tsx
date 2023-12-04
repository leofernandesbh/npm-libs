import { Keyboard, Pressable } from 'react-native'

type RNHideKeyboardViewProps = {
  children?: React.ReactNode
}

const RNHideKeyboardView = ({ children }: RNHideKeyboardViewProps) => {
  return <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>{children}</Pressable>
}

export default RNHideKeyboardView