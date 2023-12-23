import React, { forwardRef } from 'react'
import { Platform, Pressable, TextInput } from 'react-native'
import { makeBaseTextInputStyle } from '../../styles/styles.factory'
import { CustomTextInputProps } from '../../styles/Types/ui-components.types'
import RNIcon from '../RNIcon'
import { Colors } from '../../theme'
import { dimensionCalculate } from '../../styles/styles.util'
import RNBox from '../RNBox'
import RNHStack from '../RNHStack'
import Consts from '../../styles/Consts'

  const RNTextInput = (props: CustomTextInputProps, ref: any) => {
    let baseStyle = props.style ?? makeBaseTextInputStyle(props)

    return (
      <RNBox w={props.w ? undefined : '100%'}>
        <RNHStack
          justify={!props.readOnly && props.rightIcon ? 'flex-end' : undefined}
        >
          <TextInput
            ref={ref || undefined}
            style={baseStyle}
            {...props}
            numberOfLines={1}
            autoCorrect={false}
            clearButtonMode={
              props.noClear || props.isPassword || props.rightIcon
                ? 'never'
                : 'always'
            }
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
          />
          {!props.readOnly && props.leftIcon && (
            <Pressable
              style={({ pressed }) => [
                {
                  position: 'absolute',
                  paddingLeft: 12,
                  paddingTop: dimensionCalculate(props.mt),
                  paddingBottom: dimensionCalculate(props.mb),
                  opacity: pressed ? Consts.DEFAULT_OPACITY_CLICK : 1,
                },
              ]}
              onPress={
                props.leftIcon.onClick ? props.leftIcon.onClick : undefined
              }
            >
              <RNIcon
                as={props.leftIcon.icon.as}
                name={props.leftIcon.icon.name}
                size={props.leftIcon.icon.size ?? Consts.DEFAULT_ICON_SIZE}
                color={props.leftIcon.icon.color ?? Colors.gray[500]}
              />
            </Pressable>
          )}
          {!props.readOnly && props.rightIcon && (
            <Pressable
              style={({ pressed }) => [
                {
                  position: 'absolute',
                  paddingRight: 12,
                  paddingTop: dimensionCalculate(props.mt),
                  paddingBottom: dimensionCalculate(props.mb),
                  opacity: pressed ? Consts.DEFAULT_OPACITY_CLICK : 1,
                },
              ]}
              onPress={
                props.rightIcon.onClick ? props.rightIcon.onClick : undefined
              }
            >
              <RNIcon
                as={props.rightIcon.icon.as}
                name={props.rightIcon.icon.name}
                size={props.rightIcon.icon.size ?? Consts.DEFAULT_ICON_SIZE}
                color={props.rightIcon.icon.color ?? Colors.gray[500]}
              />
            </Pressable>
          )}
        </RNHStack>
      </RNBox>
    )
  }

  export default forwardRef<TextInput, CustomTextInputProps>(RNTextInput)
