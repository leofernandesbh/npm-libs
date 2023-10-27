import GeneralConsts from "../GeneralConsts"
import NumberUtils from "../NumberUtils"
import RegexConsts from "../RegexConsts"

class ValidationUtils {
  static validateCNPJ(cnpj?: string) {
    if (!cnpj) {
      return ''
    }

    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14) return ''

    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    )
      return ''

    let tamanho: number = cnpj.length - 2
    let numeros: string = cnpj.substring(0, tamanho)
    const digitos: string = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--
      if (pos < 2) pos = 9
    }

    let resultado: number = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    if (resultado !== parseInt(digitos.charAt(0))) return ''

    tamanho += 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--
      if (pos < 2) {
        pos = 9
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    if (resultado !== parseInt(digitos.charAt(1))) return ''

    return (
      cnpj.substring(0, 2) +
      '.' +
      cnpj.substring(2, 5) +
      '.' +
      cnpj.substring(5, 8) +
      '/' +
      cnpj.substring(8, 12) +
      '-' +
      cnpj.substring(12, 14)
    )
  }

  static validateCPF(cpf?: string) {
    if (!cpf) {
      return ''
    }

    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11) return ''

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    )
      return ''

    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) return ''

    soma = 0
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) return ''

    return (
      cpf.substring(0, 3) +
      '.' +
      cpf.substring(3, 6) +
      '.' +
      cpf.substring(6, 9) +
      '-' +
      cpf.substring(9, 11)
    )
  }

  static validateEmail(email?: string) {
    if (!email) {
      return ''
    }

    return RegexConsts.REGEX_EMAIL.test(email)
  }

  static validatePhoneNumber(
    phoneNumber?: string,
    forceNineDigits?: boolean,
  ) {
    if (!phoneNumber) {
      return ''
    }

    let phone = NumberUtils.extractNumbers(phoneNumber)

    if (forceNineDigits && phone.length === 12) {
      phone = phone.slice(0, 4) + '9' + phone.slice(4)
    } else if (forceNineDigits && phone.length === 10) {
      phone = phone.slice(0, 2) + '9' + phone.slice(2)
    } else if (forceNineDigits && phone.length === 8) {
      phone = '9' + phone
    }

    if (phone.length === 13) {
      return (
        '(' +
        phone.substring(2, 4) +
        ') ' +
        phone.substring(4, 9) +
        '-' +
        phone.substring(9)
      )
    }

    if (phone.length < 8 || phone.length > 11) {
      return ''
    }

    let numbers = ''

    if (phone.length > 9) {
      const ddd = phone.substring(0, 2)

      if (!GeneralConsts.DDD_BRASIL.includes(ddd)) {
        return ''
      }

      numbers = phone.substring(2)
    } else {
      numbers = phone
    }

    if (numbers === '00000000' || numbers === '000000000') return ''

    const isValid = RegexConsts.REGEX_PHONE.test(phone)

    if (isValid) {
      switch (phone.length) {
        case 8:
          return phone.substring(0, 4) + '-' + phone.substring(4)
        case 9:
          return phone.substring(0, 5) + '-' + phone.substring(5)
        case 10:
          return (
            '(' +
            phone.substring(0, 2) +
            ')' +
            phone.substring(2, 6) +
            '-' +
            phone.substring(6)
          )
        default:
          return (
            '(' +
            phone.substring(0, 2) +
            ')' +
            phone.substring(2, 7) +
            '-' +
            phone.substring(7)
          )
      }
    } else {
      return ''
    }
  }
}

export default ValidationUtils