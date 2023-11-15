import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'
import { makeBaseMaskedInputStyle } from '../../styles/styles.factory'
import { CustomMaskedInputProps } from '../../styles/Types/ui-components.types'
import RNBox from '../RNBox/RNBox'
import {
  inputMaskCEP,
  inputMaskCNPJ,
  inputMaskCPF,
  inputMaskCPFCNPJ,
  inputMaskCurrency,
  inputMaskDate,
  inputMaskNumbers,
  inputMaskPhone,
  inputMaskTime
} from '../../util/util.masks'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const RNMaskedInput = (props: CustomMaskedInputProps, ref: any) => {
  const baseStyle = props.style ?? makeBaseMaskedInputStyle(props)

  function handleChangeText(value: string) {
    if (props.maskType) {
      switch (props.maskType) {
        case 'cep':
          value = inputMaskCEP(value)
          break
        case 'cnpj':
          value = inputMaskCNPJ(value)
          break
        case 'cpf':
          value = inputMaskCPF(value)
          break
        case 'cpfcnpj':
          value = inputMaskCPFCNPJ(value)
          break
        case 'currency':
          value = inputMaskCurrency(value, false)
          break
        case 'numbers':
          value = inputMaskNumbers(value)
          break
        case 'telephone':
          value = inputMaskPhone(value)
          break
        case 'date':
          value = inputMaskDate(value)
          break
        case 'time':
          value = inputMaskTime(value)
          break
      }
      props.onChangeValue(value)
    } else {
      props.onChangeValue(value)
    }
  }

  return (
    <RNBox w={props.w ? undefined : '100%'}>
      <TextInput
        ref={ref || undefined}
        {...props}
        style={baseStyle}
        textAlign='center'
        numberOfLines={1}
        autoCorrect={false}
        clearButtonMode={props.noClear ? 'never' : 'always'}
        autoComplete={props.autoComplete}
        cursorColor={Colors.cursor}
        selectionColor={undefined}
        editable={!props.readOnly}
        autoCapitalize='none'
        keyboardType='number-pad'
        onChangeText={(value) => handleChangeText(value)}
      />
    </RNBox>
  )
}

export default forwardRef<TextInput, CustomMaskedInputProps>(RNMaskedInput)