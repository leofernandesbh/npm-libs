import { CustomViewProps } from '../../styles/ui-components.types'
import RNBox from '../RNBox/RNBox'
import RNSafeArea from '../RNSafeArea'

const RNBoxSafe = (props: CustomViewProps) => {
  return (
    <RNSafeArea>
      <RNBox {...props} />
    </RNSafeArea>
  )
}

export default RNBoxSafe
