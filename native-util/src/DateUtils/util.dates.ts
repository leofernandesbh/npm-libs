import moment from 'moment'

const BRAZILIAN_TIMEZONE = 'T12:00:00.000Z'

class RNDateUtils {
  private static removeDateTimeZone(
    canRemove: boolean,
    dateTime?: Date | string,
  ) {
    if (!dateTime) {
      return ''
    }

    if (!canRemove) {
      return dateTime
    }

    const dateTimeStr = moment(dateTime).toISOString()

    return dateTimeStr.split('.')[0]
  }

  static currentDate(shortYear = false) {
    return moment().format(shortYear ? 'DD/MM/YY' : 'DD/MM/YYYY')
  }

  static currentTime(fullTime = false) {
    return moment().format(fullTime ? 'HH:mm:ss' : 'HH:mm')
  }

  static currentDateTime(shortYear = false, fullTime = false) {
    let mask = shortYear ? 'DD/MM/YY' : 'DD/MM/YYYY'
    mask += fullTime ? ' HH:mm:ss' : ' HH:mm'

    return moment().format(mask)
  }  

  static formatDate(
    date?: Date | string,
    shortYear = false,
    removeTimeZone = false,
  ) {
    if (!date) {
      return ''
    }

    date = this.removeDateTimeZone(removeTimeZone, date)

    return moment(date).format(shortYear ? 'DD/MM/YY' : 'DD/MM/YYYY')
  }

  static formatTime(
    dateTime?: Date | string,
    fullTime = false,
    removeTimeZone = false,
  ) {
    if (!dateTime) {
      return ''
    }

    dateTime = this.removeDateTimeZone(removeTimeZone, dateTime)

    return moment(dateTime).format(fullTime ? 'HH:mm:ss' : 'HH:mm')
  }

  static formatDateTime(
    dateTime?: Date | string,
    shortYear = false,
    fullTime = false,
    removeTimeZone = false,
  ) {
    if (!dateTime) {
      return ''
    }

    dateTime = this.removeDateTimeZone(removeTimeZone, dateTime)

    let mask = shortYear ? 'DD/MM/YY' : 'DD/MM/YYYY'
    mask += fullTime ? ' HH:mm:ss' : ' HH:mm'

    return moment(dateTime).format(mask)
  }  

  static formatGluedTime(
    time?: number | string,
    fullTime = false,
  ) {
    if (!time && time !== 0) {
      return ''
    }      

    let mask = fullTime ? 'HH:mm:ss' : 'HH:mm'
    let timeStr = String(time)

    if (timeStr.length < 4) {
      timeStr = timeStr.padStart(4, '0')
    }

    if (fullTime && timeStr.length < 6) {
      timeStr = timeStr.padStart(6, '0')
    } else if (!fullTime && timeStr.length > 4) {
      timeStr = timeStr.slice(0, 4)
    }

    return moment(timeStr, mask).format(mask)
  }
  
  static currentJSDate() {
    const strDate = moment().format('YYYY-MM-DD') + BRAZILIAN_TIMEZONE
    return new Date(strDate)
  }

  static currentJSDateTime() {
    const strDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return new Date(strDateTime)
  }

  static formatJSDate(jsDate: Date) {
    const strDate = moment(jsDate).format('YYYY-MM-DD') + BRAZILIAN_TIMEZONE
    return new Date(strDate)
  }

  static formatJSDateTime(jsDate: Date) {
    const strDateTime = moment(jsDate).format('YYYY-MM-DD HH:mm:ss')
    return new Date(strDateTime)
  }  

  static convertBrazilianDateStringToJSFormat(strDate: string) {
    const dateParts = strDate.split('/')
    
    if (dateParts.length !== 3) {
      return 
    }

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + BRAZILIAN_TIMEZONE
  }

  static convertBrazilianDateStringToJSDate(brDate: string) {
    const jsDate = this.convertBrazilianDateStringToJSFormat(brDate)

    if (!jsDate) return 

    return new Date(jsDate)
  }

  static subtractFromJSDate(jsDate: Date, days: number) {
    const strDate = moment(jsDate).subtract(days, 'days').format('YYYY-MM-DD')
    return new Date(strDate)
  }

  static subtractFromBrazilianDate(brDate: string, days: number) {
    const jsDate = this.convertBrazilianDateStringToJSFormat(brDate)    
    const strDate = moment(jsDate).subtract(days, 'days').format('YYYY-MM-DD')
    return new Date(strDate)
  }

  static calculateParcelConsolidationDate(transactionDate: string, parcelNumber: number) {
    const jsDate = this.convertBrazilianDateStringToJSDate(transactionDate)
    const strDate = moment(jsDate).add(parcelNumber - 1, 'months').format('YYYY-MM-DD')
    return new Date(strDate)
  }
}

export default RNDateUtils
