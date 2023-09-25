import { CustomViewProps } from '../../styles/ui-components.types'
import RNHStack from '../RNHStack/RNHStack'
import RNSafeArea from '../RNSafeArea'

const RNHStackSafe = (props: CustomViewProps) => {
  return (
    <RNSafeArea>
      <RNHStack {...props} />
    </RNSafeArea>
  )
}

export default RNHStackSafe
