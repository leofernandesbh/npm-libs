import { ColorValue, Modal, Pressable } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { FontAwesome5 } from '@expo/vector-icons'
import { getFontFamily } from '../../styles/styles.util'
import { ptBRLocale, ptBRLocalesConfig } from '../../util/calendarLocale'
import RNIcon from '../RNIcon'
import RNPressable from '../RNPressable'
import RNVStack from '../RNVStack'
import { Colors } from '../../theme'
import RNText from '../RNText'

LocaleConfig.defaultLocale = ptBRLocale
LocaleConfig.locales['pt-BR'] = ptBRLocalesConfig

interface RNDaySelectProps {
  showCalendar: boolean
  dayFieldId: string
  currentDay?: number
  headerTitle?: string
  themeStyle?: {
    buttonColor?: ColorValue
    bColor?: ColorValue
    separatorColor?: ColorValue
    calendarBackground?: string
    monthTextColor?: string
    dayTextColor?: string
    textDayFontFamily?: string
    textMonthFontFamily?: string
    textDayHeaderFontFamily?: string
  }
  markDatesStyle?: {
    selectedColor?: string
    selectedTextColor?: string
  }
  onButtonClick(dayFieldId: string): void
  onDateSelect(dayFieldId: string, selectedDay: number): void
  onCancel(): void
}

const RNDaySelect = ({
  showCalendar,
  dayFieldId,
  currentDay,
  headerTitle,
  themeStyle,
  markDatesStyle,
  onButtonClick,
  onDateSelect,
  onCancel,
}: RNDaySelectProps) => {
  const calendarInitialDate = new Date(2022, 7, 1) // 01-08-2022 => mês em que o dia 1 cai na segunda
  const [selectedDay, setSelectedDay] = useState<string>('')

  function formatDayNumber(dayNumber: string) {
    if (dayNumber.length === 1) {
      dayNumber = '0' + dayNumber
    }

    return dayNumber
  }

  useEffect(() => {
    if (currentDay) {
      setSelectedDay(
        format(calendarInitialDate, 'yyyy-MM-', { locale: pt }) +
          formatDayNumber(currentDay.toString()),
      )
    }
  }, [])

  return (
    <>
      <RNPressable onPress={() => onButtonClick(dayFieldId)}>
        <RNIcon
          ml={2}
          as={FontAwesome5}
          name='calendar-alt'
          color={themeStyle?.buttonColor ?? Colors.emerald[500]}
          size={6}
        />
      </RNPressable>
      {showCalendar && (
        <Modal
          visible={true}
          transparent={true}
          animationType='fade'
          onRequestClose={onCancel}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={onCancel}
          >
            <RNVStack
              flex={1}
              px={6}
              justify='center'
            >
              <Calendar
                style={{
                  paddingBottom: 10,
                  borderRadius: 12,
                  borderColor: themeStyle?.bColor ?? Colors.gray[400],
                  borderWidth: 1,
                }}
                theme={{
                  calendarBackground:
                    themeStyle?.calendarBackground ?? Colors.slate[50],
                  monthTextColor: themeStyle?.monthTextColor ?? Colors.white,
                  dayTextColor: themeStyle?.dayTextColor ?? Colors.gray[800],
                  textDayFontFamily:
                    themeStyle?.textDayFontFamily ?? getFontFamily(),
                  textMonthFontFamily:
                    themeStyle?.textMonthFontFamily ?? getFontFamily(),
                  textDayHeaderFontFamily:
                    themeStyle?.textDayHeaderFontFamily ?? getFontFamily(),
                }}
                initialDate={'2022-08-01'} // mês em que o dia 1 cai na segunda
                firstDay={1}
                headerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor:
                    themeStyle?.separatorColor ?? Colors.gray[500],
                }}
                hideArrows
                hideExtraDays
                hideDayNames
                disableMonthChange
                markedDates={{
                  [selectedDay]: {
                    selected: true,
                    selectedColor:
                      markDatesStyle?.selectedColor ?? Colors.emerald[700],
                    selectedTextColor:
                      markDatesStyle?.selectedTextColor ?? Colors.slate[50],
                  },
                }}
                renderHeader={
                  headerTitle
                    ? () => (
                        <RNVStack py={2.5}>
                          <RNText
                            fColor={themeStyle?.monthTextColor ?? Colors.white}
                          >
                            {headerTitle}
                          </RNText>
                        </RNVStack>
                      )
                    : undefined
                }
                onDayPress={(day) => onDateSelect(dayFieldId, day.day)}
              />
            </RNVStack>
          </Pressable>
        </Modal>
      )}
    </>
  )
}

export default RNDaySelect
