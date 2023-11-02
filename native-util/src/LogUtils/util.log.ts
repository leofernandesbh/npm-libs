
class LogUtils {
  private static messageFormat(objectMessages: unknown, sinalized: boolean) {
    let sequenceMessages = ''

    if (objectMessages instanceof Array) {
      let prefixSymbol = ''

      for (let index = 0; index < objectMessages.length; index++) {
        sequenceMessages = sequenceMessages.concat(
          prefixSymbol,
          objectMessages[index] instanceof Error
            ? objectMessages[index].message
            : objectMessages[index],
        )
        prefixSymbol = ' => '
      }
    } else if (objectMessages instanceof Error) {
      sequenceMessages = objectMessages.message
    } else if (typeof objectMessages === 'string') {
      sequenceMessages = objectMessages
    } else {
      sequenceMessages = JSON.stringify(objectMessages)
    }

    return sinalized ? '🟠'.concat(' ', sequenceMessages) : sequenceMessages
  }

  static log(objectMessage: unknown, sinalized = true) {
    console.clear()
    console.log(this.messageFormat(objectMessage, sinalized))
  }

  static info(objectMessage: unknown, sinalized = true) {
    console.clear()
    console.info(this.messageFormat(objectMessage, sinalized))
  }

  static error(objectMessage: unknown, sinalized = true) {
    console.clear()
    console.error(this.messageFormat(objectMessage, sinalized))
  }

  static warn(objectMessage: unknown, sinalized = true) {
    console.clear()
    console.warn(this.messageFormat(objectMessage, sinalized))
  }

  static separator() {
    console.log('-----------------------------------------------------------')
  }  
}

export default LogUtils