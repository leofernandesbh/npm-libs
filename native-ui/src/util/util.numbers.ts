export function stringToFloat(textValue?: string) {
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

export function extractNumbers(text: string, includeComma?: boolean) {
  const characters = '0123456789' + (includeComma ? ',' : '')

  function check(x: string) {
    return !!characters.includes(x)
  }
  return [...text].reduce((x, y) => (check(y) ? x + y : x), '')
}

export function numbersAndDots(text: string) {
  const characters = '0123456789.'

  function check(x: string) {
    return !!characters.includes(x)
  }
  return [...text].reduce((x, y) => (check(y) ? x + y : x), '')
}

export function stringToInteger(text?: string) {
  if (!text) {
    return 0
  }

  try {
    text = extractNumbers(text)

    if (!isNaN(parseInt(text))) {
      return parseInt(text)
    } else {
      return 0
    }
  } catch {
    return 0
  }
}