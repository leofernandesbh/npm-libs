import { Platform } from 'react-native'
import { formatCurrency } from 'react-native-format-currency'

class NumberUtils {
  static stringToFloat(textValue?: string) {
    if (textValue) {
      textValue = textValue
        .replace('R$', '')
        .replace('%', '')
        .replace('.', '')
        .replace(',', '.')
        .trim()

      if (textValue.includes('(')) {
        textValue = textValue.split('(')[0].trim()
      }

      return parseFloat(textValue)
    } else {
      return NaN
    }
  }

  static editFloatString(textValue?: string) {
    if (textValue) {
      textValue = textValue
        .replace('R$', '')
        .replace('%', '')
        .replace('.', '')
        .trim()

      if (textValue.includes('(')) {
        textValue = textValue.split('(')[0].trim()
      }

      return textValue
    } else {
      return ''
    }
  }

  static currencyFormat(
    currencyValue: number | string | undefined,
    putSymbol = false,
    putPercent = false,
    outMultiple = 0,
    decimals = 2,
  ) {
    try {
      let currencyNumber: number

      if (!currencyValue) {
        currencyValue = 0
      }

      if (typeof currencyValue === 'string') {
        currencyNumber = parseFloat(
          currencyValue
            .replace('R$', '')
            .replace('%', '')
            .replace('.', '')
            .replace(',', '.')
            .trim(),
        )
      } else {
        currencyNumber = currencyValue
      }

      if (isNaN(currencyNumber)) {
        currencyNumber = 0
      }

      if (Platform.OS === 'ios') {
        let currencyText = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          maximumFractionDigits: decimals,
        }).format(currencyNumber)

        if (putPercent) {
          currencyText = currencyText.replace('R$', '').trim() + '%'
        } else if (!putSymbol) {
          currencyText = currencyText.replace('R$', '').trim()
        }

        if (outMultiple > 0) {
          if (currencyText.includes(',')) {
            if (outMultiple === 1 || parseInt(currencyText.split(',')[1]) === 0)
              currencyText = currencyText.split(',')[0]
          }
        }

        return currencyText
      } else {
        currencyNumber = parseFloat(currencyNumber.toFixed(decimals))

        const [currencyTextWithSymbol, currencyTextWithoutSymbol] =
          formatCurrency({
            amount: currencyNumber,
            code: 'BRL',
          })

        const currencyParts = putSymbol
          ? currencyTextWithSymbol.split(',')
          : String(currencyTextWithoutSymbol).split(',')

        let decimal = ',' + '0'.repeat(decimals)

        if (currencyParts[1]) {
          decimal = ',' + currencyParts[1].padEnd(decimals, '0')
        }

        if (
          outMultiple === 1 ||
          (outMultiple > 0 && parseInt(decimal.replace(',', '')) === 0)
        ) {
          return currencyParts[0]
        }

        if (!putSymbol && putPercent) {
          decimal += '%'
        }

        return currencyParts[0] + decimal
      }
    } catch {
      return String(currencyValue)
    }
  }

  static extractCurrencyValue(currencyText: string) {
    if (currencyText.length > 0) {
      const currencyValue = parseFloat(
        currencyText
          .replace('R$', '')
          .replace('%', '')
          .replace('.', '')
          .replace(',', '.')
          .trim(),
      )
      return isNaN(currencyValue) ? 0 : currencyValue
    } else {
      return 0
    }
  }

  static extractNumbers(text: string, includeComma?: boolean) {
    const characters = '0123456789' + (includeComma ? ',' : '')

    function check(x: string) {
      return !!characters.includes(x)
    }
    return [...text].reduce((x, y) => (check(y) ? x + y : x), '')
  }

  static numbersAndDots(text: string) {
    const characters = '0123456789.'

    function check(x: string) {
      return !!characters.includes(x)
    }
    return [...text].reduce((x, y) => (check(y) ? x + y : x), '')
  }

  static stringToInteger(text?: string) {
    if (!text) {
      return 0
    }

    try {
      text = this.extractNumbers(text)

      if (!isNaN(parseInt(text))) {
        return parseInt(text)
      } else {
        return 0
      }
    } catch {
      return 0
    }
  }

  static formatDecimalValue(decimalText: string, putSymbol: boolean) {
    const formatedText = decimalText.replace('.', '').replace(',', '')

    if (formatedText.length === 1) {
      return putSymbol ? 'R$ 0,0' + formatedText : '0,0' + formatedText
    }
    if (formatedText.length === 2) {
      return putSymbol ? 'R$ 0,' + formatedText : '0,' + formatedText
    }

    let valueText = ''
    let digits = 0

    for (let i = formatedText.length - 1; i >= 0; i--) {
      if (valueText.length === 2) {
        valueText = formatedText[i] + ',' + valueText
        digits += 1
      } else if (valueText.length > 2) {
        if (digits === 3) {
          digits = 1
          valueText = formatedText[i] + '.' + valueText
        } else {
          valueText = formatedText[i] + valueText
          digits += 1
        }
      } else {
        valueText = formatedText[i] + valueText
      }
    }

    return putSymbol ? 'R$ ' + valueText : valueText
  }

  static truncValue(value: number) {
    if (value > 0) {
      const textValue = String(value)
      if (textValue.includes('.')) {
        const numberParts = textValue.split('.')
        const integerPart = numberParts[0]
        const decimalPart = numberParts[1].substring(0, 2).padEnd(2, '0')

        const trucatedNumber = parseFloat(integerPart + '.' + decimalPart)

        if (!isNaN(trucatedNumber)) {
          return trucatedNumber
        } else {
          return value
        }
      } else {
        return value
      }
    } else {
      return 0
    }
  }

  static roundValue(value: number, decimalPlaces: number) {
    return parseFloat(value.toFixed(decimalPlaces))
  }

  static roundValueStr(value: number, decimalPlaces: number) {
    const roundedValue = this.roundValue(value, decimalPlaces)

    return roundedValue.toFixed(decimalPlaces)
  }
}

export default NumberUtils