import { forwardRef } from "react"
import { TextInput, Platform } from "react-native"
import { CustomTransparentTextInputProps } from "../../styles"
import { makeBaseTransparentTextInputStyle } from "../../styles/styles.factory"
import RNBox from "../RNBox"
import RNHStack from "../RNHStack"
import { Colors } from "../../theme"

const RNTransparentTextInput = (
  props: CustomTransparentTextInputProps,
  ref: any,
) => {
  const baseStyle = props.style ?? makeBaseTransparentTextInputStyle(props)

  return (
    <RNBox
      w={props.w ? undefined : '100%'}
      ml={props.ml || props.m}
      mr={props.mr || props.m}
      mt={props.mt || props.m}
      mb={props.mb || props.m}
    >
      <RNHStack>
        <TextInput
          ref={ref || undefined}
          style={baseStyle}
          {...props}
          numberOfLines={1}
          autoCorrect={false}
          clearButtonMode={'never'}
          autoComplete={props.autoComplete}
          cursorColor={Colors.cursor}
          selectionColor={undefined}
          editable={!props.readOnly}
          autoCapitalize={
            props.onlyNumbers ||
            props.isDecimal ||
            props.isLowerCase ||
            props.isPassword
              ? 'none'
              : props.isUpperCase
              ? 'characters'
              : props.capitalizeWords
              ? 'words'
              : 'sentences'
          }
          secureTextEntry={
            props.isPassword
              ? true
              : Platform.OS === 'ios' || props.onlyNumbers || props.isDecimal
              ? false
              : !!(props.isUpperCase || props.isLowerCase)
          }
          keyboardType={
            props.isDecimal
              ? Platform.OS === 'ios'
                ? 'decimal-pad'
                : props.defaultKeyboard
                ? 'numbers-and-punctuation'
                : 'decimal-pad'
              : props.isPhoneNumber
              ? 'phone-pad'
              : props.onlyNumbers
              ? 'number-pad'
              : props.keyboardType
              ? props.keyboardType
              : Platform.OS === 'ios'
              ? 'default'
              : props.isUpperCase || props.isLowerCase
              ? 'visible-password'
              : 'default'
          }
          onTouchEnd={props.onClick}
        />
      </RNHStack>
    </RNBox>
  )
}

export default forwardRef<TextInput, CustomTransparentTextInputProps>(
  RNTransparentTextInput,
)
