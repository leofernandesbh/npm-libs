import { Dimensions } from 'react-native'
import Toast from 'react-native-root-toast'
import { Colors } from '../../theme'
import { getFontFamily } from '../../styles/styles.util'
import RNFontSizes from '../../theme/FontSizes/FontSizes'

type RNToastVariant = 'information' | 'error' | 'alert' | 'success'
type RNToastPosition = 'top' | 'bottom' | 'center'

const showToast = (text: string, variant: RNToastVariant, timeout?: number, fFamily?: string, position?: RNToastPosition) => {
  const toastEmoji =
    variant === 'success'
      ? '✓  '
      : variant === 'alert'
      ? '❕ '
      : variant === 'error'
      ? '❕ '
      : '💡  '

  const toastPosition: number = position === 'center' ? Toast.positions.CENTER : position === 'bottom' ? Toast.positions.BOTTOM : Toast.positions.TOP

  return Toast.show(toastEmoji.concat(text), {
    duration: timeout || 2500,
    position: toastPosition,
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
      fontFamily: getFontFamily(fFamily),
      fontSize: RNFontSizes.toastPhone,
    },
  })
}

export default showToast
