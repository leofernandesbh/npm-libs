import moment from 'moment'

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
}

export default RNDateUtils
