import { useMemo } from 'react'
import { Dimensions, Platform, TouchableOpacity, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'

import { CustomDecimalKeyboardProps } from '../../styles/Types/ui-components.types'
import RNColors from '../../theme/Colors'
import RNIcon from '../RNIcon'
import RNVStack from '../RNVStack'
import RNText from '../RNText'
import RNBox from '../RNBox'
import RNHStack from '../RNHStack'
import Consts from '../../styles/Consts'

const RNDecimalKeyboard = (props: CustomDecimalKeyboardProps) => {
  const insets = useSafeAreaInsets()  

  type KeyboardButtonProps = {
    numberButtonText: string
    numberButtonFooterText?: string
    transparent?: boolean
    topAlignment?: boolean
    isBackSpace?: boolean
  }

  function KeyboardButton({
    numberButtonText,
    numberButtonFooterText,
    transparent,
    topAlignment,
    isBackSpace,
  }: KeyboardButtonProps) {
    const buttonWidth = useMemo(() => {
      return Math.trunc(Dimensions.get('window').width / 3 - 12)
    }, [])

    const buttonStyles = StyleSheet.create({
      buttonContainer: {
        width: buttonWidth,
        height: !props.slim ? 52 : 44,
        backgroundColor: transparent ? undefined : RNColors.white,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonShadow: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 5,
      },
    })

    return (
      <TouchableOpacity
        activeOpacity={
          props.readOnly || numberButtonText === ''
            ? 1
            : Consts.OPACITY_CLICK_HARD
        }
        delayPressIn={0}
        onPressIn={
          props.readOnly || numberButtonText === ''
            ? undefined
            : () => numberPress(numberButtonText)
        }
      >
        <RNVStack
          style={
            transparent
              ? [buttonStyles.buttonContainer]
              : [buttonStyles.buttonContainer, buttonStyles.buttonShadow]
          }
        >
          {!isBackSpace && (
            <RNText
              style={props.slim ? styles.primaryTextSlim : styles.primaryText}
            >
              {numberButtonText}
            </RNText>
          )}
          {!props.slim &&
            !isBackSpace &&
            (numberButtonText || topAlignment) && (
              <RNText style={styles.footerText}>
                {numberButtonFooterText}
              </RNText>
            )}
          {isBackSpace && (
            <RNIcon
              as={Ionicons}
              name='backspace-outline'
              size={7}
              color={RNColors.gray[800]}
            />
          )}
        </RNVStack>
      </TouchableOpacity>
    )    
  }

  function numberPress(valuePressed: string) {
    if (!props.onChangeFieldValue) {
      Haptics.notificationAsync()
      return
    }

    if (!props.isString) {
      if (props.currentFieldValue === '0' && valuePressed === '0') {
        Haptics.notificationAsync()
        return
      }
    }

    if (props.maxLength && valuePressed !== 'x') {
      if (props.currentFieldValue && props.currentFieldValue.length === props.maxLength) {
        Haptics.notificationAsync()
        return
      }
    }

    if (
      valuePressed === ',' &&
      props.currentFieldValue &&
      props.currentFieldValue.includes(',')
    ) {
      Haptics.notificationAsync()
      return
    }

    if (
      valuePressed === ',' &&
      (!props.currentFieldValue || props.currentFieldValue === '')
    ) {
      Haptics.notificationAsync()
      return
    }

    if (valuePressed !== 'x' && props.currentFieldValue) {
      const numberParts = props.currentFieldValue.split(',')

      if (
        numberParts.length === 2 &&
        numberParts[1].length >= (props.decimals ?? 2)
      ) {
        Haptics.notificationAsync()
        return
      }
    }

    Platform.OS === 'ios' && Haptics.selectionAsync()

    if (!props.isString) {
      if (props.currentFieldValue === '0' && valuePressed !== ',') {
        props.currentFieldValue = ''
      }
    }

    let newFieldValue = props.currentFieldValue || ''

    if (valuePressed === 'x') {
      if (newFieldValue && newFieldValue.length > 0) {
        newFieldValue = newFieldValue.substring(0, newFieldValue.length - 1)
      }
    } else {
      newFieldValue = newFieldValue + valuePressed
    }

    props.onChangeFieldValue(newFieldValue)
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: RNColors.gray[300],
      paddingTop: 8,
      paddingBottom: props.footerButton
        ? 18
        : insets.bottom + (Platform.OS === 'android' ? 5 : 0),
      paddingHorizontal: 8,
      marginTop: props.noMargim ? 0 : 16,
    },    
    primaryText: {
      fontSize: 22,
      color: RNColors.gray[800],
    },
    primaryTextSlim: {
      fontSize: 21,
      color: RNColors.gray[800],
    },
    footerContainer: {
      width: '100%',
      height: props.isTablet ? 68 : 64,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: insets.bottom + (Platform.OS === 'android' ? 5 : 0),
    },
    footerText: {
      fontSize: 10,
      color: RNColors.gray[800],
    },
  })

  return (
    <>
      <View style={styles.container}>
        <RNHStack
          w='full'
          mb={2}
          align='center'
          justify='space-evenly'
        >
          <KeyboardButton
            numberButtonText='1'
            topAlignment
          />
          <KeyboardButton
            numberButtonText='2'
            numberButtonFooterText='ABC'
          />
          <KeyboardButton
            numberButtonText='3'
            numberButtonFooterText='DEF'
          />
        </RNHStack>
        <RNHStack
          w='full'
          mb={2}
          align='center'
          justify='space-evenly'
        >
          <KeyboardButton
            numberButtonText='4'
            numberButtonFooterText='GHI'
          />
          <KeyboardButton
            numberButtonText='5'
            numberButtonFooterText='JKL'
          />
          <KeyboardButton
            numberButtonText='6'
            numberButtonFooterText='MNO'
          />
        </RNHStack>
        <RNHStack
          w='full'
          mb={2}
          align='center'
          justify='space-evenly'
        >
          <KeyboardButton
            numberButtonText='7'
            numberButtonFooterText='PQRS'
          />
          <KeyboardButton
            numberButtonText='8'
            numberButtonFooterText='TUV'
          />
          <KeyboardButton
            numberButtonText='9'
            numberButtonFooterText='WXYZ'
          />
        </RNHStack>
        <RNHStack
          w='full'
          align='center'
          justify='space-evenly'
        >
          <KeyboardButton
            numberButtonText={props.noComma ? '' : ','}
            transparent
          />
          <KeyboardButton numberButtonText='0' />
          <KeyboardButton
            numberButtonText='x'
            isBackSpace
            transparent
          />
        </RNHStack>
      </View>
      <View style={styles.footerContainer}>
        {props.footerButton && (
          <RNBox
            flex={1}
            bRightColor={RNColors.gray[300]}
            bRightWidth={0.5}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={
                props.footerButtonDisabled ? 1 : Consts.DEFAULT_OPACITY_CLICK
              }
              {...props.footerButton}
            >
              <RNBox
                flex={1}
                bg={
                  props.footerButtonDisabled
                    ? RNColors.gray[500]
                    : RNColors.button
                }
                align='center'
                justify='center'
                opacity={props.footerButtonDisabled ? 0.5 : 1}
              >
                <RNText
                  fColor={RNColors.slate[50]}
                  fWeight='bold'
                >
                  {props.footerButton.title}
                </RNText>
              </RNBox>
            </TouchableOpacity>
          </RNBox>
        )}
        {props.aditionalFooterButton && (
          <RNBox
            flex={1}
            bLeftColor={RNColors.gray[300]}
            bLeftWidth={0.5}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={
                props.aditionalButtonDisabled ? 1 : Consts.DEFAULT_OPACITY_CLICK
              }
              {...props.aditionalFooterButton}
            >
              <RNBox
                flex={1}
                bg={
                  props.aditionalButtonDisabled
                    ? RNColors.gray[300]
                    : RNColors.red[500]
                }
                align='center'
                justify='center'
              >
                <RNText
                  fColor={RNColors.slate[50]}
                  fWeight='bold'
                >
                  {props.aditionalFooterButton.title}
                </RNText>
              </RNBox>
            </TouchableOpacity>
          </RNBox>
        )}
      </View>
    </>
  )
}

export default RNDecimalKeyboard
