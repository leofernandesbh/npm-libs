export type INPUT_MASK_TYPES =
  | 'numbers'
  | 'cep'
  | 'telephone'
  | 'currency'
  | 'cpf'
  | 'cnpj'
  | 'cpfcnpj'

export function inputMaskCEP(value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  return value
}

export function inputMaskPhone(value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '($1)$2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  return value
}

export function inputMaskCurrency(value: string, putSymbol: boolean) {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  return putSymbol ? 'R$ ' + value : value
}

export function inputMaskCPF(value: string) {
  value = value.replace(/\D/g, '')

  if (value.length > 11) {
    value = value.substring(0, 11)
  }

  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return value
}

export function inputMaskCNPJ(value: string) {
  value = value.replace(/\D/g, '')

  if (value.length > 14) {
    value = value.substring(0, 14)
  }

  value = value.replace(/^(\d{2})(\d)/, '$1.$2')
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
  value = value.replace(/(\d{4})(\d)/, '$1-$2')
  return value
}

export function inputMaskCPFCNPJ(value: string) {
  value = value.replace(/\D/g, '')

  if (value.length > 14) {
    value = value.substring(0, 14)
  }

  if (value.length <= 11) {
    return inputMaskCPF(value)
  } else {
    return inputMaskCNPJ(value)
  }
}

export function inputMaskNumbers(value: string) {
  value = value.replace(/\D/g, '')
  return value
}
