import { CustomViewProps } from '../../styles/Types/ui-components.types'
import SafeArea from '../RNSafeArea'
import RNVStack from '../RNVStack/RNVStack'

const RNVStackSafe = (props: CustomViewProps) => {
  return (
    <SafeArea>
      <RNVStack {...props} />
    </SafeArea>
  )
}

export default RNVStackSafe
