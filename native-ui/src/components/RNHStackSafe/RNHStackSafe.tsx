import { CustomViewProps } from '../../styles/Types/ui-components.types'
import RNHStack from '../RNHStack/RNHStack'
import SafeArea from '../RNSafeArea'

const RNHStackSafe = (props: CustomViewProps) => {
  return (
    <SafeArea>
      <RNHStack {...props} />
    </SafeArea>
  )
}

export default RNHStackSafe
