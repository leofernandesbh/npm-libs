
class LogUtils {
  private static sinalizeMessage(message: any) {
    return '🟠'.concat(' ', message)
  }

  private static messageFormat(objectMessages: unknown, sinalized: boolean) {
    let sequenceMessages = ''

    if (objectMessages instanceof Array) {
      let prefixSymbol = ''

      for (let index = 0; index < objectMessages.length; index++) {
        sequenceMessages = sequenceMessages.concat(
          prefixSymbol,
          objectMessages[index] instanceof Error
            ? JSON.stringify(objectMessages[index].message)
            : JSON.stringify(objectMessages[index]),
        )

        prefixSymbol = ' => '        
      }
    } else if (objectMessages instanceof Error) {
      sequenceMessages = JSON.stringify(objectMessages.message)
    } else {
      sequenceMessages = JSON.stringify(objectMessages)
    }

    return sinalized ? this.sinalizeMessage(sequenceMessages) : sequenceMessages
  }

  static log(objectMessage: unknown, sinalized = true) {
    const formatedMessage = this.messageFormat(objectMessage, sinalized)

    console.clear()
    console.log(formatedMessage)
  }

  static info(objectMessage: unknown, sinalized = true) {
    const formatedMessage = this.messageFormat(objectMessage, sinalized)

    console.clear()
    console.info(formatedMessage)
  }

  static error(objectMessage: unknown, sinalized = true) {
    const formatedMessage = this.messageFormat(objectMessage, sinalized)

    console.clear()
    console.error(formatedMessage)
  }

  static warn(objectMessage: unknown, sinalized = true) {
    const formatedMessage = this.messageFormat(objectMessage, sinalized)

    console.clear()
    console.warn(formatedMessage)
  }

  static separator() {
    console.log('-----------------------------------------------------------')
  }  
}

export default LogUtils