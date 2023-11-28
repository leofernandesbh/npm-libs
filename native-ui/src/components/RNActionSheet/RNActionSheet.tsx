import { CustomActionSheetProps } from '../../styles'
import RNPressable from '../RNPressable'

const RNActionSheet = ({
  title,
  message,
  options,
  destructiveButtonIndex,
  icons,
  children,
  withSeparators,
  cancelButtonTintColor,
  textStyle,
  titleTextStyle,
  messageTextStyle,
  containerStyle,
  useModal,
  showActionSheetWithOptions,
  onActionSelection,
}: CustomActionSheetProps) => {
  function showActionSheet() {
    const cancelButtonIndex = options.length - 1

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        cancelButtonTintColor,
        destructiveButtonIndex,
        title,
        message,
        icons,
        tintIcons: true,
        showSeparators: withSeparators,
        textStyle,
        titleTextStyle,
        messageTextStyle,
        containerStyle,
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
