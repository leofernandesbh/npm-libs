import GeneralConsts from '../GeneralConsts'
import NumberUtils from '../NumberUtils'
import RegexConsts from '../RegexConsts'

class RNFormatUtils {
  static formatCelPhoneToWhatsApp(
    cellPhone?: string,
    uf?: string,
    presentationFormat?: boolean,
    invalidText?: string,
  ) {
    if (!cellPhone) {
      return
    }

    cellPhone = NumberUtils.extractNumbers(cellPhone)

    if (cellPhone.length === 0) {
      return invalidText
    }

    cellPhone = parseInt(cellPhone).toString()

    if (cellPhone.length === 9 && uf) {
      uf = uf.toLocaleUpperCase()

      const ufIndex = GeneralConsts.DDD_BRASIL_UF.findIndex((siglaUf) => siglaUf === uf)

      if (ufIndex >= 0) {
        cellPhone = GeneralConsts.DDD_PRINCIPAL_UF[ufIndex] + cellPhone
      }
    }

    if (cellPhone.length === 11) {
      const formatedPhone = '55' + cellPhone

      if (presentationFormat) {
        return (
          '(' +
          formatedPhone.substring(2, 4) +
          ') ' +
          formatedPhone.substring(4, 9) +
          '-' +
          formatedPhone.substring(9, 13)
        )
      } else {
        return formatedPhone
      }
    } else {
      return invalidText
    }
  }

  static formatPhoneNumber(phone?: string, uf?: string) {
    if (!phone) {
      return
    }

    phone = NumberUtils.extractNumbers(phone)

    if (phone.length === 0) {
      return
    }

    phone = parseInt(phone).toString()

    if ((phone.length === 8 || phone.length === 9) && uf) {
      uf = uf.toLocaleUpperCase()

      const ufIndex = GeneralConsts.DDD_BRASIL_UF.findIndex((siglaUf) => siglaUf === uf)

      if (ufIndex >= 0) {
        phone = GeneralConsts.DDD_PRINCIPAL_UF[ufIndex] + phone
      }
    }

    if (phone.length === 10) {
      return (
        '(' +
        phone.substring(0, 2) +
        ') ' +
        phone.substring(2, 6) +
        '-' +
        phone.substring(6, 10)
      )
    } else if (phone.length === 11) {
      return (
        '(' +
        phone.substring(0, 2) +
        ') ' +
        phone.substring(2, 7) +
        '-' +
        phone.substring(7, 11)
      )
    }
  }

  static formatIpAdress(ip: string) {
    const isHttps = ip.toLocaleLowerCase().includes('https')
    const onlyIp = ip
      .replace('http://', '')
      .replace('https://', '')
      .replace('/', '')
      .trim()
    const isValid = RegexConsts.REGEX_IP.test(onlyIp)

    if (isValid) {
      return (isHttps ? 'https://' : 'http://') + onlyIp.trim()
    } else {
      return ''
    }
  }

  static formatUrlAdress(url: string) {
    let urlFormated = url.toLocaleLowerCase().trim()

    if (!urlFormated.includes('http://') && !urlFormated.includes('https://')) {
      urlFormated = 'http://' + urlFormated
    }

    if (RegexConsts.REGEX_URL.test(urlFormated)) {
      return urlFormated
    } else {
      return ''
    }
  }

  static formatUserName(fullName: string) {
    if (!fullName) {
      return 
    }

    const nameParts = fullName.toLocaleLowerCase().split(' ')

    if (nameParts.length > 1) {
      return (
        this.firstLetterUpper(nameParts[0]) +
        ' ' +
        this.firstLetterUpper(nameParts[nameParts.length - 1])
      )
    } else if (nameParts.length === 1) {
      return this.firstLetterUpper(nameParts[0])
    } 
  }

  static firstLetterUpper(text: string) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase()
  }
}

export default RNFormatUtils