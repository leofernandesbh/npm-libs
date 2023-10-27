import { CustomViewProps } from '../../styles/Types/ui-components.types'
import RNCenter from '../RNCenter/RNCenter'
import SafeArea from '../RNSafeArea'

const RNCenterSafe = (props: CustomViewProps) => {
  return (
    <SafeArea>
      <RNCenter {...props} />
    </SafeArea>
  )
}

export default RNCenterSafe
