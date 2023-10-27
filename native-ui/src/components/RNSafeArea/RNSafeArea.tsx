import { SafeAreaView } from "react-native";
import { styles } from "../../styles/styles.factory";

interface RNSafeAreaProps {
  children: React.ReactNode
}

const RNSafeArea = ({ children }: RNSafeAreaProps) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
}

export default RNSafeArea