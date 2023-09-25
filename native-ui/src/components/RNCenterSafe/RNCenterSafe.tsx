import { CustomViewProps } from '../../styles/ui-components.types'
import RNCenter from '../RNCenter/RNCenter'
import RNSafeArea from '../RNSafeArea'

const RNCenterSafe = (props: CustomViewProps) => {
  return (
    <RNSafeArea>
      <RNCenter {...props} />
    </RNSafeArea>
  )
}

export default RNCenterSafe
