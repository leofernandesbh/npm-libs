import { CustomViewProps } from '../../styles/ui-components.types'
import RNBox from '../RNBox/RNBox'
import SafeArea from '../RNSafeArea'

const RNBoxSafe = (props: CustomViewProps) => {
  return (
    <SafeArea>
      <RNBox {...props} />
    </SafeArea>
  )
}

export default RNBoxSafe
