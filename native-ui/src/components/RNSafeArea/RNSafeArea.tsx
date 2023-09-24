import { SafeAreaView } from "react-native";
import { styles } from "../../styles/styles";

interface EMCSafeAreaProps {
  children: React.ReactNode
}

const RNSafeArea = ({ children }: EMCSafeAreaProps) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
}

export default RNSafeArea