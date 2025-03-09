import { YStack } from 'tamagui';
import DateTimePicker, {
  getDefaultStyles,
  DateType,
} from 'react-native-ui-datepicker';

interface IDatePickerFilter {
  dateRange: DateType;
  setDateRange: (date: DateType) => void;
}

const DatePickerFilter = (props: IDatePickerFilter) => {
  const defaultStyles = getDefaultStyles();

  return (
    <YStack>
      <DateTimePicker
        mode="single"
        date={props.dateRange}
        onChange={({ date }) => props.setDateRange(date)}
        styles={defaultStyles}
      />
    </YStack>
  );
};

export default DatePickerFilter;
