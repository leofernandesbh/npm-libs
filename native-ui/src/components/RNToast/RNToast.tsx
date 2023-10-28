import { Dimensions } from 'react-native'
import Toast from 'react-native-root-toast'
import { Colors } from '../../theme'
import { getFontFamily } from '../../styles/styles.util'
import RNFontSizes from '../../theme/FontSizes/FontSizes'

type RNToastVariant = 'information' | 'error' | 'alert' | 'success'

const showToast = (text: string, variant: RNToastVariant, timeout?: number) => {
  const toastEmoji =
    variant === 'success'
      ? '✓  '
      : variant === 'alert'
      ? '❕ '
      : variant === 'error'
      ? '❕ '
      : '💡  '

  return Toast.show(toastEmoji.concat(text), {
    duration: timeout || 2500,
    position: Toast.positions.TOP,
    shadow: false,
    opacity: 1,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:
      variant === 'success'
        ? Colors.green[700]
        : variant === 'alert'
        ? Colors.orange[600]
        : variant === 'error'
        ? Colors.red[600]
        : Colors.blue[700],
    containerStyle: {
      alignItems: 'flex-start',
      width: Dimensions.get('window').width - 20,
      paddingVertical: 14,
      paddingHorizontal: 12,
    },
    textStyle: {
      color: Colors.white,
      fontFamily: getFontFamily(),
      fontSize: RNFontSizes.toastPhone,
    },
  })
}

export default showToast
