import { StyleSheet } from 'react-native'
import { CustomActionSheetProps } from '../../styles'
import RNPressable from '../RNPressable'
import { Colors } from '../../theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const RNActionSheet = ({
  title,
  message,
  options,
  destructiveButtonIndex,
  icons,
  children,
  withSeparators = true,
  cancelButtonTintColor,
  textStyle,
  titleTextStyle,
  messageTextStyle,
  containerStyle,
  useModal,
  showActionSheetWithOptions,
  onActionSelection,
}: CustomActionSheetProps) => {
  const insets = useSafeAreaInsets()

  const baseStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#eff0f0',
      marginBottom: insets.bottom,
      marginHorizontal: 8,
      borderRadius: 14,
    },
    titleTextStyle: {
      fontSize: 14,
      width: '100%',
      textAlign: 'center',
      color: Colors.neutral[600],
    },
    messageTextStyle: {
      fontSize: 13,
      width: '100%',
      textAlign: 'center',
      color: Colors.neutral[500],
    },
    textStyle: {
      fontSize: 20,
      width: '100%',
      textAlign: 'center',
      color: '#007AFF',
    },
  })


  function showActionSheet() {
    const cancelButtonIndex = options.length - 1

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor: cancelButtonTintColor || '#e72929',
        destructiveButtonIndex,
        title,
        message,
        icons,
        tintIcons: true,
        showSeparators: withSeparators,
        textStyle: {
          ...baseStyles.textStyle,
          ...textStyle,
        },
        titleTextStyle: {
          ...baseStyles.titleTextStyle,
          ...titleTextStyle,
        },
        messageTextStyle: {
          ...baseStyles.messageTextStyle,
          ...messageTextStyle,
        },
        containerStyle: {
          ...baseStyles.containerStyle,
          ...containerStyle,
        },
        useModal,
      },
      (buttonIndex?: number) => {
        onActionSelection(buttonIndex)
      },
    )
  }

  return <RNPressable onPress={showActionSheet}>{children}</RNPressable>
}

export default RNActionSheet
