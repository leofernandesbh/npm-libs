import { Alert, AlertButton } from 'react-native'

type MessageBoxProps = {
  message: string
  variant:
    | 'alert'
    | 'confirmation'
    | 'error'
    | 'sucess'
    | 'information'
    | 'validation'
  buttons?: AlertButton[]
}

function getMessageBoxTitle(variant: MessageBoxProps['variant']) {
  switch (variant) {
    case 'alert':
      return 'Atenção'
    case 'confirmation':
      return 'Confirmação'
    case 'error':
      return 'Ops!'
    case 'sucess':
      return 'Sucesso'
    case 'information':
      return 'Informação'
    case 'validation':
      return 'Ops!'
  }
}

function showSimpleMessageBox(props: MessageBoxProps) {
  const title = getMessageBoxTitle(props.variant)

  return Alert.alert(title, props.message)
}

const RNMessageBox = (props: MessageBoxProps) => {
  if (!props.buttons) {
    return showSimpleMessageBox(props)
  }

  const title = getMessageBoxTitle(props.variant)

  return Alert.alert(title, props.message, props.buttons)
}

export default RNMessageBox
