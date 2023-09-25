import { CustomViewProps } from '../../styles/ui-components.types'
import RNSafeArea from '../RNSafeArea'
import RNVStack from '../RNVStack/RNVStack'

const RNVStackSafe = (props: CustomViewProps) => {
  return (
    <RNSafeArea>
      <RNVStack {...props} />
    </RNSafeArea>
  )
}

export default RNVStackSafe
