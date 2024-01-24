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

interface RNTimePickerProps {
  visible?: boolean
  currentTime?: string
  themeVariant?: 'light' | 'dark'
  textColor?: string
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30
  onTimeChange?: (time: string) => void
  onCancel?: () => void
}

const RNTimePicker = (props: RNTimePickerProps) => {
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

  function formatCurrentTime() {
    if (props.currentTime) {
      const timeParts = props.currentTime.split(':')

      if (timeParts.length === 2) {
        const h = timeParts[0].padStart(2, '0')
        const m = timeParts[1].padStart(2, '0')
        const formatedTime = h + ':' + m + ':00'
        const currentDateTime =
          moment().format('YYYY-MM-DD') + ' ' + formatedTime

        return new Date(currentDateTime)
      }
    }

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return new Date(currentDateTime)
  }

  const currentValue = formatCurrentTime()

  function animate() {
    containerHeight.value = withTiming(props.visible ? 200 : 0, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    })
  }

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date && props.onTimeChange) {
      const timeParts = date.toTimeString().split(':')
      props.onTimeChange(timeParts[0] + ':' + timeParts[1])
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
        mode='time'
        locale='pt-BR'
        is24Hour={true}
        minuteInterval={props.minuteInterval || 5}
        themeVariant={props.themeVariant}
        value={currentValue}
        textColor={props.textColor}
        onChange={onChange}
      />
    </Animated.View>
  )
}

export default RNTimePicker
