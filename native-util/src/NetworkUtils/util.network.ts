import NumberUtils from "../NumberUtils"

class NetworkUtils {
  static isInternalNetwork(baseURL: string) {
    const baseURLNumbers = NumberUtils.numbersAndDots(baseURL)

    return (
      baseURLNumbers.startsWith('10.') ||
      baseURLNumbers.startsWith('172.') ||
      baseURLNumbers.startsWith('192.')
    )
  }
}

export default NetworkUtils