import { StyleSheet } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import moment from 'moment'
import { RNDateUtils } from '@lfsoftwares/native-util'

interface RNDatePickerProps {
  visible?: boolean
  currentDate?: string
  themeVariant?: 'light' | 'dark'
  textColor?: string
  onDateChange?: (newDate: string) => void
  onCancel?: () => void
}

const RNDatePicker = (props: RNDatePickerProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
  })

  const containerHeight = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    }
  })

  function formatCurrentDate() {
    if (props.currentDate) {
      const dateParts = props.currentDate.split('/')

      if (dateParts.length === 3) {
        const d = dateParts[0].padStart(2, '0')
        const m = dateParts[1].padStart(2, '0')
        const y = dateParts[2].padStart(4, '20')
        const formatedDateTime = y + '-' + m + '-' + d + ' 12:00:00'

        return new Date(formatedDateTime)
      }
    }

    const currentDateTime = moment().format('YYYY-MM-DD') + ' 12:00:00'
    return new Date(currentDateTime)
  }

  const currentValue = formatCurrentDate()

  function animate() {
    containerHeight.value = withTiming(props.visible ? 200 : 0, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    })
  }

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date && props.onDateChange) {
      const selectedDate = RNDateUtils.formatDate(date)
      props.onDateChange(selectedDate)
    } else if (props.onCancel) {
      props.onCancel()
    }
  }

  useEffect(() => {
    animate()
  }, [props.visible])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <DateTimePicker
        display='spinner'
        mode='date'
        timeZoneName={'America/Sao_Paulo'}
        themeVariant={props.themeVariant}
        value={currentValue}
        textColor={props.textColor}
        onChange={onChange}
      />
    </Animated.View>
  )
}

export default RNDatePicker
