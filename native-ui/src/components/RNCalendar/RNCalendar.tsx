import { ColorValue, Modal, ModalProps, TouchableWithoutFeedback } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Colors } from '../../theme'
import RNVStack from '../RNVStack'
import { getFontFamily } from '../../styles/styles.util'
import { ptBRLocale, ptBRLocalesConfig } from '../../util/calendarLocale'

LocaleConfig.defaultLocale = ptBRLocale
LocaleConfig.locales['pt-BR'] = ptBRLocalesConfig

interface RNCalendarProps extends ModalProps {
  isTablet?: boolean
  initialDate?: string
  bColor?: ColorValue
  themeStyle?: {
    fFamily?: string
    arrowColor: string
    calendarBackground: string
    selectedDayBackgroundColor: string
    selectedDayTextColor: string
    todayTextColor: string
    dayTextColor: string
  }
  markDatesStyle?: {
    selectedColor: string
    selectedTextColor: string
  }
  onDateSelect(selectedDate: string): void
  onCancel(): void
}

const RNCalendar = ({
  isTablet,
  initialDate,
  bColor,
  themeStyle,
  markDatesStyle,
  onDateSelect,
  onCancel,
  ...rest
}: RNCalendarProps) => {
  function validateDateString(date?: string) {
    try {
      if (
        date &&
        date.includes('/') &&
        (date.length === 6 ||
          date.length === 7 ||
          date.length === 8 ||
          date.length === 10)
      ) {
        const dateParts = date.split('/')

        if (dateParts.length === 3) {
          dateParts[0] = dateParts[0].padStart(2, '0')
          dateParts[1] = dateParts[1].padStart(2, '0')

          if (dateParts[2].length === 2) {
            dateParts[2] = '20' + dateParts[2]
          }

          if (
            dateParts[0].length !== 2 ||
            dateParts[1].length !== 2 ||
            dateParts[2].length !== 4
          ) {
            return undefined
          }

          const dateValidate = new Date(
            dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0],
          )

          const validDate = dateValidate.getTime()

          if (!isNaN(validDate)) {
            return dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2]
          } else {
            return undefined
          }
        } else {
          return undefined
        }
      } else {
        return undefined
      }
    } catch (e) {
      return undefined
    }
  }

  function dateStringBRToDateStringUS(date?: string) {
    const dateBR = validateDateString(date)

    if (dateBR) {
      const dateParts = dateBR.split('/')
      return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
    } else {
      return ''
    }
  }

  const currentDaySelected = dateStringBRToDateStringUS(initialDate)
  let initialDateFormated: string | undefined

  if (currentDaySelected.length > 0) {
    initialDateFormated = format(new Date(currentDaySelected), 'yyyy-MM-01', {
      locale: pt,
    })
  }

  return (
    <Modal
      transparent={true}
      animationType='fade'
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <RNVStack
          flex={1}
          px={isTablet ? '15%' : 6}
          justify='center'
        >
          <Calendar
            style={{
              paddingBottom: 10,
              borderRadius: 8,
              borderColor: bColor ?? Colors.gray[400],
              borderWidth: 1,
            }}
            theme={{
              arrowColor: themeStyle?.arrowColor ?? Colors.emerald[700],
              calendarBackground: themeStyle?.calendarBackground ?? Colors.slate[50],
              selectedDayBackgroundColor: themeStyle?.selectedDayBackgroundColor ?? Colors.slate[50],
              selectedDayTextColor: themeStyle?.selectedDayTextColor ?? Colors.gray[800],
              todayTextColor: themeStyle?.todayTextColor ?? Colors.gray[800],
              dayTextColor: themeStyle?.dayTextColor ?? Colors.gray[800],
              textDayFontFamily: getFontFamily(themeStyle?.fFamily),
              textMonthFontFamily: getFontFamily(themeStyle?.fFamily),
              textDayHeaderFontFamily: getFontFamily(themeStyle?.fFamily),
            }}
            firstDay={1}
            initialDate={initialDateFormated}
            markedDates={{
              [currentDaySelected]: {
                selected: true,
                selectedColor: markDatesStyle?.selectedColor ?? Colors.emerald[700],
                selectedTextColor: markDatesStyle?.selectedTextColor ?? Colors.slate[50],
              },
            }}
            onDayPress={(day) => onDateSelect(day.dateString)}
          />
        </RNVStack>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default RNCalendar
